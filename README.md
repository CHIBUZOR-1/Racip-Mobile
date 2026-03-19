# 🍲 Racip Mobile App

A full-stack recipe mobile application built with **React Native + Expo** for the frontend and **Node.js + Express + MongoDB** for the backend.  
Users can browse meals, view recipes, save favourites, and authenticate securely with Clerk.

---

## 🚀 Features
- Browse and search meals from TheMealDB API
- View recipe instructions and cooking videos
- Save favourite meals to your personal collection
- Secure OAuth authentication with Clerk
- Clean and responsive mobile UI

---

## 🔧 Tech Stack

### 📱 Mobile App
- React Native with Expo
- Expo Router for navigation
- Clerk OAuth authentication
- Secure user sessions

### 🖥 Backend
- Node.js + Express
- TypeScript
- MongoDB with Mongoose ORM
- Zod for request validation
- Clerk Express middleware for protected routes

### 🌐 External API
- Recipe data fetched from [TheMealDB](https://www.themealdb.com/)

---

## 📦 Installation

### Mobile
```bash
# Clone the repo
git clone https://github.com/henry/racip-mobile.git
cd racip-mobile/mobile

# Install dependencies
npm install

# Run in development
npx expo start

