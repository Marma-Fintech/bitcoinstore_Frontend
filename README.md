# Bitcoin Store Frontend

A React-based frontend for the Bitcoin Store application with contact form functionality.

## Environment Setup

1. Copy the environment variables:
```bash
cp .env.example .env
```

2. Configure your environment variables in `.env`:
```
VITE_API_BASE_URL=https://bitcoinstore-be.onrender.com
VITE_API_ENDPOINT=/register
```

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Features

- Contact form with environment-driven API configuration
- Responsive design
- Fade animations
- Modal notifications
