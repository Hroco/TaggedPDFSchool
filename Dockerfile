# ------------------------------
# 1) Base image
# ------------------------------
FROM node:18-alpine AS base

# Installing dependencies that Next.js might need
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# ------------------------------
# 2) Dependencies installation
# ------------------------------
FROM base AS deps

# Copy package files for installation
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm ci

# ------------------------------
# 3) Build stage
# ------------------------------
FROM base AS builder

# Copy installed dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of your project files
COPY . .

# (Optional) Disable Next.js telemetry during build:
# ENV NEXT_TELEMETRY_DISABLED 1

# Build your Next.js application
RUN npm run build

# ------------------------------
# 4) Production runner
# ------------------------------
FROM base AS runner

# Set NODE_ENV to production
ENV NODE_ENV=production

# Create a non-root user (recommended best practice)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Create the .next folder with correct permissions
RUN mkdir .next && chown nextjs:nodejs .next

# Copy the final build artifacts from the builder
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to the non-root user
USER nextjs

# Expose port 3000
EXPOSE 3000

# Define runtime environment variables
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Start the Next.js app:
CMD ["node", "server.js"]
