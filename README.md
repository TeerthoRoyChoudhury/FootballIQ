# FootballIQ ⚽

> A backend-focused football analytics platform delivering authenticated access to teams, squads, and player statistics through Node.js, Express, and external football data APIs.

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white)](https://redis.io/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)
---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Authentication](#authentication)
- [Caching Strategy](#caching-strategy)
- [Roadmap](#roadmap)
- [Tech Stack Deep Dive](#tech-stack-deep-dive)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**FootballIQ** is a backend platform built to demonstrate modern, production-grade backend engineering practices in the context of real-world football data. It provides secure, authenticated endpoints for retrieving team information, squad rosters, and detailed player statistics — powered by the [API-Football](https://www.api-football.com/) data provider.

The long-term vision is to evolve FootballIQ into an **AI-powered football analytics platform**, capable of generating player analysis, head-to-head comparisons, and natural language football insights.

---

## ✨ Features

- 🔐 **Secure Authentication** — Signup/login flows with Argon2 password hashing and JWT-based sessions
- 🛡️ **Protected Routes** — Middleware-based authorization for all sensitive endpoints
- ⚽ **Team Search** — Look up football teams by name
- 👥 **Squad Retrieval** — Fetch full squad rosters via API chaining (team search → squad lookup)
- 📊 **Player Statistics** — Detailed player profiles, appearances, goals, assists, and ratings
- 🚀 **Redis Caching** — Configured and tested caching layer to reduce external API calls
- 🐳 **Dockerized Services** — PostgreSQL and Redis run via Docker Compose

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | PostgreSQL |
| **ORM** | Drizzle ORM |
| **Authentication** | JWT (jsonwebtoken), Argon2 |
| **Caching** | Redis |
| **Containerization** | Docker, Docker Compose |
| **External API** | API-Football (api-sports) |
| **Package Manager** | pnpm |
| **Tools** | Git, GitHub, Postman |

---

## 📁 Project Structure
src/

├── controller/

│   ├── users.controller.js

│   ├── teams.controller.js

│   └── players.controller.js

│

├── services/

│   ├── user.services.js

│   ├── team.service.js

│   └── player.service.js

│

├── middleware/

│   └── isloggedin.middleware.js

│

├── routes/

│   ├── users.routes.js

│   ├── teams.routes.js

│   └── players.routes.js

│

├── validation/

│   └── users.validation.js

│

├── utils/

│   ├── passwordHashing.js

│   └── jsonwebtoken.js

│

├── db/

│   └── schema.js

│

├── redis/

│   └── redis.js

│

├── app.js

└── server.js

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) & Docker Compose
- An [API-Football](https://www.api-football.com/) API key

### Installation

1. **Clone the repository**

```bash
   git clone https://github.com/your-username/footballiq.git
   cd footballiq
```

2. **Install dependencies**

```bash
   pnpm install
```

3. **Set up environment variables**

```bash
   cp .env.example .env
```

   Then fill in the values as described in the [Environment Variables](#environment-variables) section.

4. **Start PostgreSQL and Redis with Docker Compose**

```bash
   docker-compose up -d
```

5. **Run database migrations** (Drizzle ORM)

```bash
   pnpm drizzle-kit push
```

6. **Start the development server**

```bash
   pnpm dev
```

The server should now be running at `http://localhost:3000` (or your configured port).

---

## 🔑 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server
PORT=3000

# PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/footballiq

# JWT
JWT_SECRET=your_jwt_secret_key

# Redis
REDIS_URL=redis://localhost:6379

# API-Football
API_FOOTBALL_KEY=your_api_football_key
API_FOOTBALL_HOST=v3.football.api-sports.io
```

---

## 📡 API Reference

### Authentication

#### Register a new user

```http
POST /signup
```

**Body:**

```json
{
  "firstName": "Lionel",
  "lastName": "Messi",
  "email": "lionel@example.com",
  "password": "SecurePass123"
}
```

| Field | Type | Description |
|---|---|---|
| `firstName` | string | **Required** — User's first name |
| `lastName` | string | **Required** — User's last name |
| `email` | string | **Required** — Unique email address |
| `password` | string | **Required** — Hashed via Argon2 |

---

#### Login

```http
POST /login
```

**Body:**

```json
{
  "email": "lionel@example.com",
  "password": "SecurePass123"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Teams

#### Search for a team

```http
GET /team/:teamname
```

| Parameter | Type | Description |
|---|---|---|
| `teamname` | string | **Required** — Name of the football team |

**Example:**

```http
GET /team/Barcelona
```

**Response:**

```json
{
  "teamId": 529,
  "teamName": "Barcelona",
  "teamCode": "BAR"
}
```

---

#### Get team squad

```http
GET /team/:teamname/squad
```

| Parameter | Type | Description |
|---|---|---|
| `teamname` | string | **Required** — Name of the football team |

**Example:**

```http
GET /team/Barcelona/squad
```

**Response:**

```json
[
  {
    "playerId": 133609,
    "playerName": "Pedri",
    "position": "Midfielder",
    "age": 21,
    "jerseyNumber": 8,
    "photo": "https://media.api-sports.io/football/players/133609.png"
  }
]
```

> ⚙️ **API Chaining**: This endpoint first resolves the team name to a team ID, then queries the squad endpoint using that ID.

---

### Players

#### Get player statistics

```http
GET /player/:playerId
```

| Parameter | Type | Description |
|---|---|---|
| `playerId` | number | **Required** — API-Football player ID |

**Example:**

```http
GET /player/133609
```

**Response:**

```json
{
  "playerId": 133609,
  "name": "Pedri",
  "nationality": "Spain",
  "age": 21,
  "physical": {
    "height": "174 cm",
    "weight": "60 kg"
  },
  "statistics": {
    "appearances": 28,
    "goals": 4,
    "assists": 6,
    "rating": "7.4"
  },
  "team": {
    "id": 529,
    "name": "Barcelona"
  }
}
```

---

## 🔐 Authentication

All protected routes require a valid JWT passed via the `Authorization` header.

**Workflow:**

1. User logs in via `POST /login`.
2. Server generates a JWT signed with `JWT_SECRET`.
3. Client includes the token in subsequent requests:

```http
   Authorization: Bearer <jwt-token>
```

4. The `isloggedin.middleware.js` validates the token.
5. On success, the decoded user payload is attached to `req.user`.

---

## ⚡ Caching Strategy

FootballIQ uses **Redis** to minimize redundant calls to API-Football and stay within API quota limits.

| Cache Type | Key Format | Example |
|---|---|---|
| Player Stats | `player:{playerId}` | `player:133609` |
| Squad Data | `squad:{teamId}` | `squad:529` |

> ✅ Redis connection has been established and read/write operations have been tested successfully.

---

## 🗺️ Roadmap

- [ ] **Redis Caching** — Implement caching for player stats, squads, and team search
- [ ] **Rate Limiting** — Protect API-Football quota (100 req/day) using Express Rate Limit + Redis counters
- [ ] **Global Error Middleware** — Centralized error handling for cleaner controllers
- [ ] **Swagger Documentation** — Interactive API docs for easier testing
- [ ] **Testing** — Unit/integration tests with Vitest or Jest (signup, login, middleware, player APIs)
- [ ] **Dockerize Express App** — Single `docker-compose` setup for the entire application
- [ ] **AI-Powered Features**
  - AI Player Analysis (form & performance breakdown)
  - AI Player Comparison (e.g., Pedri vs Gavi)
  - Football Assistant — natural language Q&A powered by real stats (via Groq / OpenAI-compatible providers)

---

## 🔧 Tech Stack Deep Dive

### Drizzle ORM
Lightweight, type-safe ORM used for defining the PostgreSQL schema (`src/db/schema.js`) and running queries with full TypeScript-style autocompletion and migration support via `drizzle-kit`.

### JWT Authentication
Stateless authentication using signed JSON Web Tokens. Tokens are generated on login (`src/utils/jsonwebtoken.js`) and verified by middleware (`isloggedin.middleware.js`) to protect private routes.

### Argon2 Password Hashing
Industry-standard, memory-hard hashing algorithm used to securely store user passwords (`src/utils/passwordHashing.js`), protecting against brute-force and rainbow table attacks.

### Redis
In-memory data store used as a caching layer to reduce repeated calls to API-Football, improve response times, and (in future) power rate-limiting counters.

### API-Football Integration
External football data provider supplying real-time team, squad, and player statistics. Demonstrates **API chaining** — resolving a team name to an ID before fetching dependent squad data.

### Docker & Docker Compose
PostgreSQL and Redis run as isolated containers via `docker-compose.yml`, ensuring consistent local development environments. Future plans include containerizing the Express app itself.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---


⭐️ If you find this project useful, consider giving it a star!
