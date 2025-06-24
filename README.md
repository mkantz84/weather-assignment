This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Running with Docker

You can build and run this app in a production-ready Docker container:

### Build the Docker image

```bash
docker build -t weather-app .
```

### Run the Docker container

```bash
docker run -p 3000:3000 weather-app
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** The Docker build will compile all native dependencies (like `sqlite3`) for the correct architecture inside the container. Make sure you have Docker running and that your `.dockerignore` file excludes `node_modules`.

## Running Tests

### Backend (API & DAL) tests (Jest)

Run all backend tests:

```bash
npx jest
```

- Only backend (Node) tests will run.
- Test files: `src/app/api/**/*.test.ts`, `src/dal/**/*.test.ts`

### Frontend (React/component) tests (Vitest)

Run all frontend/component tests:

```bash
npx vitest run
```

- Only frontend/component tests will run.
- Test files: `src/components/**/*.test.tsx` (or as configured in `vitest.config.ts`)

## Debugging with VS Code

To debug API routes or server-side code in this project using Visual Studio Code:

1. Go to the Run & Debug panel in VS Code.
2. Click "create a launch.json file" (if you don't have one).
3. Choose "Node.js" as the environment.
4. Add the following configuration:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Next.js: debug dev server",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "dev"],
  "port": 9229,
  "console": "integratedTerminal",
  "skipFiles": ["<node_internals>/**"]
}
```

5. Set breakpoints in your API route or server-side files.
6. Start debugging (F5 or green play button). The server will start in debug mode, and breakpoints will be hit when those parts of the code are executed.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
