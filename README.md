# IEEE Computer Society Website

A cutting-edge, professional website for IEEE Computer Society featuring stunning Three.js animations, React components, and an engaging user experience.

## Features

- **Interactive 3D Elements**: Morphing sphere with particle systems, floating icons, and dynamic backgrounds
- **Advanced Animations**: Framer Motion animations, GSAP transitions, and custom shader effects
- **Responsive Design**: Optimized for all device sizes with performance-based rendering
- **Accessibility**: Full keyboard navigation, screen reader support, and reduced motion preferences
- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, Three.js with React Three Fiber

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Animation**: Framer Motion, GSAP
- **Performance**: React.memo, LOD optimization, lazy loading

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── 3D/               # Three.js components
│   ├── Navigation.tsx    # Navigation component
│   ├── HeroSection.tsx   # Hero section with 3D sphere
│   ├── AboutSection.tsx  # About section with counters
│   ├── MembershipSection.tsx # Membership benefits
│   ├── BoardSection.tsx  # Leadership team
│   └── ContactSection.tsx # Contact form
├── public/               # Static assets
└── README.md
```

## Key Features

### Hero Section
- Morphing 3D sphere with vertex shaders
- 5000+ particle system with physics
- Interactive mouse response
- Pulsating glow effects

### About Section
- Animated counters
- Floating 3D icons
- Statistics visualization

### Membership Section
- Interactive benefit cards
- 3D hover effects
- Tier comparison

### Board Section
- 3D carousel for team members
- Interactive member cards
- Executive board highlighting

### Contact Section
- Glassmorphism contact form
- Particle field background
- Social media integration

## Accessibility Features

- Screen reader compatible
- Full keyboard navigation
- Reduced motion support
- High contrast mode
- Focus indicators
- ARIA labels and semantic HTML

## Performance Optimizations

- React.memo for component optimization
- LOD (Level of Detail) for 3D objects
- Lazy loading for images
- Device-based particle count adjustment
- requestAnimationFrame for smooth animations

## Browser Support

- Modern browsers supporting WebGL
- Progressive enhancement for older browsers
- Mobile-optimized 3D effects

## License

© 2024 IEEE Computer Society. All rights reserved.