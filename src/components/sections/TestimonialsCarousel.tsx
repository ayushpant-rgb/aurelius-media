'use client';

import Image from 'next/image';

const CAL_URL = 'https://cal.com/aureliusmedia/15min';

interface Author {
    name: string;
    role: string;
    avatar: string;
}

interface Testimonial {
    author: Author;
    text: string;
}

const cameron: Author = { name: 'Cameron Hildreth', role: 'Brand Manager, Aden + Anais', avatar: '/testimonials/Cameron Hildreth.avif' };
const tom: Author = { name: 'Tom Chalmers', role: 'CEO, New Generation Publishing', avatar: '/testimonials/Tom.avif' };
const karan: Author = { name: 'Karan Bajaj', role: 'CEO, Whitehat Jr., Exited $300M', avatar: '/testimonials/Karan.avif' };
const ira: Author = { name: 'Ira Trivedi', role: 'Author & Wellness Expert, TEDx Speaker', avatar: '/testimonials/Ira Trivedi.avif' };
const nidhi: Author = { name: 'Nidhi Upadhyay', role: 'Author, That Night (80,000+ copies sold)', avatar: '/testimonials/Nidhi.avif' };

// Featured quote + one card per person. Each client appears once (the old
// carousel cycled several quotes per person, which read as repetition).
const lead: Testimonial = {
    author: karan,
    text: "Aurelius Media transformed our digital strategy in just 90 days. They didn't just deliver clicks — they delivered customers who were ready to buy. Their data-driven approach eliminated the guesswork from our marketing spend.",
};

const receipts: Testimonial[] = [
    { author: tom, text: "Working with the Aurelius team gave us the clarity we needed. They cut through the digital marketing noise and built us a system that consistently generates qualified leads. Our sales team can't thank them enough." },
    { author: cameron, text: 'What sets Aurelius apart is that they think like growth partners, not just vendors. Every decision was tied to a business outcome. We saw qualified pipeline grow month over month from the very start.' },
    { author: nidhi, text: "The campaign Aurelius ran for my book launch was unlike anything I'd seen. They built momentum methodically — combining organic and paid in a way that felt authentic and completely connected with readers." },
    { author: ira, text: "Aurelius Media understood exactly what my brand needed. They combined creative storytelling with performance-driven campaigns in a way I'd never seen before. The results were beyond what I expected." },
];

// Splits the pull quote into words so they can light up one by one on reveal.
function RevealWords({ parts }: { parts: { text: string; em?: boolean }[] }) {
    let i = 0;
    return (
        <>
            {parts.map((part, p) => {
                const words = part.text.split(' ').map((word) => (
                    <span key={i} className="w" style={{ '--i': i++ } as React.CSSProperties}>{word} </span>
                ));
                return part.em ? <em key={p}>{words}</em> : <span key={p}>{words}</span>;
            })}
        </>
    );
}

function Attribution({ author, size = 40 }: { author: Author; size?: number }) {
    return (
        <div className="attr">
            <span className="av" style={{ width: size, height: size }}>
                <Image src={author.avatar} alt={author.name} width={size * 2} height={size * 2} sizes={`${size}px`} />
            </span>
            <div>
                <b>{author.name}</b>
                <span>{author.role}</span>
            </div>
        </div>
    );
}

export default function TestimonialsCarousel() {
    return (
        <section className="sec">
            <div className="wrap">
                <div className="shead rv">
                    <div>
                        <span className="k">— Testimonials —</span>
                        <h2>There&apos;s a reason people{' '}<br />are raving about us.</h2>
                    </div>
                    <p>Join 200+ businesses that have scaled with Aurelius Media.</p>
                </div>

                <figure className="tfeat rv">
                    <div className="tfeat-photo">
                        <Image src={lead.author.avatar} alt={lead.author.name} fill sizes="(max-width: 760px) 120px, 240px" />
                    </div>
                    <div className="tfeat-body">
                        <span className="tfeat-mark" aria-hidden="true">&ldquo;</span>
                        <blockquote className="bigq">
                            <RevealWords
                                parts={[
                                    { text: "Aurelius Media transformed our digital strategy in just 90 days. They didn't just deliver clicks — they delivered" },
                                    { text: 'customers who were ready to buy.', em: true },
                                    { text: 'Their data-driven approach eliminated the guesswork from our marketing spend.' },
                                ]}
                            />
                        </blockquote>
                        <figcaption className="tfeat-cap">
                            <div>
                                <b>{lead.author.name}</b>
                                <span>{lead.author.role}</span>
                            </div>
                            <span className="stars" aria-label="5 out of 5 stars">★★★★★</span>
                        </figcaption>
                    </div>
                </figure>

                <div className={`receipts gs${receipts.length === 4 ? ' four' : ''}`}>
                    {receipts.map((t) => (
                        <figure className="r" key={t.author.name} style={{ margin: 0 }}>
                            <span className="stars" aria-hidden="true">★★★★★</span>
                            <blockquote><p>&ldquo;{t.text}&rdquo;</p></blockquote>
                            <figcaption><Attribution author={t.author} /></figcaption>
                        </figure>
                    ))}
                </div>

                <div className="rv" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginTop: 30 }}>
                    <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="btn sm">
                        Book a Strategy Call →
                    </a>
                </div>
            </div>
        </section>
    );
}
