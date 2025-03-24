# ------------------------------
# 1) Base image
# ------------------------------
FROM node:18-alpine AS base

# Installing dependencies that Next.js might need
RUN apk add --no-cache libc6-compat build-base make gcc libc-dev expat-dev

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

# Build the validator
RUN cd /app/src/lib/rnv && \
    # Clean any pre-existing object files
    rm -f *.o *.a && \
    # Rebuild from scratch
    make -f Makefile.gnu

# Make sure the validator is executable
RUN chmod +x /app/src/lib/rnv/rnv

# (Optional) Disable Next.js telemetry during build:
# ENV NEXT_TELEMETRY_DISABLED 1

# Build your Next.js application
RUN npm run build -- --no-lint

# ------------------------------
# 4) Production runner
# ------------------------------
FROM base AS runner

# Install runtime dependencies
RUN apk add --no-cache expat

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

# Add this before switching to non-root user
RUN mkdir -p /app/src/assets/tmp && chown nextjs:nodejs /app/src/assets/tmp

# Make sure the validator is executable
RUN chmod +x /app/src/lib/rnv/rnv
# After copying the validator but before switching users
COPY --from=builder --chown=nextjs:nodejs /app/src/lib/rnv/rnv /app/src/lib/rnv/rnv
COPY --from=builder --chown=nextjs:nodejs /app/src/lib/rnv/*.rnc /app/src/lib/rnv/

# Debug the validator
RUN apk add --no-cache file
RUN file /app/src/lib/rnv/rnv
RUN ldd /app/src/lib/rnv/rnv || echo "Not a dynamic executable"
RUN ls -la /app/src/lib/rnv/
RUN chmod +x /app/src/lib/rnv/rnv

# Switch to the non-root user
USER nextjs

# Expose port 3000
EXPOSE 3000

# Define runtime environment variables
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Start the Next.js app:
CMD ["node", "server.js"]
