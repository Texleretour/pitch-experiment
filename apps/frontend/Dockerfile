# Build stage
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy workspace files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages ./packages
COPY apps/frontend ./apps/frontend

# Install dependencies
RUN pnpm install --frozen-lockfile --filter frontend...

# Build
WORKDIR /app/apps/frontend

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN pnpm build

# Production stage with nginx
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html

# Copy nginx config
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]