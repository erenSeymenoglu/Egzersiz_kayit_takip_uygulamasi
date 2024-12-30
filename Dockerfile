FROM node:14

# Uygulama dosyalarını kopyala
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Sunucuyu başlat
EXPOSE 3000
CMD ["node", "server.js"]