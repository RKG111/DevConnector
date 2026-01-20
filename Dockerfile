FROM node:18-alpine

# Create non-root user (security best practice)
RUN addgroup -S app && adduser -S app -G app

WORKDIR /app

# Copy backend dependency manifests only
COPY package*.json ./

# Install prod dependencies only
RUN npm ci --omit=dev

# Copy backend source (client will be ignored)
COPY . .

ENV NODE_ENV=ci
ENV PORT=3000

EXPOSE 3000

USER app

CMD ["node", "server.js"]
