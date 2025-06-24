This is a [Next.js](https://nextjs.org) project for reviewing weather (min/max temperatures) of specific cities, based on sqlite data set.

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
- **Do not run these tests with Vitest. They use Jest-specific APIs.**

### Frontend (React/component) tests (Vitest)

Run all frontend/component tests:

```bash
npx vitest run src/components
```

- Only frontend/component tests will run.
- Test files: `src/components/**/*.test.tsx`
- **Do not run backend tests with Vitest.**

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

## Few words on the approach

This is my first challenge with next.js, so I took a bit time to explore the best practices working with it.
So with the few time I had this is the architecture I found to be most suitable.
I do admit that it's hard to digest next.js folder architecture after years of total separation between frontend and backend services.

Disclaimer #1 - I worked with cursor vibe coding, so I was able to do relatively a lot in few time. I can stand behind every line of code - everything cursor does is my request. And there was a lot of iterations until I was satisfied with the code.
Disclaimer #2 - The assignment took me more than 3 hours, most of the time was on exploring next.js architecture and best practices. I would say it took me total of 5 hours, half of it was the exploration.

If I had more time:

1. Add more unit tests both to the React components and to the api side.
2. Add integration and E2E tests.
3. Add cache layer for the api (backend) side.
4. Go over the folder architecture and explore more best practices - I still dont know my feelings about next.js approach, so need more time with it.
5. Add a button to run the endpoint call, and not on every input change.
6. Im not a designer, but I guess the UI can look better.
7. Add a message when the data returns empty or with error - now the graph is just empty.
8. Add components for handling errors.

Overall I really enjoyed the assignment. Thank you!
