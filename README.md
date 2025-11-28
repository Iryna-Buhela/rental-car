# RentalCar

RentalCar is a frontend web application for a car rental service.  
The app allows users to browse a catalog of cars, filter them by various criteria, view detailed information for each vehicle, and submit a rental request via a booking form.

This project is built with **Next.js (App Router)** and **TypeScript**, uses **Zustand** for state management, **Axios** for API requests, and **CSS Modules** for styling.

---

## Features

- 🏠 **Home page**
  - Hero section with main call-to-action “View Catalog”.

- 🚗 **Car catalog**
  - List of available rental cars.
  - Backend-driven filtering by:
    - brand (single brand),
    - price (single value),
    - mileage (`from` / `to`).
  - “Load More” button with backend pagination.
  - Add/remove cars to/from **Favorites**.

- 📄 **Car details page**
  - Full information about the selected car (description, mileage, engine, fuel consumption, rental conditions, etc.).
  - Optimized image rendering with `next/image`.
  - Booking form to “rent” the car.
  - Success notification (toast) on successful form submission.

- ⭐ **Favorites**
  - Favorite car IDs are stored in persistent state (localStorage via Zustand `persist`).
  - Favorites survive page reloads.

- 🧠 **Global state with Zustand**
  - Global store for:
    - cars list,
    - filters,
    - pagination,
    - favorites.
  - Filters and pagination work **on the backend**, not the frontend.
  - Previous search results are cleared before new filtered requests (per requirements).

- 🌐 **External API integration**
  - Uses a ready-made backend API:  
    `https://car-rental-api.goit.global`
  - API docs: https://car-rental-api.goit.global/api-docs/

- 💅 **UI & UX**
  - Layout and styling follow the provided Figma design.
  - Desktop layout is implemented; responsive behavior can be added if needed.
  - CSS Modules for scoped styles.
  - `Manrope` as the main font (via `next/font/google`).

---

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://github.com/pmndrs/zustand) – global state management
- [Axios](https://axios-http.com/) – HTTP client
- [CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules) – styling
- [`next/image`](https://nextjs.org/docs/app/building-your-application/optimizing/images) – image optimization
- [`react-hot-toast`](https://react-hot-toast.com/) – notifications
- [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) with **Manrope**

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>.git
cd <your-repo-folder>
```

## Install dependencies

npm install

## Run the development server

npm run dev

## Open the app

Open http://localhost:3000 in your browser.

## Main Entry Points

app/page.tsx – Home page

app/catalog/page.tsx – Catalog page

app/catalog/[id]/page.tsx – Car details page

## Deployment

To deploy the app:

Push the repository to GitHub

Go to Vercel

Create a new project and import the repo

Add the environment variable:

NEXT_PUBLIC_API_URL=https://car-rental-api.goit.global

Deploy.

## Author

Iryna Buhela
GitHub: https://github.com/Iryna-Buhela
