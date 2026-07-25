# Multi-stage Dockerfile for Cloud Run & production deployment

# 1. Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project source files
COPY . .

# Build Vite frontend and server bundle (outputs to dist/)
RUN npm run build

# 2. Production Stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Copy package manifests and install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy compiled build output from builder stage
COPY --from=builder /app/dist ./dist

# Expose port (Cloud Run will override via process.env.PORT)
EXPOSE 8080

# Start production server
CMD ["npm", "start"]
