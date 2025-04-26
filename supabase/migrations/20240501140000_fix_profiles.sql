-- Ensure profiles exist for all users
INSERT INTO public.profiles (auth_user_id, email)
SELECT id, email
FROM auth.users
WHERE NOT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.auth_user_id = auth.users.id
);

-- Drop and recreate profile policies to ensure they work correctly
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;

-- Create simplified policies for profiles
CREATE POLICY "Users can manage their own profile"
    ON profiles FOR ALL
    USING (auth_user_id = auth.uid());

-- Update the handle_new_user function to be more robust
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
    -- Create profile if it doesn't exist
    INSERT INTO profiles (auth_user_id, email)
    VALUES (NEW.id, NEW.email)
    ON CONFLICT (auth_user_id) DO NOTHING;

    -- Create organization if it doesn't exist
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
        ON CONFLICT (owner_id) DO NOTHING
        RETURNING id
    )
    -- Add the user to the organization as an admin if not already added
    INSERT INTO organization_users (organization_id, user_id, role)
    SELECT id, NEW.id, 'admin'
    FROM new_org
    ON CONFLICT (organization_id, user_id) DO NOTHING;

    -- Create account settings if they don't exist
    INSERT INTO account_settings (user_id)
    VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;
    
    RETURN NEW;
END;
$$; 