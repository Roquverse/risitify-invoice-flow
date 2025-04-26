-- Drop all existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view organizations" ON organizations;
DROP POLICY IF EXISTS "Users can update their organizations" ON organizations;
DROP POLICY IF EXISTS "Users can create organizations" ON organizations;
DROP POLICY IF EXISTS "Users can view memberships" ON organization_users;
DROP POLICY IF EXISTS "Users can manage memberships" ON organization_users;
DROP POLICY IF EXISTS "Users can delete memberships" ON organization_users;

-- Create simplified profile policies
CREATE POLICY "profiles_select_policy"
    ON profiles FOR SELECT
    USING (auth_user_id = auth.uid());

CREATE POLICY "profiles_insert_policy"
    ON profiles FOR INSERT
    WITH CHECK (auth_user_id = auth.uid());

CREATE POLICY "profiles_update_policy"
    ON profiles FOR UPDATE
    USING (auth_user_id = auth.uid());

-- Create simplified organization policies
CREATE POLICY "organizations_select_policy"
    ON organizations FOR SELECT
    USING (owner_id = auth.uid());

CREATE POLICY "organizations_insert_policy"
    ON organizations FOR INSERT
    WITH CHECK (owner_id = auth.uid());

CREATE POLICY "organizations_update_policy"
    ON organizations FOR UPDATE
    USING (owner_id = auth.uid());

-- Create simplified organization_users policies
CREATE POLICY "organization_users_select_policy"
    ON organization_users FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "organization_users_insert_policy"
    ON organization_users FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM organizations
            WHERE id = organization_users.organization_id
            AND owner_id = auth.uid()
        )
    );

CREATE POLICY "organization_users_delete_policy"
    ON organization_users FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM organizations
            WHERE id = organization_users.organization_id
            AND owner_id = auth.uid()
        )
    );

-- Ensure all tables have RLS enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_users ENABLE ROW LEVEL SECURITY;

-- Create missing profiles for existing users
INSERT INTO profiles (auth_user_id, email)
SELECT id, email
FROM auth.users u
WHERE NOT EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.auth_user_id = u.id
);

-- Create missing organizations for users without one
INSERT INTO organizations (owner_id, name, email)
SELECT 
    u.id,
    'My Organization',
    u.email
FROM auth.users u
WHERE NOT EXISTS (
    SELECT 1 FROM organizations o
    WHERE o.owner_id = u.id
);

-- Ensure all organization owners are members of their organizations
INSERT INTO organization_users (organization_id, user_id, role)
SELECT 
    o.id,
    o.owner_id,
    'admin'
FROM organizations o
WHERE NOT EXISTS (
    SELECT 1 
    FROM organization_users ou
    WHERE ou.organization_id = o.id 
    AND ou.user_id = o.owner_id
); 