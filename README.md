# Dev Portfolio
A modern, simple, and elegant full-stack portfolio application.

## 🚀 Features
- **Next.js 15+** App Router
- **Supabase** for DB, Auth, and Storage
- **Tailwind CSS 4** for styling and typography
- **Server Components** and **Server Actions**
- **Markdown parsing** for your blog

## 📦 Setup & Installation

1. Create a Supabase project at [Supabase](https://supabase.com).
2. Go to the SQL Editor in your Supabase dashboard and run the queries found in `database.sql` to generate the correct schema and Storage bucket.
3. Rename the `.env.example` file to `.env.local` and fill it with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```
4. Run `npm install` and then `npm run dev` to start the app.

## 🔐 Admin Setup
1. In your Supabase dashboard, go to Authenticate > Users.
2. Manually create a new user with an email and password. This will be your admin account.
3. Navigate to `/admin/login` on the app to log in and manage your portfolio!

## 📸 Image Uploads
You can upload project images directly to your `portfolio-images` Storage bucket via the Supabase Dashboard, then copy the URL and paste it when making a project!

## 🌍 Deployment
Deploy this easily to Vercel by pushing to GitHub and importing the project into Vercel. Be sure to add the Supabase Environment variables on Vercel too.
