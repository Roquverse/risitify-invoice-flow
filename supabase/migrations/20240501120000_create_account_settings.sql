-- Create account_settings table
CREATE TABLE public.account_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    timezone text DEFAULT 'UTC',
    currency text DEFAULT 'USD',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.account_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only view and manage their own account settings
DROP POLICY IF EXISTS "Users can manage their own account settings" ON public.account_settings;
CREATE POLICY "Users can manage their own account settings"
ON public.account_settings
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_account_settings_user_id ON public.account_settings(user_id);

-- Function to ensure each user has account settings
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.account_settings (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create account settings for new users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user(); 