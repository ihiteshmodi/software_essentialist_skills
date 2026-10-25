FROM node:24-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts

COPY 06-walking-skeleton ./06-walking-skeleton

ENV PORT=3000 DATA_DIR=/data
EXPOSE 3000
HEALTHCHECK --interval=2s --timeout=2s --retries=15 CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "06-walking-skeleton/src/main.ts"]
