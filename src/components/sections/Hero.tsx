import Link from 'next/link';
import Image from 'next/image';
import GrowthConsole from '@/components/sections/GrowthConsole';
import HeadlineRotator from '@/components/ui/HeadlineRotator';
import Spotlight from '@/components/ui/Spotlight';

const CAL_URL = 'https://cal.com/aureliusmedia/15min';

const avatars = [
    { src: '/testimonials/Cameron Hildreth.avif', alt: 'Cameron Hildreth' },
    { src: '/testimonials/Karan.avif', alt: 'Karan Bajaj' },
    { src: '/testimonials/Tom.avif', alt: 'Tom Chalmers' },
    { src: '/testimonials/Nidhi.avif', alt: 'Nidhi Upadhyay' },
    { src: '/testimonials/Ira Trivedi.avif', alt: 'Ira Trivedi' },
];

// "Marketing" comes first so the server-rendered h1 reads exactly as before.
const rotatingWords = ['Marketing', 'Growth', 'Creative', 'Ads', 'Funnels', 'Content'];

export default function Hero() {
    return (
        <Spotlight>
            <div className="wrap hero">
                <div className="hero-grid">
                    <div>
                        <div className="trustrow">
                            <div className="avstack">
                                {avatars.map((p) => (
                                    <span className="av" key={p.alt}>
                                        <Image src={p.src} alt={p.alt} width={76} height={76} sizes="38px" />
                                    </span>
                                ))}
                            </div>
                            <span className="stars" aria-label="5 out of 5 stars">★★★★★</span>
                            <span className="m10" style={{ letterSpacing: '0.05em' }}>84+ businesses scaled</span>
                        </div>
                        <span className="badge"><span className="dotc">●</span> AI-Native Performance Marketing Agency</span>
                        <h1 className="fd h-hero" aria-label="AI-Powered Marketing. Real Results.">
                            AI-Powered{' '}
                            <br />
                            <HeadlineRotator words={rotatingWords} suffix="." />{' '}
                            <br />
                            <em>Real Results.</em>
                        </h1>
                        <p className="lede">
                            10x Growth Marketing for VC-Backed Startups. Trusted by Unicorn Founders. We engineer growth, not guesswork.
                        </p>
                        <div className="btnrow">
                            <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="btn">
                                Book a Strategy Call →
                            </a>
                            <Link href="/services" className="btn ghost">
                                Explore Services
                            </Link>
                        </div>
                    </div>
                    <GrowthConsole />
                </div>
            </div>
        </Spotlight>
    );
}
