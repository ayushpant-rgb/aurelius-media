// Giant service words sliding past between sections (words from the services copy).
const words = [
    { t: 'Performance Marketing', c: '' },
    { t: 'AI Creative', c: 'o' },
    { t: 'Growth Engineering', c: 'a' },
    { t: 'Media Buying', c: 'o' },
    { t: 'Funnels', c: '' },
    { t: 'AI Automation', c: 'o' },
];

export default function KineticBand({ reverse = false }: { reverse?: boolean }) {
    const loop = [...words, ...words];
    return (
        <div className={`kband${reverse ? ' rev' : ''}`} aria-hidden="true">
            <div className="ktrk">
                {loop.map((w, i) => (
                    <span key={i} style={{ display: 'contents' }}>
                        <span className={`kw ${w.c}`}>{w.t}</span>
                        <span className="kstar">✦</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
