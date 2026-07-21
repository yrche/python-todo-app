# Todo Frontend

A task-management frontend built with Next.js, TypeScript, and React.

## Stack

- [Chakra UI](https://chakra-ui.com/) is used for the user interface, including layout, form controls, theming, and responsive components.
- [TanStack Query (React Query)](https://tanstack.com/query/latest) handles server state, caching, loading states, and task mutations.
- The API layer uses the native `fetch` API rather than Axios. Requests are organized in a small custom layer so their URLs, options, and response handling remain explicit and easy to control.

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the project root and set the backend API URL:

```env
NEXT_PUBLIC_PYTHON_API=http://127.0.0.1:8000/api/v1/
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
npm run dev
npm run build
```

Both scripts use the `--webpack` flag. Chakra UI recommends Webpack for Next.js projects because Turbopack can cause Emotion CSS hydration errors. See the [Chakra UI Next.js guide](https://www.chakra-ui.com/docs/get-started/frameworks/next-app#hydration-errors) for details.
