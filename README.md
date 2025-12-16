# VisualSpam

A personal visual portfolio for experimental audiovisual work.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Supabase (Postgres, Storage, Auth)
- Tailwind CSS
- Framer Motion

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Supabase:
   - Create a new project at https://supabase.com
   - Copy your project URL and anon key to `.env.local`
   - Create the following tables in Supabase:
     - `projects` (id, title, description, image_url, media_url, created_at)
     - `notes` (id, title, content, created_at)
   - Create a storage bucket called `downloads`
4. Run the development server: `npm run dev`

## Deployment

Deploy to Vercel:

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy

## Routes

- `/` - Living canvas homepage
- `/work` - Visual archive of projects
- `/work/[id]` - Immersive project page
- `/live` - YouTube livestream embed
- `/notes` - Process logs and thoughts
- `/files` - Downloadable artifacts
- `/admin` - Content management (admin only)
- `/signal` - Private analytics (admin only)
- `/info` - About and links

## Authentication

The `/admin` and `/signal` routes require authentication. Set up a user in Supabase Auth for admin access.