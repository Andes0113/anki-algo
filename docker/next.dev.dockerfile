FROM node:22-alpine

WORKDIR /app
RUN cd ..
# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm i

COPY src ./src
COPY public ./public
COPY next.config.js .
COPY tsconfig.json .
COPY tailwind.config.ts .
COPY drizzle.config.ts .
COPY components.json .
COPY postcss.config.mjs .

# Start Next.js in development mode based on the preferred package manager
CMD pnpm dev
