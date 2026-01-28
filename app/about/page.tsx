'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen text-black" style={{ backgroundColor: '#F9F8EB' }}>
      <div className="max-w-4xl mx-auto px-6 py-20">
        <Link
          href="/"
          className="inline-flex items-center mb-8 transition-colors font-ibm-plex-mono"
          style={{ color: '#907D01' }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          ← Back to Bakery
        </Link>

        <h1 className="text-5xl font-bold mb-8 font-bayon">About MIA au Chocolat</h1>

        <div className="space-y-6 text-lg leading-relaxed font-ibm-plex-mono">
          <p>
            Welcome to MIA au Chocolat, a virtual showcase of artisan pastries
            created during my free time. This 3D bakery experience combines my
            passion for baking with interactive web technology.
          </p>

          <p>
            Each pastry you see in the virtual display has been carefully crafted
            and documented. From classic French croissants to delicate macarons,
            every item represents hours of practice and refinement.
          </p>

          <p>
            This project serves as a creative portfolio where traditional baking
            meets modern web development. Using Three.js, Next.js, and GSAP, I've
            built an immersive environment where you can explore my baking journey
            in a unique and engaging way.
          </p>

          <div className="mt-12 p-6 bg-white/50 rounded-lg border border-neutral-300">
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
