# Mimi – Scentual Bliss

A modern, production-ready luxury perfume e-commerce website built with Next.js, React, and TypeScript.

## 🚀 Features

- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Luxury Design**: Professional purple and rose gold color scheme
- **Responsive**: Mobile-first design that works on all devices
- **SEO Optimized**: Metadata, Open Graph, and structured data
- **Form Validation**: Client-side validation with sanitization
- **Error Handling**: Proper error boundaries and loading states
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Database**: Neon PostgreSQL integration
- **WhatsApp Integration**: Direct WhatsApp contact links
- **Naira Pricing**: Nigerian Naira currency support

## 📋 Prerequisites

- Node.js 16+ or npm/pnpm
- PostgreSQL database (Neon recommended)
- Environment variables configured

## 🔧 Installation

1. **Clone and Install**
```bash
cd perfume-showcase-website
npm install
# or
pnpm install
```

2. **Configure Environment**
```bash
cp .env.example .env.local
# Edit .env.local with your database URL
```

3. **Initialize Database**
```bash
npm run db:migrate
# or
pnpm db:migrate
```

## 🏃 Development

```bash
npm run dev
# or
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📦 Production Build

```bash
npm run build
npm run start
# or
pnpm build
pnpm start
```

## 📁 Project Structure

```
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   ├── admin/                # Admin pages
│   ├── collection/           # Product collection
│   ├── contact/              # Contact form
│   ├── product/              # Product details
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── ui/                   # UI components
│   ├── product-card.tsx      # Product card component
│   └── footer.tsx            # Footer component
├── lib/                      # Utility functions
│   ├── constants.ts          # Business configuration
│   ├── validation.ts         # Form validation
│   ├── db.ts                 # Database utilities
│   └── auth.ts               # Authentication utilities
├── public/                   # Static assets
├── scripts/                  # Database scripts
├── styles/                   # CSS styles
└── package.json              # Dependencies
```

## 🔐 Security

- Input sanitization on all form fields
- Environment variables for sensitive data
- Proper error messages (no sensitive info exposed)
- CSRF protection ready
- SQL injection prevention via parameterized queries

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Screen reader friendly

## 🌍 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 📞 Contact Configuration

Update `lib/constants.ts` with your business details:

```typescript
export const BUSINESS_CONFIG = {
  WHATSAPP_NUMBER: "2347030421369",
  CONTACT_EMAIL: "mariamoyin0809@outlook.com",
  LOCATION_ADDRESS: "Opposite Old MTD, Akarigbo Road, Sabo, Sagamu",
  // ... other config
}
```

## 🗄️ Database

### Tables

**perfumes**
- `id` - Auto-incrementing primary key
- `name` - Product name (255 chars)
- `price` - Product price (decimal)
- `stock_quantity` - Available quantity
- `image_url` - Product image (unlimited)
- `description` - Product description
- `notes` - Fragrance notes
- `is_active` - Active status
- `created_at`, `updated_at` - Timestamps

**admin_users**
- `id` - Auto-incrementing primary key
- `email` - Unique email (255 chars)
- `password_hash` - Hashed password (255 chars)
- `created_at` - Creation timestamp

## 📝 Environment Variables

```env
DATABASE_URL=postgresql://...           # Required
NODE_ENV=production                      # Optional
NEXT_PUBLIC_APP_URL=https://...          # Recommended
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

1. Build: `npm run build`
2. Start: `npm run start`
3. Port: 3000 (default)

## 🐛 Troubleshooting

### Database Migration Issues
```bash
# Full reset
npm run db:migrate
```

### Port Already in Use
```bash
npm run dev -- -p 3001
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

- Email: mariamoyin0809@outlook.com
- WhatsApp: 07030421369

## 📄 License

Proprietary - All rights reserved

---

**Last Updated**: January 24, 2026
**Version**: 1.0.0 (Production Ready)
