-- First, drop all existing policies to start fresh
DROP POLICY IF EXISTS "Users can manage their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view organizations they own or are members of" ON organizations;
DROP POLICY IF EXISTS "Users can update organizations they own" ON organizations;
DROP POLICY IF EXISTS "Users can create organizations" ON organizations;
DROP POLICY IF EXISTS "Users can view organization memberships" ON organization_users;
DROP POLICY IF EXISTS "Organization owners can manage members" ON organization_users;

-- Create profile policies
CREATE POLICY "Users can view their own profile"
    ON profiles FOR SELECT
    USING (auth_user_id = auth.uid());

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth_user_id = auth.uid());

CREATE POLICY "Users can insert their own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth_user_id = auth.uid());

-- Create organization policies without circular dependencies
CREATE POLICY "Users can view organizations"
    ON organizations FOR SELECT
    USING (
        owner_id = auth.uid() OR
        id IN (
            SELECT organization_id 
            FROM organization_users 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update their organizations"
    ON organizations FOR UPDATE
    USING (owner_id = auth.uid());

CREATE POLICY "Users can create organizations"
    ON organizations FOR INSERT
    WITH CHECK (owner_id = auth.uid());

-- Create organization_users policies
CREATE POLICY "Users can view memberships"
    ON organization_users FOR SELECT
    USING (
        user_id = auth.uid() OR
        organization_id IN (
            SELECT id 
            FROM organizations 
            WHERE owner_id = auth.uid()
        )
    );

CREATE POLICY "Users can manage memberships"
    ON organization_users FOR INSERT
    WITH CHECK (
        organization_id IN (
            SELECT id 
            FROM organizations 
            WHERE owner_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete memberships"
    ON organization_users FOR DELETE
    USING (
        organization_id IN (
            SELECT id 
            FROM organizations 
            WHERE owner_id = auth.uid()
        )
    );

-- Ensure all tables have RLS enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_users ENABLE ROW LEVEL SECURITY;

-- Create missing profiles for existing users
INSERT INTO profiles (auth_user_id, email)
SELECT id, email
FROM auth.users
WHERE NOT EXISTS (
    SELECT 1 FROM profiles WHERE auth_user_id = auth.users.id
);

-- Create missing organizations for users without one
INSERT INTO organizations (owner_id, name, email)
SELECT 
    auth.users.id,
    'My Organization',
    auth.users.email
FROM auth.users
WHERE NOT EXISTS (
    SELECT 1 FROM organizations WHERE owner_id = auth.users.id
);

-- Ensure all organization owners are members of their organizations
INSERT INTO organization_users (organization_id, user_id, role)
SELECT 
    organizations.id,
    organizations.owner_id,
    'admin'
FROM organizations
WHERE NOT EXISTS (
    SELECT 1 
    FROM organization_users 
    WHERE organization_id = organizations.id 
    AND user_id = organizations.owner_id
); 