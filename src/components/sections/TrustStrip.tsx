import Image from 'next/image';

// Logo marquee with the client logos in their own colours, each on a white
// tile so the logos' white backgrounds read as one consistent card.
const clientLogos: { src: string; alt: string; wide?: boolean; ink?: boolean }[] = [
    { src: '/logos/3TIH6U8UUBCqp0JjaEjDBKV0qr0.avif', alt: 'Client Logo 1' },
    { src: '/logos/A4sYu7KC74rOzwxehkShLCdL0cQ.avif', alt: 'Client Logo 2' },
    { src: '/logos/RpYiFxOg6rv0PkJpWqCTpuk1M.avif', alt: 'Client Logo 3' },
    { src: '/logos/r2LD1VLblZdNiidmZQ8C6D9n3Q.avif', alt: 'Client Logo 4' },
    { src: '/logos/whBe115CG31bTuK1Kp6f0vYWVY.png', alt: 'Client Logo 5' },
    { src: '/logos/gl-bajaj-logo.png', alt: 'GL Bajaj Institute of Technology & Management' },
    { src: '/logos/veganologie.png', alt: 'Veganologie', wide: true },
    // the only Provoked logo file is white-on-transparent; rendered in ink on the tile
    { src: '/logos/provoked-magazine.png', alt: 'Provoked Magazine', wide: true, ink: true },
    { src: '/logos/patoliya-infotech.png', alt: 'Patoliya Infotech', wide: true },
    { src: '/logos/anandi-school.svg', alt: 'Anandi School', wide: true },
    { src: '/logos/synergy-capital.jpg', alt: 'Synergy Capital' },
];

// The scrolling row of logo tiles; shared by the homepage strip and the
// service pages so both show the same logos at the same size.
export function LogoMarquee() {
    // repeated copies make the -50% loop seamless on wide screens
    const loop = [...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos];

    return (
        <div className="lmq">
            <div className="trk">
                {loop.map((logo, i) => (
                    <span
                        className={`lgo-tile${logo.wide ? ' wide' : ''}${logo.ink ? ' ink' : ''}`}
                        key={i}
                        aria-hidden={i >= clientLogos.length ? true : undefined}
                    >
                        <Image
                            src={logo.src}
                            alt={i < clientLogos.length ? logo.alt : ''}
                            width={240}
                            height={120}
                            sizes={logo.wide ? '240px' : '160px'}
                            loading="eager"
                            unoptimized={logo.src.endsWith('.svg')}
                        />
                    </span>
                ))}
            </div>
        </div>
    );
}

export default function TrustStrip() {
    return (
        <section className="trust" aria-label="Clients">
            <p className="m10">You&apos;re in good hands</p>
            <LogoMarquee />
        </section>
    );
}
