# Environment Variables Template

Create two files in your project root:

1. `.env.example` (to commit to git as a template)
2. `.env` (for your actual secrets, don't commit this)

Copy the following content into both files (with appropriate values in `.env`):

```env
# Supabase Environment Variables
# Get these values from your Supabase project settings (https://app.supabase.com)
# Project Settings -> API -> Project URL
VITE_SUPABASE_URL=your-project-url
# Project Settings -> API -> Project API Keys -> anon/public
VITE_SUPABASE_ANON_KEY=your-anon-key

# Note: These values are safe to be exposed in client-side code
# as they are public keys meant for browser usage
```

## How to get the values

1. Go to your Supabase project dashboard (https://app.supabase.com)
2. Navigate to Project Settings -> API
3. Copy the "Project URL" for `VITE_SUPABASE_URL`
4. Copy the "anon/public" key for `VITE_SUPABASE_ANON_KEY`

Remember:

- `.env` should contain your actual values and be git-ignored
- `.env.example` should contain placeholder values and can be committed to git
- Both files should be in your project root directory
