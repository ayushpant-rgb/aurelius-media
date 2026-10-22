'use client';

import { useEffect, useRef, useState } from 'react';
import CountUp from '@/components/ui/CountUp';

// Growth Console (Claude Design hero infographic K1). KPI figures are the
// agency's published numbers; the trend line, channel split and event feed are
// an illustrative sample (no figures shown).
const kpis = [
    { label: 'Ad spend managed', to: 15, prefix: '$', suffix: 'M+', note: 'Across 25+ countries' },
    { label: 'Businesses scaled', to: 84, suffix: '+', note: 'Series A to legacy brands' },
    { label: 'Creative output', to: 10, suffix: 'x', note: 'Faster with AI' },
];

const channels = [
    { name: 'Google', pct: 50, cls: '' },
    { name: 'Meta', pct: 35, cls: 'b2' },
    { name: 'ChatGPT', pct: 15, cls: 'b3' },
];

const feed = [
    ['META', 'Hook test won — Variant C'],
    ['GOOGLE', 'Budget shifted to Search'],
    ['CHATGPT', 'Brand cited in answer'],
    ['AI', 'Bid strategy retrained'],
    ['META', 'Creative rotated — fatigue detected'],
    ['GOOGLE', 'Lead captured — Performance Max'],
    ['CHATGPT', 'Comparison shortlist won'],
];

const LINE = '0,176 56,162 112,168 168,142 224,150 280,120 336,110 392,88 448,64 504,52 560,30';
const LINE_PATH = 'M' + LINE.split(' ').join(' L');

export default function GrowthConsole() {
    const ref = useRef<HTMLDivElement>(null);
    const chartRef = useRef<SVGSVGElement>(null);
    const [tick, setTick] = useState(0);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // CSS can't stop SVG animation; freezing at t=0 keeps the tracer hidden
            chartRef.current?.pauseAnimations();
            return;
        }
        const id = window.setInterval(() => {
            if (!document.hidden) setTick((t) => t + 1);
        }, 2600);
        return () => window.clearInterval(id);
    }, []);

    const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== 'mouse') return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--ry', `${(x * 7).toFixed(2)}deg`);
        el.style.setProperty('--rx', `${(-y * 6).toFixed(2)}deg`);
    };

    const onLeave = () => {
        ref.current?.style.setProperty('--ry', '0deg');
        ref.current?.style.setProperty('--rx', '0deg');
    };

    const [src, msg] = feed[tick % feed.length];

    return (
        <div
            ref={ref}
            className="dash tilt"
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            role="img"
            aria-label="Sample Aurelius growth dashboard: $15M+ ad spend managed, 84+ businesses scaled, 10x faster creative output"
        >
            <div className="dhead">
                <span className="dot" />
                <b>Aurelius · Growth Console</b>
                <span>Sample view</span>
            </div>
            <div className="kpis">
                {kpis.map((k) => (
                    <div className="kpi" key={k.label}>
                        <span className="lb">{k.label}</span>
                        <b><CountUp to={k.to} prefix={k.prefix} suffix={k.suffix} /></b>
                        <span className="dl">{k.note}</span>
                    </div>
                ))}
            </div>
            <div className="chartbox">
                <div className="lgrow">
                    <span className="lg"><i />Blended ROAS</span>
                    <span className="lg"><i className="dsh" />Ad spend</span>
                    <span className="lg" style={{ marginLeft: 'auto', color: 'var(--dim)' }}>Illustrative trend</span>
                </div>
                <svg ref={chartRef} className="chart" viewBox="0 0 560 210" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                        <linearGradient id="hero-console-fill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#ff4400" stopOpacity="0.28" />
                            <stop offset="1" stopColor="#ff4400" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <line className="gl" x1="0" y1="52" x2="560" y2="52" />
                    <line className="gl" x1="0" y1="104" x2="560" y2="104" />
                    <line className="gl" x1="0" y1="156" x2="560" y2="156" />
                    <line className="gl" x1="0" y1="208" x2="560" y2="208" />
                    <path className="ar" fill="url(#hero-console-fill)" d={`${LINE_PATH} L560,210 L0,210 Z`} />
                    <polyline className="ln2" points="0,184 112,176 224,170 336,162 448,156 560,148" />
                    <polyline className="ln" points={LINE} />
                    <circle className="dotp" cx="560" cy="30" r="5" />
                    {/* tracer: a dot with a dashed guide that rides the line after it draws */}
                    <g opacity="0">
                        <animate attributeName="opacity" from="0" to="1" begin="2.3s" dur="0.4s" fill="freeze" />
                        <line className="trace-line" x1="0" y1="-260" x2="0" y2="260" />
                        <circle className="trace-halo" r="7" />
                        <circle className="trace-dot" r="4" />
                        <animateMotion dur="5.5s" begin="2.3s" repeatCount="indefinite" path={LINE_PATH} />
                    </g>
                </svg>
                <div className="xlab"><span>Month 1</span><span>Month 2</span><span>Month 3</span><span>Month 4</span></div>
            </div>
            <div className="chbars">
                {channels.map((c) => (
                    <div className={`chbar ${c.cls}`} key={c.name}>
                        <span>{c.name}</span>
                        <span className="tr"><i style={{ width: `${c.pct}%` }} /></span>
                        <span className="pc">{c.pct}%</span>
                    </div>
                ))}
            </div>
            <div className="dfoot">
                <div className="feedrow" aria-hidden="true">
                    <span className="fi" key={tick}><b>[{src}]</b><span>{msg}</span></span>
                </div>
                <span style={{ flex: 'none' }}>Sample feed</span>
            </div>
        </div>
    );
}
