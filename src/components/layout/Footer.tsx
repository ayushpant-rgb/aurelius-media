import Link from 'next/link';
import Image from 'next/image';
import NewsletterForm from '@/components/NewsletterForm';

const footerLinks = {
    company: [
        { label: 'About', href: '/#how-it-works' },
        { label: 'Contact', href: '/contact' },
    ],
    services: [
        { label: 'Performance Marketing', href: '/services/performance-marketing' },
        { label: 'Growth Marketing', href: '/services/growth-marketing' },
        { label: 'Creative Services', href: '/services/creative-services' },
        { label: 'AI Marketing & Automation', href: '/services/ai-marketing-automation' },
        { label: 'All Services', href: '/services' },
    ],
    verticals: [
        { label: 'Book & Author Marketing', href: '/services/book-marketing' },
        { label: 'Education Marketing', href: '/services/education-marketing' },
        { label: 'EdTech Marketing', href: '/services/edtech-marketing' },
        { label: 'D2C & E-commerce', href: '/services/d2c-ecommerce-marketing' },
        { label: 'SaaS Marketing', href: '/services/saas-marketing' },
        { label: 'Real Estate Marketing', href: '/services/real-estate-marketing' },
        { label: 'Dubai Real Estate Marketing', href: '/services/real-estate-marketing-dubai' },
        { label: 'Podcast Marketing', href: '/services/podcast-marketing' },
    ],
    resources: [
        { label: 'Blog', href: '/blog' },
        { label: 'B2B Marketing', href: '/categories/b2b-marketing' },
        { label: 'Full-Funnel Marketing', href: '/categories/full-funnel-marketing' },
        { label: 'Marketing Collaterals', href: '/categories/marketing-collaterals' },
    ],
};

const socialLinks = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ayushpant/' },
    { label: 'X', href: 'https://x.com/FollowAurelius' },
    { label: 'Instagram', href: 'https://www.instagram.com/aurelius.media' },
];

function LinkList({ links }: { links: { label: string; href: string }[] }) {
    return (
        <ul>
            {links.map((link) => (
                <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                </li>
            ))}
        </ul>
    );
}

export default function Footer() {
    return (
        <footer className="sitefoot">
            <div className="wrap">
                <div className="foot">
                    <div>
                        <Link href="/" className="flogo">
                            <span className="lm" style={{ width: 32, height: 32 }}>
                                <Image src="/logo.png" alt="" width={64} height={64} sizes="32px" />
                            </span>
                            Aurelius Media
                        </Link>
                        <p className="blurb">
                            AI-powered performance marketing agency with 20+ years of experience.
                            We engineer growth through data-driven strategy, creative production,
                            and cutting-edge AI solutions.
                        </p>
                        <NewsletterForm source="footer" variant="inline" />
                    </div>

                    <div>
                        <h4>Company</h4>
                        <LinkList links={footerLinks.company} />
                    </div>

                    <div>
                        <h4>Services</h4>
                        <LinkList links={footerLinks.services} />
                    </div>

                    <div>
                        <h4>Industries</h4>
                        <LinkList links={footerLinks.verticals} />
                    </div>

                    <div>
                        <h4>Resources</h4>
                        <LinkList links={footerLinks.resources} />
                    </div>
                </div>

                <div className="fbot">
                    <span>&copy; {new Date().getFullYear()} Aurelius Media. All rights reserved.</span>
                    <span className="links">
                        <Link href="/privacy-policy">Privacy Policy</Link>
                        <span aria-hidden="true">·</span>
                        <Link href="/terms">Terms &amp; Conditions</Link>
                        {socialLinks.map((social) => (
                            <span key={social.label} style={{ display: 'contents' }}>
                                <span aria-hidden="true">·</span>
                                <a href={social.href} target="_blank" rel="noopener noreferrer">
                                    {social.label}
                                </a>
                            </span>
                        ))}
                    </span>
                </div>
            </div>
        </footer>
    );
}
