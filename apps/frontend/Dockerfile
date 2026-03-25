# Build stage
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages ./packages
COPY apps/frontend ./apps/frontend

RUN pnpm install --frozen-lockfile --filter frontend...

RUN pnpm --filter @pitch-experiment/types build

WORKDIR /app/apps/frontend

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN echo "Building with VITE_API_URL=$VITE_API_URL"

RUN pnpm build

# Runtime stage
FROM nginx:alpine

COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html
COPY --from=builder /app/apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]