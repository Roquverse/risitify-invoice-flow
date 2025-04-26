-- Drop existing policies
DROP POLICY IF EXISTS "Users can manage their own account settings" ON public.account_settings;

-- Recreate RLS policies with proper conditions
CREATE POLICY "Users can manage their own account settings"
ON public.account_settings
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Make sure RLS is enabled
ALTER TABLE public.account_settings ENABLE ROW LEVEL SECURITY;

-- Add any missing columns (if they don't exist)
DO $$ 
BEGIN 
    BEGIN
        ALTER TABLE public.account_settings 
        ADD COLUMN IF NOT EXISTS timezone text DEFAULT 'UTC',
        ADD COLUMN IF NOT EXISTS currency text DEFAULT 'USD',
        ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now(),
        ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();
    EXCEPTION
        WHEN duplicate_column THEN 
        -- Do nothing, columns already exist
    END;
END $$;

-- Ensure the user_id column has a unique constraint (if it doesn't already exist)
DO $$
BEGIN
    -- Check if the constraint exists
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'account_settings_user_id_key'
    ) THEN
        ALTER TABLE public.account_settings
        ADD CONSTRAINT account_settings_user_id_key UNIQUE (user_id);
    END IF;
END $$;

-- Ensure proper index exists
CREATE INDEX IF NOT EXISTS idx_account_settings_user_id ON public.account_settings(user_id);

-- Update or create the trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.account_settings (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert default settings for existing users who don't have them
INSERT INTO public.account_settings (user_id)
SELECT id FROM auth.users
WHERE NOT EXISTS (
    SELECT 1 FROM public.account_settings WHERE user_id = auth.users.id
)
ON CONFLICT (user_id) DO NOTHING; 