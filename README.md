# Kidilio Next.js Clone

A modern Next.js website for Kidilio - a leading Baby Carriage Chinese manufacturer. This is a static frontend website inspired by the original [kidilo.cn](https://kidilo.cn/) with UI/UX improvements inspired by modern e-commerce designs.

## Features

- 🏠 **Home Page** - Hero section, main products showcase, about section, and services overview
- 📖 **About Page** - Company information, factory stats, and FAQs
- 🛍️ **Products Page** - Product categories and listings
- 🔧 **Services Page** - OEM/ODM services and process information
- 📰 **Blog Page** - Latest news and insights
- 📧 **Contact Page** - Contact form and company information

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Geist Font** - Modern typography

## Getting Started

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

Build the production version:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Start Production Server

```bash
npm start
# or
yarn start
# or
pnpm start
```

## Project Structure

```
kidilio-next-clone/
├── app/
│   ├── about/          # About page
│   ├── blog/           # Blog page
│   ├── contact/        # Contact page
│   ├── products/       # Products page
│   ├── services/       # Services page
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/
│   ├── Header.tsx      # Navigation header
│   └── Footer.tsx      # Footer component
└── public/
    └── images/         # Product images (add from kidilo.cn)
```

## Adding Images

To add product images from the original kidilo.cn website:

1. Download images from [kidilo.cn](https://kidilo.cn/)
2. Place them in the `public/images/` directory
3. Update image paths in the components (currently using placeholder SVGs)

## Content

All content is based on the original [kidilo.cn](https://kidilo.cn/) website, including:
- Product information
- Company details
- Contact information
- Blog posts

## UI/UX Inspiration

The design is inspired by modern e-commerce websites with:
- Clean, modern interface
- Responsive design
- Dark mode support
- Smooth transitions and animations
- Mobile-first approach

## License

This project is a clone/redesign of the original Kidilio website for development purposes.
