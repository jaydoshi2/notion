# 📝 Notion Clone - Real-time Collaboration with AI Integration

A modern, serverless Notion-style app featuring real-time collaboration, authentication, and AI-powered document translation.
This is the link to my live deployed website (https://notion-chi-wheat.vercel.app/)

## ✨ Key Features

- ⚡ **Serverless Backend**: Cloudflare Workers & Hono for scalable APIs
- 🔒 **Authentication**: Seamless login via Clerk
- 🔄 **Real-Time Collaboration**: Live cursors and editing with Liveblocks
- 📝 **Rich Text Editor**: Conflict-free, real-time collaborative editing
- 🤖 **AI Integration**: Cloudflare AI for translation & summarization
- 🔥 **Document Storage**: Real-time sync with Firebase Firestore
- 🖥️ **Frontend**: Next.js App Router for modern routing and SSR
- 💅 **UI/UX**: Sleek design with Shadcn & Tailwind CSS
- 📘 **Language**: TypeScript for robust type safety
- 🔔 **Smart Notifications**: Intuitive dialogs and toasts
- 🚀 **Deployment**: One-click deployment with Vercel

## 🚀 Quick Start

1. Clone & install:
   ```bash
   git clone https://github.com/your-repo/notion-clone.git
   cd notion-clone
   npm install

3. Set up `.env`:
   ```bash
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   LIVEBLOCKS_PRIVATE_KEY=your_liveblocks_private_key
   NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=your_liveblocks_public_key

4. Configure external services:
   - **Clerk**: Sign up at [clerk.dev](https://clerk.dev/) and get API keys
   - **Liveblocks**: Sign up at [liveblocks.io](https://liveblocks.io/) and generate keys
   - **Firebase**: Set up Firestore at [console.firebase.google.com](https://console.firebase.google.com/)

5. Run locally:
   ```bash
   npm run dev

Visit `http://localhost:3000` to view the app.

## 🛠️ Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, Shadcn
- **Backend**: Cloudflare Workers, Firebase Firestore
- **Real-time**: Liveblocks
- **Auth**: Clerk
- **AI**: Cloudflare AI

## 🔧 Detailed Setup

1. **Clerk Authentication**
   - Create an account on [Clerk](https://clerk.dev/)
   - Obtain publishable and secret API keys
   - Add keys to `.env` file

2. **Liveblocks Integration**
   - Sign up for [Liveblocks](https://liveblocks.io/)
   - Generate public and private API keys
   - Add to `.env` file

3. **Firebase Firestore**
   - Create a project in [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore
   - Follow Firebase docs to integrate with your app

4. **Vercel Deployment**
   - Push code to a GitHub repository
   - Connect repo to Vercel
   - Configure environment variables in Vercel dashboard
   - Deploy with: `vercel --prod`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 🔗 Useful Resources

- [Clerk Documentation](https://clerk.dev/docs)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Liveblocks Documentation](https://liveblocks.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Firestore Documentation](https://firebase.google.com/docs/firestore)

## 📄 License

This project is licensed under the MIT License.
