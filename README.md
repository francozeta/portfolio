# Franco Zeta's Portfolio

![Portfolio Hero](https://ahmytayvpbqnwimemzqh.supabase.co/storage/v1/object/public/portfolio//Hero.png)

> A modern, responsive portfolio website showcasing my work as a Software Developer, Systems Engineer & Designer.

**🌐 Live Demo:** [francozeta.vercel.app](https://francozeta.vercel.app)

## ✨ Features

- **🎨 Modern Design**: Clean, minimalist interface with smooth animations
- **📱 Fully Responsive**: Optimized for all devices and screen sizes
- **⚡ Performance Optimized**: Built with Next.js 15 and optimized for speed
- **🔐 Admin Panel**: Content management system for projects and media
- **📝 Rich Content**: Support for various content blocks (text, images, code, etc.)
- **🎵 Music Integration**: Spotify integration showing favorite coding albums
- **📧 Contact Form**: Functional contact form with validation
- **🌙 SEO Optimized**: Meta tags, Open Graph, and structured data
- **♿ Accessible**: WCAG compliant with proper ARIA labels

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Shadcn/ui** - Modern UI components
- **Lucide React** - Beautiful icons

### Backend & Database
- **Supabase** - Backend as a Service
- **PostgreSQL** - Database
- **Supabase Auth** - Authentication system
- **Supabase Storage** - File storage

### Development Tools
- **pnpm 9.x** - Fast, disk space efficient package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** 18.x or higher
- **pnpm** 9.x or higher
- **Supabase** account and project

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/francozeta/portfolio.git
cd portfolio
```

### 2. Install dependencies

This project uses **pnpm** as the package manager:

```bash
pnpm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE=your_supabase_service_role_key

# Optional: Analytics and other services
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### 4. Database Setup

1. Create a new Supabase project
2. Run the SQL migrations in your Supabase SQL editor:

```sql
-- Create projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  excerpt TEXT,
  content JSONB DEFAULT '[]'::jsonb,
  image_url TEXT,
  status TEXT CHECK (status IN ('in_progress', 'completed')) DEFAULT 'in_progress',
  featured BOOLEAN DEFAULT false,
  technologies JSONB DEFAULT '[]'::jsonb,
  repo_url TEXT,
  deploy_url TEXT,
  reading_time INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true);

-- Set up RLS policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON projects FOR SELECT USING (true);

-- Allow authenticated users to manage projects
CREATE POLICY "Allow authenticated users to manage projects" ON projects 
FOR ALL USING (auth.role() = 'authenticated');
```

### 5. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 📜 Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript compiler

# Package management
pnpm install      # Install dependencies
pnpm update       # Update dependencies
pnpm audit        # Security audit
```

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── (admin)/           # Admin panel routes
│   ├── (main)/            # Main website routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── admin/            # Admin panel components
│   ├── auth/             # Authentication components
│   ├── layout/           # Layout components
│   ├── sections/         # Page sections
│   ├── ui/               # UI components (shadcn/ui)
│   └── work/             # Work/project components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
├── public/               # Static assets
└── README.md
```

## 🎯 Key Features

### Portfolio Sections
- **Hero**: Introduction with call-to-action buttons
- **Featured Projects**: Showcase of selected work
- **Technologies**: Skills and tools visualization
- **About**: Personal story and experience
- **Music**: Spotify integration with coding playlist
- **Contact**: Functional contact form

### Admin Panel
- **Project Management**: Create, edit, and delete projects
- **Rich Content Editor**: Support for various content blocks
- **Media Management**: Upload and organize project images
- **Authentication**: Secure login system

### Content Management
- **Rich Text Editor**: Support for headings, paragraphs, images, code blocks
- **Technology Tags**: Categorized skill visualization
- **Project Status**: Track project completion
- **SEO Optimization**: Meta tags and structured data

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Manual Deployment

```bash
pnpm build
pnpm start
```

## 🔧 Configuration

### Supabase Setup
1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Set up the database schema using the provided SQL
4. Configure storage buckets for images

### Customization
- **Colors**: Modify `tailwind.config.ts` for theme colors
- **Content**: Update personal information in components
- **Styling**: Customize components in the `components/` directory

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- **Desktop**: Full-featured experience with animations
- **Tablet**: Adapted layouts and touch-friendly interactions
- **Mobile**: Optimized navigation and content presentation

## ♿ Accessibility

- **WCAG 2.1 AA** compliant
- **Keyboard navigation** support
- **Screen reader** optimized
- **High contrast** support
- **Focus indicators** for all interactive elements

## 🔒 Security

- **Environment variables** for sensitive data
- **Row Level Security** (RLS) in Supabase
- **Authentication** for admin panel
- **Input validation** and sanitization

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals** optimized
- **Image optimization** with Next.js Image component
- **Code splitting** and lazy loading
- **Bundle analysis** and optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Franco Zeta**
- Website: [francozeta.vercel.app](https://francozeta.vercel.app)
- GitHub: [@francozeta](https://github.com/francozeta)
- LinkedIn: [Franco Zeta](https://www.linkedin.com/in/franco-zeta-496330267)
- Email: francozeta2011@gmail.com

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **Vercel** for hosting and deployment
- **Supabase** for backend services
- **Shadcn** for the beautiful UI components
- **Tailwind CSS** for the utility-first approach

---

⭐ If you found this project helpful, please give it a star!


