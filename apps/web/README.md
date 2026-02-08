# Rally Web Frontend

A modern, responsive task management application built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Authentication**: Secure user registration and login
- **Project Management**: Create, edit, and delete projects
- **Task Management**: Full CRUD operations for tasks
- **Real-time Updates**: Optimistic UI updates with Zustand state management
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Built with Radix UI components and Tailwind CSS

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **Rally Backend API** running (default: `http://localhost:4000`)

## ⚙️ Environment Variables

This project requires environment variables to connect to the backend API.

### Setup Instructions

1. **Copy the example environment file:**

   ```bash
   cp .env.example .env.local
   ```

2. **Configure your environment variables** in `.env.local`:

   | Variable              | Description                        | Default                 | Required |
   | --------------------- | ---------------------------------- | ----------------------- | -------- |
   | `NEXT_PUBLIC_API_URL` | Base URL for the Rally backend API | `http://localhost:4000` | ✅ Yes   |

   **Example `.env.local` file:**

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```

### Important Notes

- The `NEXT_PUBLIC_` prefix is required for client-side environment variables in Next.js
- Never commit `.env.local` to version control (it's already in `.gitignore`)
- For production deployments, set these variables in your hosting platform (Vercel, Netlify, etc.)
- If the backend API is running on a different port or domain, update the URL accordingly

## 🛠️ Installation

1. **Clone the repository** (if you haven't already):

   ```bash
   git clone <repository-url>
   cd apps/web
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables** (see section above)

4. **Ensure the backend API is running** on the configured URL

## 🚀 Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📁 Project Structure

```
apps/web/
├── src/
│   ├── app/              # Next.js app directory (pages & layouts)
│   ├── components/       # React components
│   │   ├── ui/          # Reusable UI components (Radix UI)
│   │   └── dashboard/   # Dashboard-specific components
│   ├── contexts/        # React contexts (auth, etc.)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and API client
│   ├── store/           # Zustand state management
│   └── types/           # TypeScript type definitions
├── public/              # Static assets
└── .env.example         # Example environment variables
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Technologies Used

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: [Geist](https://vercel.com/font) by Vercel

## 🐛 Troubleshooting

### API Connection Issues

If you're seeing connection errors:

1. **Verify the backend is running:**

   ```bash
   curl http://localhost:4000/health
   ```

2. **Check your `.env.local` file** has the correct API URL

3. **Check the browser console** for specific error messages

### Build Errors

If you encounter build errors:

1. **Clear Next.js cache:**

   ```bash
   rm -rf .next
   npm run build
   ```

2. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## 📚 Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Learn Course](https://nextjs.org/learn)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives)

## 🚢 Deployment

### Vercel (Recommended)

The easiest way to deploy this app is using the [Vercel Platform](https://vercel.com):

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in Vercel
3. **Add environment variables** in Vercel project settings:
   - `NEXT_PUBLIC_API_URL` = your production API URL
4. Deploy!

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Other Platforms

This app can be deployed to any platform that supports Next.js:

- [Netlify](https://docs.netlify.com/frameworks/next-js/)
- [AWS Amplify](https://docs.amplify.aws/nextjs/)
- [Railway](https://docs.railway.app/guides/nextjs)
- [Render](https://render.com/docs/deploy-nextjs-app)

**Remember**: Always set the `NEXT_PUBLIC_API_URL` environment variable in your deployment platform.

## 📝 License

This project is part of the Rally application suite.
