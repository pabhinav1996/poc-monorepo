# POC Monorepo

> A production-grade, scalable Enterprise Application Proof-of-Concept.

**POC Monorepo** demonstrates a modern, high-fidelity web application architecture designed for scalability, maintainability, and pixel-perfect UI implementation. It serves as a reference implementation for "Human-Grade" engineering standards, moving beyond typical AI-generated boilerplate.

---

## 🚀 Tech Stack

Built on a robust **Nx Monorepo** foundation, leveraging the latest in the Angular ecosystem.

### Core Frameworks

- **Monorepo Tooling**: [Nx](https://nx.dev) (Extensible Dev Tools)
- **Frontend**: Angular v18+ (Standalone Components, Signals, Control Flow)
- **Backend**: NestJS (Modular Microservices Architecture)
- **Language**: TypeScript 5.x

### State & Data

- **State Management**: NGRX (Store, Effects,Selectors)
- **HTTP**: Angular `HttpClient` with Interceptors
- **Data Grid**: AG Grid Enterprise (Custom Renderers, server-side data models)

### Styling & Design

- **Design System**: Tailwind CSS (Utility-first, Custom Tokenization)
- **Fonts**: Open Sans, Roboto (Self-hosted/Optimized)
- **Icons**: Optimized SVG Assets

---

## 🏗️ Architecture & Modules

The project follows a strict **Domain-Driven Design (DDD)** approach within the Nx workspace structure.

### 📱 Applications (`/apps`)

| App          | Description                                                                            |
| :----------- | :------------------------------------------------------------------------------------- |
| **`client`** | Primary Angular frontend application. Consumers feature libraries to build the routes. |
| **`server`** | NestJS backend API gateway and services.                                               |

### 📚 Libraries (`/libs`)

#### Feature Modules (`libs/feature/*`)

Self-contained business domains that expose routable components.

- **`dashboard`**: Analytics visualization, metric cards, and "Smart Alert" summaries.
- **`operations`**: The core "Alert Queue" workload management interface.
- **`details`**: Detailed Master-Detail views for specific alerts/items.

#### Shared Modules (`libs/shared/*`)

Reusable building blocks available to all features.

- **`ui`**: "Dumb" presentation components (`stat-card`, `side-menu`, `guide-drawer`).
- **`data-access`**: API services, NGRX stores, and generic data interfaces.
- **`util`**: Helper functions, constants, and types.

---

## ✨ Key Features

### 1. Interactive Dashboard

A high-fidelity landing page featuring:

- **Dynamic Stat Cards**: Data-driven cards with dynamic styling (colors/icons) based on risk thresholds.
- **Smart Alerts**: Summary tables highlighting critical action items.

### 2. Operational Alert Queue

A high-performance Operations Grid powered by AG Grid:

- **Pixel-Perfect Custom Cells**: Custom component renderers for Risk Ratings (Pills), Priority (Icons), and aligned numeric data.
- **Smart Filtering**: A declarative filtering engine supporting complex rules (Ranges, Multi-selects).
- **Responsive Layout**: Fluid column sizing that respects screen density.

### 3. Advanced Filtering Engine

- **Declarative Logic**: Replaced procedural "if-else" chains with a configuration-driven loop for maintainability.
- **Control Flow**: Uses Angular's `@for` and `@switch` for highly performant DOM rendering.

### 4. Integrated Help System

- **Guide Drawer**: A collapsible side panel providing contextual help and best practices without leaving the workflow.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (LTS)
- NPM or PNPM

### Installation

```bash
# Clone the repository
git clone <repo-url>

# Install dependencies
npm install
```

### Development Server

**Run the Frontend:**

```bash
npx nx serve client
```

Navigate to `http://localhost:4200/`.

**Run the Backend:**

```bash
npx nx serve server
```

### Build

```bash
npx nx build client
npx nx build server
```

---

## 🧪 Testing

Run unit tests via Jest:

```bash
npx nx test client
npx nx test libs/feature/operations
```

Run E2E tests via Playwright (if configured in `client-e2e`):

```bash
npx nx e2e client-e2e
```
