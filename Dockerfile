# Используем официальный образ Node.js
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY . .

# Открываем порт 5173
EXPOSE 5173

# Запускаем приложение в режиме разработки
CMD ["npm", "run", "dev"]