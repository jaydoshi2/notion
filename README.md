# 📝 Notion Clone - Real-time Collaboration with AI Integration

A modern, serverless Notion-style app built for **real-time collaboration**, **authentication**, and **AI-powered document translation**.

## ✨ Features

- ⚡ **Serverless Backend**: Powered by Cloudflare Workers & Hono for fast and scalable APIs.
- 🔒 **Authentication**: Seamless user login and authentication via Clerk.
- 🔄 **Real-Time Collaboration**: Live cursors and editing enabled by Liveblocks.
- 📝 **Rich Text Editor**: Fully-featured editor supporting conflict-free, real-time collaboration.
- 🤖 **AI-Powered**: Cloudflare AI workers integrated for language translation and document summarization.
- 🔥 **Firebase Firestore**: Real-time document storage using Firestore for synchronization.
- 🖥️ **Next.js App Router**: Modern routing and server-side features using Next.js.
- 💅 **Sleek UI/UX**: Styled with Shadcn and Tailwind CSS for a professional, responsive interface.
- 📘 **TypeScript**: Robust type safety to minimize bugs and improve development experience.
- 🔔 **Smart Notifications**: Intuitive dialogs and toast notifications using Shadcn components.
- 🚀 **One-Click Deployment**: Deploy in seconds with Vercel for seamless production releases.

---

## 🚀 Quick Start

### 1️⃣ Clone & Install Dependencies
git clone https://github.com/your-repo/notion-clone.git
cd notion-clone
npm install

### 2️⃣ Set Up Environment Variables

Create a `.env` file at the root of your project with the following variables:

CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
LIVEBLOCKS_PRIVATE_KEY=your_liveblocks_private_key
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=your_liveblocks_public_key

### 3️⃣ Configure External Services

- **Clerk Authentication**:
  - [Sign up for Clerk](https://clerk.dev/) and create an application.
  - Obtain your **API keys** and update the `.env` file.

- **Liveblocks for Real-Time Collaboration**:
  - [Sign up for Liveblocks](https://liveblocks.io/).
  - Generate your API keys and add them to the `.env` file.

- **Firebase Firestore**:
  - [Set up a Firebase project](https://console.firebase.google.com/) and enable Firestore.
  - Follow Firebase documentation to integrate Firestore with your Next.js app.

### 4️⃣ Launch the App Locally
npm run dev

Visit [http://localhost:3000](http://localhost:3000) to view your application.

---

## 🗂️ Project Structure

/components          # Reusable UI components
/pages               # Next.js pages
/api                 # Cloudflare Workers API and Clerk Auth
/firebase            # Firebase Firestore integration
/public              # Static assets
/utils               # Utility functions

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, Shadcn
- **Backend**: Cloudflare Workers, Firebase Firestore
- **Real-time**: Liveblocks
- **Auth**: Clerk
- **AI**: OpenAI, Cloudflare AI

---

## 🔧 Detailed Setup

1. **Clerk Authentication**
   - [Create an account on Clerk](https://clerk.dev/) and obtain your **publishable** and **secret API keys**.
   - Add the API keys to your `.env` file.

2. **Liveblocks Integration**
   - [Sign up for Liveblocks](https://liveblocks.io/) and generate your **public** and **private API keys**.
   - Add them to your `.env` file.

3. **Firebase Firestore**
   - [Create a project in Firebase Console](https://console.firebase.google.com/) and enable Firestore.
   - Follow Firebase documentation to set up Firestore in your app.

4. **Vercel Deployment**
   - Push your code to a GitHub repository.
   - Connect the repo to Vercel.
   - Configure your environment variables in the Vercel dashboard.
   - Deploy with:
vercel --prod

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

---

## 🔗 Useful Resources

- **Clerk Docs**: https://clerk.dev/docs
- **Cloudflare Workers Docs**: https://developers.cloudflare.com/workers/
- **Liveblocks Docs**: https://liveblocks.io/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Firebase Firestore Docs**: https://firebase.google.com/docs/firestore
