'use client';

import Link from 'next/link';
import { pastries } from '@/data/pastries';

export default function PastriesPage() {
  return (
    <div className="min-h-screen text-black" style={{ backgroundColor: '#F9F8EB' }}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <Link
          href="/"
          className="inline-flex items-center mb-8 transition-colors font-ibm-plex-mono"
          style={{ color: '#907D01' }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          ← Back to Bakery
        </Link>

        <h1 className="text-5xl font-bold mb-4 font-bayon">All Pastries</h1>
        <p className="mb-12 font-ibm-plex-mono">
          Explore our complete collection of artisan pastries
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pastries.map((pastry) => (
            <div
              key={pastry.id}
              className="bg-white/50 rounded-lg overflow-hidden border border-neutral-300 transition-colors"
              style={{ ['--hover-border' as string]: '#907D01' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#907D01'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
            >
              <div className="aspect-video bg-neutral-200 flex items-center justify-center">
                <span className="text-neutral-600 text-sm">{pastry.image}</span>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 font-bayon">{pastry.name}</h2>
                <p className="mb-4 font-ibm-plex-mono">{pastry.description}</p>
                <div className="text-sm font-ibm-plex-mono" style={{ color: '#907D01' }}>
                  View in 3D scene →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
