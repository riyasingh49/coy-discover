# Coy Discover 

Coy Discover is a swipe-based profile discovery application built as part of an internship assignment. It helps users discover interesting people, express interest through likes, and create meaningful connections through mutual matching.

## ✨ Features

### 1. Discover Profiles
- Browse one profile at a time.
- Swipe right to like a profile.
- Swipe left to pass on a profile.
- Use Like and Pass buttons on desktop.
- Smooth swipe animations and interactive profile cards.
- Profiles that have already been swiped are not shown again.
- Displays an empty state when all profiles have been explored.

### 2. Mutual Matching
- A match is created only when two users like each other.
- Displays a match notification when a mutual like occurs.
- View all mutual matches on the Matches page.
- Users cannot see who liked them unless the like is mutual.

### 3. Persistent Data
- Stores swipe history and matches in a local JSON file.
- Prevents duplicate swipes.
- Preserves demo data across local application restarts.

### 4. Demo Profiles
- Includes 30 mock profiles.
- Each profile contains a name, age, photo, bio, city, and interests.
- Includes demo incoming likes to demonstrate mutual matching.

## 🛠️ Tech Stack

- **Next.js** – React framework and API routes
- **TypeScript** – Type safety
- **Tailwind CSS** – Styling and responsive layouts
- **Motion** – Swipe animations and interactions
- **Lucide React** – Icons
- **JSON** – Mock profile data and local demo persistence

## 📁 Project Structure

```text
coy-discover/
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── feed/
│   │   │   │   └── route.ts
│   │   │   ├── swipe/
│   │   │   │   └── route.ts
│   │   │   └── matches/
│   │   │       └── route.ts
│   │   ├── discover/
│   │   │   └── page.tsx
│   │   ├── matches/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   ├── data/
│   │   ├── profiles.json
│   │   └── store.json
│   ├── lib/
│   └── types/
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:
- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/riyasingh49/coy-discover.git
```

### 2. Navigate to the project directory

```bash
cd coy-discover
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Visit:

http://localhost:3000

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/feed` | Fetch available profiles |
| POST | `/api/swipe` | Save a Like or Pass action |
| GET | `/api/matches` | Fetch mutual matches |

### Swipe API Example

**Request:**

```json
{
  "profileId": "user-1",
  "action": "LIKE"
}
```

**Successful response:**

```json
{
  "success": true,
  "isMatch": false
}
```

The `isMatch` value becomes `true` when the other profile has also liked the current user.

## 🧪 Build the Project

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## 🔒 Notes on Data Storage

This project uses a local JSON file as a lightweight persistence layer for the internship demo.

The application assumes a single logged-in user and does not implement external authentication.

For production deployment, the JSON file storage should be replaced with a database such as PostgreSQL or MongoDB, because local file writes are not reliable on serverless hosting environments.

## 👩‍💻 Author

**Riya Singh**

GitHub: https://github.com/riyasingh49

---

*Built as part of an internship assignment.*
