'use client';

type Theme = 'light' | 'dark';

// Both icons are rendered; CSS shows the one matching <html data-theme>, so the
// server markup never disagrees with the theme the pre-paint script picked.
export default function ThemeToggle() {
    const toggle = () => {
        const root = document.documentElement;
        const next: Theme = root.dataset.theme === 'light' ? 'dark' : 'light';
        root.dataset.theme = next;
        try {
            localStorage.setItem('theme', next);
        } catch {
            // private mode: the choice just won't persist
        }
    };

    return (
        <button type="button" className="iconbtn themebtn" onClick={toggle} aria-label="Toggle light and dark mode" title="Toggle light / dark">
            <svg className="ico-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <circle cx="12" cy="12" r="4.2" />
                <path strokeLinecap="round" d="M12 2v2.2M12 19.8V22M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2 12h2.2M19.8 12H22M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
            </svg>
            <svg className="ico-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
        </button>
    );
}
