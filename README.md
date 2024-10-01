# 📝 NOTION Clone

A powerful, serverless app for real-time document collaboration with AI integration.

## ✨ Features

- ⚡ **Serverless Backend**: Cloudflare Workers + Hono
- 🔒 **Authentication**: Seamless login with Clerk
- 🔄 **Real-Time Collaboration**: Live cursors and editing via Liveblocks
- 📝 **Rich Text Editor**: Feature-packed, conflict-free collaboration
- 🤖 **AI Integration**: Cloudflare AI for translate features
- 🔥 **Firebase Firestore**: Real-time document storage
- 🖥️ **Next.js App Router**: Modern, efficient routing
- 💅 **Sleek UI**: Shadcn components + Tailwind CSS
- 📘 **TypeScript**: Rock-solid type safety
- 🔔 **Smart Notifications**: Elegant dialogs and toasts
- 🚀 **Vercel Deployment**: One-click production setup

## 🚀 Quick Start

1. Clone and install:
   git clone https://github.com/your-repo/project-name.git
   cd project-name
   npm install

2. Set up your .env file:
   CLERK_SECRET_KEY=your_key_here
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   LIVEBLOCKS_PRIVATE_KEY=your_key_here
   NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=your_key_here

3. Configure services:
   - Clerk: Set up auth
   - Liveblocks: Enable real-time collab
   - Firebase: Set up Firestore

4. Launch the app:
   npm run dev

## 🗂️ Project Structure

/
├── components/     # Reusable UI components
├── pages/          # Next.js pages
├── api/            # Cloudflare Workers API and Clerk Auth
├── firebase/       # Firebase Firestore integration
├── public/         # Static assets
└── utils/          # Utility functions

## 🛠️ Tech Stack

- Frontend: Next.js, TypeScript, Tailwind CSS, Shadcn
- Backend: Cloudflare Workers, Firebase Firestore
- Real-time: Liveblocks
- Auth: Clerk
- AI: OpenAI, Cloudflare AI

## 🔧 Detailed Setup

1. Clerk Authentication
   - Create an account on Clerk (https://clerk.com/)
   - Set up a new application and obtain API keys
   - Add keys to your .env file

2. Liveblocks Integration
   - Sign up for Liveblocks (https://liveblocks.io/)
   - Generate API keys for your project
   - Add keys to your .env file

3. Firebase Firestore
   - Create a project in Firebase Console (https://console.firebase.google.com/)
   - Enable Firestore in your project
   - Follow Firebase docs to integrate with your app

4. Vercel Deployment
   - Push your code to a GitHub repository
   - Connect your repo to Vercel
   - Configure environment variables in Vercel dashboard
   - Deploy with 'vercel --prod'

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 🔗 Learn More

- Clerk Docs: https://clerk.com/docs
- Cloudflare Workers Docs: https://developers.cloudflare.com/workers/
- Liveblocks Docs: https://liveblocks.io/docs
- Next.js Docs: https://nextjs.org/docs
- Firebase Docs: https://firebase.google.com/docs
