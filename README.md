# Lab Project - Relative pitch learning

## Overview

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v20 or higher)
- **pnpm** (v8 or higher)
- **Git**

### Installation

1. Clone the repository

```bash
git clone https://github.com/Texleretour/pitch-experiment.
cd pitch-experiment/ 
```

2. Install dependencies

```bash
pnpm install
```

### Running in a dev environment

Create a .env file under frontend/ with the key VITE_API_URL\
Create a .env file under backend/ with the keys FRONTEND_URL, PORT, ADMIM_TOKEN, NODE_ENV, DATA_DIR

```bash
pnpm dev
```

### Running in a production environment

Build both the frontend and backend using `pnpm build`.
