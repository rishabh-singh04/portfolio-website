# Portfolio

A modern, interactive portfolio built with React, TypeScript, and Vite.

## Features

- Interactive particle animation with mouse tracking
- Responsive design with dark theme
- Contact form with email integration
- Smooth scrolling navigation

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

## EmailJS Setup for Contact Form

The contact form uses EmailJS to send emails directly from the browser.

### 1. Create EmailJS Account
- Go to [https://www.emailjs.com/](https://www.emailjs.com/)
- Sign up for a free account

### 2. Create Email Service
- In your EmailJS dashboard, go to "Email Services"
- Add a new service (Gmail, Outlook, etc.)
- Note down the **Service ID**

### 3. Create Email Template
- Go to "Email Templates"
- Create a new template with these variables:
  - `{{from_name}}` - Sender's name
  - `{{from_email}}` - Sender's email
  - `{{message}}` - Message content
  - `{{to_email}}` - Your email (rishabh.singh11219@gmail.com)
- Set the recipient to `{{to_email}}`
- Note down the **Template ID**

### 4. Get Public Key
- Go to "Account" → "General"
- Copy the **Public Key**

### 5. Environment Setup
- Copy `.env.example` to `.env`
- Fill in your actual EmailJS credentials:
```bash
cp .env.example .env
# Edit .env with your real credentials
```

### 6. Test
- Fill out the contact form
- Submit it
- Check your email (rishabh.singh11219@gmail.com)

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings

2. **Set Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add these variables:
     ```
     VITE_EMAILJS_SERVICE_ID=your_service_id
     VITE_EMAILJS_TEMPLATE_ID=your_template_id
     VITE_EMAILJS_PUBLIC_KEY=your_public_key
     ```

3. **Deploy:**
   - Push to GitHub main branch
   - Vercel auto-deploys
   - Your site will be live at `your-project.vercel.app`

### Other Platforms

- **Netlify:** Connect repo, set build command `npm run build`, publish directory `dist/public`
- **GitHub Pages:** Use GitHub Actions with build step
- **Manual:** Run `npm run build` and upload `dist/public` folder

## Build for Production

```bash
npm run build
npm run serve  # Preview production build locally
```

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- EmailJS