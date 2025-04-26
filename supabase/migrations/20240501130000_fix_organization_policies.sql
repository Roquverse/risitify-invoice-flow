-- Drop existing organization policies
DROP POLICY IF EXISTS "Users can view their organizations" ON organizations;
DROP POLICY IF EXISTS "Users can view organizations they are members of" ON organizations;
DROP POLICY IF EXISTS "Users can update their own organizations" ON organizations;
DROP POLICY IF EXISTS "Users can create organizations" ON organizations;

-- Create simplified policies for organizations
CREATE POLICY "Users can view organizations they own or are members of"
    ON organizations FOR SELECT
    USING (
        owner_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM organization_users
            WHERE organization_users.organization_id = organizations.id
            AND organization_users.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update organizations they own"
    ON organizations FOR UPDATE
    USING (owner_id = auth.uid());

CREATE POLICY "Users can create organizations"
    ON organizations FOR INSERT
    WITH CHECK (owner_id = auth.uid());

-- Drop existing organization_users policies
DROP POLICY IF EXISTS "Users can view organization memberships" ON organization_users;
DROP POLICY IF EXISTS "Organization owners can manage members" ON organization_users;

-- Create simplified policies for organization_users
CREATE POLICY "Users can view organization memberships"
    ON organization_users FOR SELECT
    USING (
        user_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM organizations
            WHERE organizations.id = organization_users.organization_id
            AND organizations.owner_id = auth.uid()
        )
    );

CREATE POLICY "Organization owners can manage members"
    ON organization_users FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM organizations
            WHERE organizations.id = organization_users.organization_id
            AND organizations.owner_id = auth.uid()
        )
    ); 