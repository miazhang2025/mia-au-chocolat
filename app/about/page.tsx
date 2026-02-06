'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen text-black" style={{ backgroundColor: '#F9F8EB' }}>
      <div className="max-w-4xl mx-auto px-6 py-20">
        <Link
          href="/"
          className={`inline-flex items-center mb-8 transition-all duration-1000 font-ibm-plex-mono ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
          style={{ color: '#907D01', transitionDelay: '0ms' }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          ← Back to Bakery
        </Link>

        <h1 className={`text-5xl font-bold mb-8 font-bayon transition-all duration-1000 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`} style={{ transitionDelay: '100ms' }}>
          About MIA au Chocolat
        </h1>

        <div className="space-y-6 text-lg leading-relaxed font-ibm-plex-mono">
          <p className={`transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`} style={{ transitionDelay: '200ms' }}>
            Welcome to MIA au Chocolat, a virtual showcase of artisan pastries
            created during my free time. This 3D bakery experience combines my
            passion for baking with interactive web technology.
          </p>

          <p className={`transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`} style={{ transitionDelay: '300ms' }}>
            Each pastry you see in the virtual display is something I made in real life :D
          </p>

          <p className={`transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`} style={{ transitionDelay: '400ms' }}>
            This project serves as a creative practice for me to explore web development. I used Three.js, Next.js, and GSAP, I've
            built an immersive environment where you can explore my baking journey
            in a unique and engaging way.
          </p>

          <div className={`mt-12 p-6 bg-white/50 rounded-lg border border-neutral-300 transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`} style={{ transitionDelay: '500ms' }}>
            <h2 className="text-2xl font-semibold mb-4 font-bayon" style={{ color: '#907D01' }}>
              Technologies Used
            </h2>
            <ul className="space-y-2">
              <li>• Next.js 16 - React framework</li>
              <li>• Three.js - 3D graphics</li>
              <li>• React Three Fiber - React renderer for Three.js</li>
              <li>• GSAP - Animation library</li>
              <li>• Tailwind CSS - Styling</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
