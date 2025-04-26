-- Drop existing objects if they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Drop all existing policies
DROP POLICY IF EXISTS "Enable read access for users with organization access" ON organizations;
DROP POLICY IF EXISTS "Enable update for organization admins" ON organizations;
DROP POLICY IF EXISTS "Users can manage organization members" ON organization_users;
DROP POLICY IF EXISTS "Users can view organization members" ON organization_users;
DROP POLICY IF EXISTS "Users can update their organizations" ON organizations;
DROP POLICY IF EXISTS "Users can view their organizations" ON organizations;
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view their own account settings" ON account_settings;
DROP POLICY IF EXISTS "Users can update their own account settings" ON account_settings;
DROP POLICY IF EXISTS "Users can insert their own account settings" ON account_settings;

-- Drop and recreate tables to ensure correct structure
DROP TABLE IF EXISTS account_settings CASCADE;
DROP TABLE IF EXISTS organization_users CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Create profiles table
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID REFERENCES auth.users(id) NOT NULL UNIQUE,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create organizations table
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES auth.users(id) NOT NULL,
    name TEXT NOT NULL,
    industry TEXT,
    registration_number TEXT,
    tax_id TEXT,
    address TEXT,
    email TEXT,
    phone TEXT,
    website TEXT,
    logo TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create organization_users table
CREATE TABLE organization_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    role TEXT NOT NULL DEFAULT 'member',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(organization_id, user_id)
);

-- Create account_settings table
CREATE TABLE account_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL UNIQUE,
    timezone TEXT,
    currency TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE account_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can insert their own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = auth_user_id);

-- Create policies for organizations
CREATE POLICY "Users can view their organizations"
    ON organizations FOR SELECT
    USING (owner_id = auth.uid());

CREATE POLICY "Users can view organizations they are members of"
    ON organizations FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM organization_users
            WHERE organization_users.organization_id = id
            AND organization_users.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update their own organizations"
    ON organizations FOR UPDATE
    USING (owner_id = auth.uid());

CREATE POLICY "Users can create organizations"
    ON organizations FOR INSERT
    WITH CHECK (owner_id = auth.uid());

-- Create policies for organization_users
CREATE POLICY "Users can view organization memberships"
    ON organization_users FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Organization owners can manage members"
    ON organization_users FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM organizations
            WHERE organizations.id = organization_id
            AND organizations.owner_id = auth.uid()
        )
    );

-- Create policies for account_settings
CREATE POLICY "Users can view their own account settings"
    ON account_settings FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own account settings"
    ON account_settings FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own account settings"
    ON account_settings FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
    -- Create profile
    INSERT INTO profiles (auth_user_id, email)
    VALUES (NEW.id, NEW.email);

    -- Create organization
    WITH new_org AS (
        INSERT INTO organizations (
            owner_id,
            name,
            email
        )
        VALUES (
            NEW.id,
            COALESCE(NEW.raw_user_meta_data->>'organization_name', 'My Organization'),
            NEW.email
        )
        RETURNING id
    )
    -- Add the user to the organization as an admin
    INSERT INTO organization_users (organization_id, user_id, role)
    SELECT id, NEW.id, 'admin'
    FROM new_org;

    -- Create account settings
    INSERT INTO account_settings (user_id)
    VALUES (NEW.id);
    
    RETURN NEW;
END;
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- Insert initial data for existing user if needed
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM auth.users
        WHERE id = '49d64427-646c-4983-bddf-b8f8c71a2c41'
    ) AND NOT EXISTS (
        SELECT 1 FROM profiles
        WHERE auth_user_id = '49d64427-646c-4983-bddf-b8f8c71a2c41'
    ) THEN
        -- Create profile
        INSERT INTO profiles (auth_user_id)
        VALUES ('49d64427-646c-4983-bddf-b8f8c71a2c41');

        -- Create organization
        WITH new_org AS (
            INSERT INTO organizations (owner_id, name)
            VALUES ('49d64427-646c-4983-bddf-b8f8c71a2c41', 'My Organization')
            RETURNING id
        )
        -- Add the user to the organization as an admin
        INSERT INTO organization_users (organization_id, user_id, role)
        SELECT id, '49d64427-646c-4983-bddf-b8f8c71a2c41', 'admin'
        FROM new_org;

        -- Create account settings
        INSERT INTO account_settings (user_id)
        VALUES ('49d64427-646c-4983-bddf-b8f8c71a2c41');
    END IF;
END;
$$; 