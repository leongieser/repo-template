# Base image for building the app
FROM node:18-alpine AS base

# Declare build arguments without default values
ARG NODE_ENV
ARG NEXT_PUBLIC_API_URL
ARG BUILD_CACHE

# Install libc6-compat only once for all stages that need it
RUN apk update && apk add --no-cache libc6-compat

# Set environment variables based on build arguments (optional)
ENV NODE_ENV=$NODE_ENV
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching npm install)
COPY package.json package-lock.json ./

# Conditional build caching - only run `npm install` if BUILD_CACHE is not false
RUN if [ "$BUILD_CACHE" != "false" ] ; then npm install ; else echo "Skipping npm install due to no-cache setting"; fi

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

# Install libc6-compat (reusing it in production)
RUN apk update && apk add --no-cache libc6-compat

# Set working directory inside the container
WORKDIR /app

# Don't run production as root for security
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs
USER nextjs

# Copy the necessary output files from the build stage
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static
COPY --from=base /app/public ./public

# Expose the port the app will run on
EXPOSE 3000

# Command to run the Next.js app in production
CMD ["node", "server.js"]
