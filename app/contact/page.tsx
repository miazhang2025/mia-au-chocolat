'use client';

import Link from 'next/link';

export default function ContactPage() {
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

        <h1 className="text-5xl font-bold mb-8 font-bayon">Get in Touch</h1>

        <div className="space-y-8">
          <div className="text-lg leading-relaxed font-ibm-plex-mono">
            <p className="mb-6">
              Thank you for visiting MIA au Chocolat! If you'd like to connect,
              discuss baking techniques, or learn more about this project, feel
              free to reach out.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-white/50 rounded-lg border border-neutral-300">
              <h2 className="text-2xl font-semibold mb-4 font-bayon" style={{ color: '#907D01' }}>
                Email
              </h2>
              <p className="font-ibm-plex-mono">
                [Your email address here]
              </p>
            </div>

            <div className="p-6 bg-white/50 rounded-lg border border-neutral-300">
              <h2 className="text-2xl font-semibold mb-4 font-bayon" style={{ color: '#907D01' }}>
                Social Media
              </h2>
              <div className="space-y-2 font-ibm-plex-mono">
                <p>[Instagram link]</p>
                <p>[LinkedIn link]</p>
                <p>[GitHub link]</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-white/50 rounded-lg border border-neutral-300">
            <h2 className="text-2xl font-semibold mb-4 font-bayon" style={{ color: '#907D01' }}>
              Baking Inquiries
            </h2>
            <p>
              Interested in custom orders or baking collaborations? While this is
              primarily a creative portfolio, I'm always open to discussing
              exciting baking projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
