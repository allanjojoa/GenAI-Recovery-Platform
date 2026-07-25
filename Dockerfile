# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package definitions
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Build static client assets and bundled server code (dist/server.cjs)
RUN npm run build

# Stage 2: Production runtime stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy package definitions and install production dependencies
COPY package.json ./
RUN npm install --omit=dev

# Copy compiled build output from the builder stage
COPY --from=builder /app/dist ./dist

# Expose container port
EXPOSE 3000

# Start the Node.js production server
CMD ["node", "dist/server.cjs"]
