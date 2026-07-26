# Perfect Cut Hair Salon Website Concept

An independent, unofficial portfolio concept created by **Danil Interactive** for a local hair salon in Hamilton, Ontario.

> This project was not commissioned or approved by Perfect Cut Hair Salon. It is published only as a web design and front-end development demonstration. The current editorial images are temporary placeholders and are not photographs of the salon.
**Creator:** Danil Interactive · [Instagram @kodaro14882026](https://www.instagram.com/kodaro14882026/)

![Perfect Cut Hair Salon concept carousel](social-assets/final/contact-sheet.png)

## Project goals

- Create a premium, mobile-first salon experience
- Make calling the primary confirmed booking action
- Keep unknown prices, hours, staff, reviews and social links hidden
- Centralize verified business content in one configuration file
- Provide accessible navigation, service filtering, gallery viewing and a demo request form

## Built with

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons

## Highlights

- Responsive editorial layout
- Keyboard-accessible mobile menu and gallery lightbox
- Dynamic service filters
- Demo booking form with validation and duplicate-submit protection
- Config-driven optional sections
- Reduced-motion support
- Localized phone and directions actions
- Search indexing disabled while the project remains an unofficial preview

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

Quality checks:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Business data

All business facts and section switches live in `src/data/business.ts`. Unknown facts are represented by `null` or empty arrays and are not rendered as confirmed information.

- `hours`: weekly opening intervals in 24-hour `HH:mm` format
- `services`: verified prices and durations
- `staff`: verified staff profiles; an empty array hides the section
- `reviews`: sourced reviews; an empty array hides the section
- `socials`, `email`, `paymentMethods`, `policies`, `languages`, `coordinates`: hidden until verified
- `sections`: complete section switches
- `canonicalUrl`: reads `NEXT_PUBLIC_SITE_URL`

The corresponding TypeScript definitions are in `src/types/business.ts`.

## Images

Image folders are under `public/images`. Replace the placeholder files and update their paths, dimensions, alt text and `isPlaceholder` flags in `src/data/business.ts`. See `public/images/README.md` for the replacement checklist.

## Demonstration features

The request form validates in the browser but does not send or store personal information. The confirmed booking action is the salon phone number. Directions use the confirmed public business address.

## Usage

Copyright (c) 2026 Danil Interactive. Source code is shared for portfolio review. No license is granted for copying, reselling or deploying this project as an official business website without permission.