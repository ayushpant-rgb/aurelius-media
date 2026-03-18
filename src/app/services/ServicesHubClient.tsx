'use client';

import Link from 'next/link';
import { serviceCategories, getServicesByCategory } from '@/data/servicePages';
import { ServiceData } from '@/data/servicePages';

/* ───────────────────────────────────────────────
   Unique visual illustrations for each service card.
   ─────────────────────────────────────────────── */

function MarketingStrategyAuditVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-amber-500/20 flex items-center justify-center text-amber-400 text-[8px]">◉</span>
                Funnel Audit
            </div>
            <div className="space-y-1.5">
                {[
                    { stage: 'Awareness', score: 72, color: 'bg-amber-400', status: 'Optimize' },
                    { stage: 'Interest', score: 45, color: 'bg-orange-400', status: 'Fix' },
                    { stage: 'Conversion', score: 28, color: 'bg-red-400', status: 'Critical' },
                    { stage: 'Retention', score: 61, color: 'bg-emerald-400', status: 'Good' },
                ].map((item, i) => (
                    <div key={i} className="bg-brand-dark/60 rounded-lg px-2.5 py-1.5 flex items-center gap-2">
                        <span className="text-[9px] text-brand-gray w-16">{item.stage}</span>
                        <div className="flex-1 bg-brand-dark rounded-full h-1.5">
                            <div className={`${item.color} h-1.5 rounded-full`} style={{ width: `${item.score}%` }} />
                        </div>
                        <span className={`text-[8px] px-1.5 py-0.5 rounded-full ${
                            item.status === 'Critical' ? 'bg-red-500/15 text-red-400' :
                            item.status === 'Fix' ? 'bg-orange-500/15 text-orange-400' :
                            item.status === 'Optimize' ? 'bg-amber-500/15 text-amber-400' :
                            'bg-emerald-500/15 text-emerald-400'
                        }`}>{item.status}</span>
                    </div>
                ))}
            </div>
            <div className="text-[9px] text-brand-gray-dark">📊 360° audit · Channel strategy · Growth roadmap</div>
        </div>
    );
}

function GoogleAdsVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-blue-500/20 flex items-center justify-center text-blue-400 text-[8px] font-bold">G</span>
                Campaign Dashboard
            </div>
            <div className="grid grid-cols-3 gap-2">
                <div className="bg-brand-dark/60 rounded-lg p-2">
                    <p className="text-[8px] text-brand-gray-dark mb-0.5">ROAS</p>
                    <p className="text-sm font-bold text-emerald-400">4.2x</p>
                </div>
                <div className="bg-brand-dark/60 rounded-lg p-2">
                    <p className="text-[8px] text-brand-gray-dark mb-0.5">CPA</p>
                    <p className="text-sm font-bold text-brand-white">$18</p>
                </div>
                <div className="bg-brand-dark/60 rounded-lg p-2">
                    <p className="text-[8px] text-brand-gray-dark mb-0.5">CTR</p>
                    <p className="text-sm font-bold text-blue-400">3.8%</p>
                </div>
            </div>
            <div className="flex items-end gap-1 h-8">
                {[35, 42, 28, 55, 48, 62, 58, 70, 65, 78, 72, 85].map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm bg-blue-500/30" style={{ height: `${h}%` }} />
                ))}
            </div>
        </div>
    );
}

function MetaAdsVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-[8px] font-bold">M</span>
                Ad Performance
            </div>
            <div className="bg-brand-dark/60 rounded-lg p-2.5 space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-[9px] text-brand-gray-dark">Reach</span>
                    <span className="text-[9px] text-brand-gray">2.4M</span>
                </div>
                <div className="w-full bg-brand-dark rounded-full h-1.5">
                    <div className="bg-indigo-400 h-1.5 rounded-full" style={{ width: '78%' }} />
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-[9px] text-brand-gray-dark">Conversions</span>
                    <span className="text-[9px] text-brand-gray">1,847</span>
                </div>
                <div className="w-full bg-brand-dark rounded-full h-1.5">
                    <div className="bg-purple-400 h-1.5 rounded-full" style={{ width: '62%' }} />
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-[9px] text-brand-gray-dark">CPA Reduction</span>
                    <span className="text-[9px] text-emerald-400">-37%</span>
                </div>
                <div className="w-full bg-brand-dark rounded-full h-1.5">
                    <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '85%' }} />
                </div>
            </div>
        </div>
    );
}

function AICreativeVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-purple-500/20 flex items-center justify-center text-purple-400 text-[8px]">✦</span>
                AI Creative Studio
            </div>
            <div className="bg-brand-dark/60 rounded-lg p-2.5">
                <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                    <span className="text-[9px] text-purple-300">Generating ad creatives...</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="aspect-square rounded bg-gradient-to-br from-purple-500/20 to-indigo-500/10 flex items-center justify-center">
                            <span className="text-[8px] text-purple-400/60">v{i}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center gap-1.5">
                <span className="text-[9px] text-emerald-400">✓</span>
                <span className="text-[9px] text-brand-gray-dark">3 variants ready in 20s</span>
            </div>
        </div>
    );
}

function CreativeDesignVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-orange-500/20 flex items-center justify-center text-orange-400 text-[8px]">◆</span>
                Creative Pipeline
            </div>
            <div className="space-y-1.5">
                {['Brand Identity', 'Ad Creatives', 'Social Graphics'].map((item, i) => (
                    <div key={i} className="bg-brand-dark/60 rounded-lg px-2.5 py-2 flex items-center justify-between">
                        <span className="text-[9px] text-brand-gray">{item}</span>
                        <span className={`text-[8px] px-1.5 py-0.5 rounded-full ${i === 0 ? 'bg-emerald-500/15 text-emerald-400' : i === 1 ? 'bg-yellow-500/15 text-yellow-400' : 'bg-brand-card text-brand-gray-dark'}`}>
                            {i === 0 ? 'Done' : i === 1 ? 'In Progress' : 'Queued'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ReelsEditingVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-rose-500/20 flex items-center justify-center text-rose-400 text-[8px]">♦</span>
                Reels Editor
            </div>
            <div className="bg-brand-dark/60 rounded-lg p-2">
                <div className="flex gap-1 mb-2">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className={`flex-1 h-5 rounded-sm ${i < 3 ? 'bg-rose-500/20' : i < 5 ? 'bg-purple-500/15' : 'bg-indigo-500/10'}`} />
                    ))}
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="text-[8px] text-rose-400">00:00</span>
                    <div className="flex-1 bg-brand-dark rounded-full h-0.5">
                        <div className="bg-rose-400 h-0.5 rounded-full w-2/5" />
                    </div>
                    <span className="text-[8px] text-brand-gray-dark">00:30</span>
                </div>
            </div>
            <div className="text-[9px] text-brand-gray-dark">⚡ Hook-first editing · Caption overlays</div>
        </div>
    );
}

function BookMarketingVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-amber-500/20 flex items-center justify-center text-amber-400 text-[8px]">◈</span>
                Launch Tracker
            </div>
            <div className="bg-brand-dark/60 rounded-lg p-2.5 space-y-1.5">
                <div className="flex justify-between items-center">
                    <span className="text-[9px] text-brand-gray">Copies Sold</span>
                    <span className="text-[10px] font-bold text-amber-400">100,000+</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[9px] text-brand-gray">Amazon Rank</span>
                    <span className="text-[10px] font-bold text-emerald-400">#3</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[9px] text-brand-gray">Ad ROAS</span>
                    <span className="text-[10px] font-bold text-brand-white">5.2x</span>
                </div>
            </div>
        </div>
    );
}

function EducationMarketingVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-[8px]">▣</span>
                Admissions Funnel
            </div>
            <div className="space-y-1">
                {[
                    { label: 'Impressions', value: '2.4M', width: '100%', color: 'bg-cyan-500/25' },
                    { label: 'Inquiries', value: '4,200', width: '60%', color: 'bg-cyan-500/35' },
                    { label: 'Visits', value: '890', width: '35%', color: 'bg-cyan-500/45' },
                    { label: 'Enrolled', value: '312', width: '18%', color: 'bg-emerald-500/50' },
                ].map((step, i) => (
                    <div key={i} className={`${step.color} rounded px-2 py-1.5 flex justify-between items-center`} style={{ width: step.width }}>
                        <span className="text-[8px] text-brand-gray">{step.label}</span>
                        <span className="text-[8px] font-bold text-brand-white">{step.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function RealEstateMarketingVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-teal-500/20 flex items-center justify-center text-teal-400 text-[8px]">⌂</span>
                Lead Pipeline
            </div>
            <div className="bg-brand-dark/60 rounded-lg p-2.5 space-y-1.5">
                <div className="flex justify-between items-center">
                    <span className="text-[9px] text-brand-gray">Qualified Leads</span>
                    <span className="text-[10px] font-bold text-teal-400">1,240</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[9px] text-brand-gray">Cost Per Lead</span>
                    <span className="text-[10px] font-bold text-emerald-400">$12</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[9px] text-brand-gray">Conversion Rate</span>
                    <span className="text-[10px] font-bold text-brand-white">4.8%</span>
                </div>
            </div>
            <div className="text-[9px] text-brand-gray-dark">🏗️ Geo-targeted · CRM-integrated</div>
        </div>
    );
}

function AIAutomationVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-[8px]">⚡</span>
                Workflow Engine
            </div>
            <div className="bg-brand-dark/60 rounded-lg p-2.5">
                <div className="font-mono text-[9px] text-brand-gray space-y-1">
                    <p><span className="text-emerald-400">→</span> Lead captured from form</p>
                    <p><span className="text-emerald-400">→</span> AI scores lead: <span className="text-amber-400">High Intent</span></p>
                    <p><span className="text-emerald-400">→</span> Routed to sales + CRM</p>
                    <p><span className="text-emerald-400">→</span> Nurture sequence <span className="text-emerald-400">started</span></p>
                </div>
            </div>
            <div className="flex items-center gap-1.5">
                <span className="text-[9px] text-emerald-400">●</span>
                <span className="text-[9px] text-brand-gray-dark">Running 24/7 · 0 manual steps</span>
            </div>
        </div>
    );
}

function NoCodeDevVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-violet-500/20 flex items-center justify-center text-violet-400 text-[8px]">⟡</span>
                Build Pipeline
            </div>
            <div className="bg-brand-dark/60 rounded-lg p-2.5">
                <div className="font-mono text-[9px] space-y-1">
                    <p className="text-violet-300">{`// MVP deployed in 2 weeks`}</p>
                    <p className="text-brand-gray"><span className="text-violet-400">const</span> app = <span className="text-amber-400">buildMVP</span>{`({`}</p>
                    <p className="text-brand-gray pl-3">framework: <span className="text-emerald-400">&quot;next.js&quot;</span>,</p>
                    <p className="text-brand-gray pl-3">deploy: <span className="text-emerald-400">&quot;vercel&quot;</span></p>
                    <p className="text-brand-gray">{`}`});</p>
                </div>
            </div>
        </div>
    );
}

function AIWorkshopsVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-sky-500/20 flex items-center justify-center text-sky-400 text-[8px]">▲</span>
                Workshop Modules
            </div>
            <div className="space-y-1.5">
                {['ChatGPT for Marketing', 'AI Creative Production', 'Automation Workflows'].map((mod, i) => (
                    <div key={i} className="bg-brand-dark/60 rounded-lg px-2.5 py-2 flex items-center gap-2">
                        <span className={`text-[9px] ${i === 0 ? 'text-sky-400' : i === 1 ? 'text-purple-400' : 'text-emerald-400'}`}>0{i + 1}</span>
                        <span className="text-[9px] text-brand-gray">{mod}</span>
                    </div>
                ))}
            </div>
            <div className="text-[9px] text-brand-gray-dark">Certificate included · Hands-on</div>
        </div>
    );
}

/* ─── New service visuals ─── */

function LinkedInAdsVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-blue-600/20 flex items-center justify-center text-blue-400 text-[8px] font-bold">in</span>
                ABM Campaign
            </div>
            <div className="bg-brand-dark/60 rounded-lg p-2.5 space-y-1.5">
                <div className="flex justify-between items-center">
                    <span className="text-[9px] text-brand-gray">Pipeline</span>
                    <span className="text-[10px] font-bold text-blue-400">$420K</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[9px] text-brand-gray">MQLs</span>
                    <span className="text-[10px] font-bold text-brand-white">142</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[9px] text-brand-gray">Meetings Booked</span>
                    <span className="text-[10px] font-bold text-emerald-400">38</span>
                </div>
            </div>
            <div className="text-[9px] text-brand-gray-dark">💼 Firmographic targeting · InMail</div>
        </div>
    );
}

function YouTubeAdsVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-red-500/20 flex items-center justify-center text-red-400 text-[8px]">▶</span>
                Video Campaigns
            </div>
            <div className="grid grid-cols-3 gap-2">
                <div className="bg-brand-dark/60 rounded-lg p-2">
                    <p className="text-[8px] text-brand-gray-dark mb-0.5">VTR</p>
                    <p className="text-sm font-bold text-red-400">32%</p>
                </div>
                <div className="bg-brand-dark/60 rounded-lg p-2">
                    <p className="text-[8px] text-brand-gray-dark mb-0.5">CPV</p>
                    <p className="text-sm font-bold text-brand-white">$0.04</p>
                </div>
                <div className="bg-brand-dark/60 rounded-lg p-2">
                    <p className="text-[8px] text-brand-gray-dark mb-0.5">Conv.</p>
                    <p className="text-sm font-bold text-emerald-400">847</p>
                </div>
            </div>
            <div className="flex items-end gap-1 h-6">
                {[20, 35, 45, 38, 55, 62, 58, 70].map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm bg-red-500/25" style={{ height: `${h}%` }} />
                ))}
            </div>
        </div>
    );
}

function TikTokAdsVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-pink-500/20 flex items-center justify-center text-pink-400 text-[8px]">♪</span>
                TikTok Performance
            </div>
            <div className="bg-brand-dark/60 rounded-lg p-2.5 space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-[9px] text-brand-gray-dark">Engagement</span>
                    <span className="text-[9px] text-pink-400">8.4%</span>
                </div>
                <div className="w-full bg-brand-dark rounded-full h-1.5">
                    <div className="bg-pink-400 h-1.5 rounded-full" style={{ width: '84%' }} />
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-[9px] text-brand-gray-dark">Conversions</span>
                    <span className="text-[9px] text-brand-gray">2,340</span>
                </div>
                <div className="w-full bg-brand-dark rounded-full h-1.5">
                    <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: '65%' }} />
                </div>
            </div>
            <div className="text-[9px] text-brand-gray-dark">🎵 Platform-native · Trend-aware</div>
        </div>
    );
}

function RetargetingVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-orange-500/20 flex items-center justify-center text-orange-400 text-[8px]">⟳</span>
                Retargeting Funnel
            </div>
            <div className="bg-brand-dark/60 rounded-lg p-2.5">
                <div className="font-mono text-[9px] text-brand-gray space-y-1">
                    <p><span className="text-orange-400">1.</span> Visitor lands on site</p>
                    <p><span className="text-orange-400">2.</span> Pixel fires → audience built</p>
                    <p><span className="text-orange-400">3.</span> Sequential ads across platforms</p>
                    <p><span className="text-emerald-400">✓</span> <span className="text-emerald-400">Converted</span> in 3.2 touchpoints avg</p>
                </div>
            </div>
        </div>
    );
}

function LeadGenerationVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-[8px]">⊕</span>
                Lead Pipeline
            </div>
            <div className="bg-brand-dark/60 rounded-lg p-2.5 space-y-1.5">
                <div className="flex justify-between items-center">
                    <span className="text-[9px] text-brand-gray">Leads / Month</span>
                    <span className="text-[10px] font-bold text-emerald-400">340</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[9px] text-brand-gray">Qualified Rate</span>
                    <span className="text-[10px] font-bold text-brand-white">68%</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[9px] text-brand-gray">Cost/SQL</span>
                    <span className="text-[10px] font-bold text-amber-400">$24</span>
                </div>
            </div>
            <div className="text-[9px] text-brand-gray-dark">🎯 Multi-channel · CRM-integrated</div>
        </div>
    );
}

function FunnelBuildingVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-violet-500/20 flex items-center justify-center text-violet-400 text-[8px]">▽</span>
                Funnel Architecture
            </div>
            <div className="space-y-1">
                {[
                    { label: 'TOFU — Awareness', width: '100%', color: 'bg-violet-500/20' },
                    { label: 'MOFU — Consideration', width: '70%', color: 'bg-violet-500/30' },
                    { label: 'BOFU — Conversion', width: '40%', color: 'bg-violet-500/45' },
                    { label: 'Retention', width: '25%', color: 'bg-emerald-500/40' },
                ].map((step, i) => (
                    <div key={i} className={`${step.color} rounded px-2 py-1.5`} style={{ width: step.width }}>
                        <span className="text-[8px] text-brand-gray">{step.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function CROVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-green-500/20 flex items-center justify-center text-green-400 text-[8px]">↗</span>
                Experiment Dashboard
            </div>
            <div className="bg-brand-dark/60 rounded-lg p-2.5 space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-[9px] text-brand-gray-dark">Test A (Control)</span>
                    <span className="text-[9px] text-brand-gray">2.4%</span>
                </div>
                <div className="w-full bg-brand-dark rounded-full h-1.5">
                    <div className="bg-brand-gray-dark h-1.5 rounded-full" style={{ width: '24%' }} />
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-[9px] text-green-400">Test B (Winner) ✓</span>
                    <span className="text-[9px] text-green-400">4.1%</span>
                </div>
                <div className="w-full bg-brand-dark rounded-full h-1.5">
                    <div className="bg-green-400 h-1.5 rounded-full" style={{ width: '41%' }} />
                </div>
            </div>
            <div className="text-[9px] text-brand-gray-dark">📈 +71% uplift · 95% confidence</div>
        </div>
    );
}

function ProgrammaticSEOVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-lime-500/20 flex items-center justify-center text-lime-400 text-[8px]">◎</span>
                pSEO Engine
            </div>
            <div className="bg-brand-dark/60 rounded-lg p-2.5 space-y-1.5">
                <div className="flex justify-between items-center">
                    <span className="text-[9px] text-brand-gray">Pages Generated</span>
                    <span className="text-[10px] font-bold text-lime-400">2,400</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[9px] text-brand-gray">Indexed</span>
                    <span className="text-[10px] font-bold text-emerald-400">2,180</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[9px] text-brand-gray">Organic Traffic</span>
                    <span className="text-[10px] font-bold text-brand-white">+340%</span>
                </div>
            </div>
        </div>
    );
}

function AnalyticsReportingVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-sky-500/20 flex items-center justify-center text-sky-400 text-[8px]">◧</span>
                Analytics Dashboard
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="bg-brand-dark/60 rounded-lg p-2">
                    <p className="text-[8px] text-brand-gray-dark mb-0.5">Revenue</p>
                    <p className="text-sm font-bold text-emerald-400">$842K</p>
                </div>
                <div className="bg-brand-dark/60 rounded-lg p-2">
                    <p className="text-[8px] text-brand-gray-dark mb-0.5">ROAS</p>
                    <p className="text-sm font-bold text-sky-400">5.2x</p>
                </div>
            </div>
            <div className="flex items-end gap-0.5 h-8">
                {[25, 30, 45, 35, 55, 48, 60, 52, 70, 65, 75, 82].map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm bg-sky-500/25" style={{ height: `${h}%` }} />
                ))}
            </div>
        </div>
    );
}

function EmailLifecycleVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-[8px]">✉</span>
                Email Sequences
            </div>
            <div className="space-y-1.5">
                {['Welcome Series', 'Nurture Flow', 'Win-Back Campaign'].map((item, i) => (
                    <div key={i} className="bg-brand-dark/60 rounded-lg px-2.5 py-2 flex items-center justify-between">
                        <span className="text-[9px] text-brand-gray">{item}</span>
                        <span className={`text-[8px] px-1.5 py-0.5 rounded-full ${i === 0 ? 'bg-emerald-500/15 text-emerald-400' : i === 1 ? 'bg-indigo-500/15 text-indigo-400' : 'bg-amber-500/15 text-amber-400'}`}>
                            {i === 0 ? '45% open' : i === 1 ? '32% CTR' : '12% reactivated'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function BrandVideosVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-amber-500/20 flex items-center justify-center text-amber-400 text-[8px]">▶</span>
                Production Pipeline
            </div>
            <div className="space-y-1.5">
                {['Concept & Script', 'Production', 'Post-Production'].map((item, i) => (
                    <div key={i} className="bg-brand-dark/60 rounded-lg px-2.5 py-2 flex items-center justify-between">
                        <span className="text-[9px] text-brand-gray">{item}</span>
                        <span className={`text-[8px] px-1.5 py-0.5 rounded-full ${i === 0 ? 'bg-emerald-500/15 text-emerald-400' : i === 1 ? 'bg-amber-500/15 text-amber-400' : 'bg-brand-card text-brand-gray-dark'}`}>
                            {i === 0 ? 'Done' : i === 1 ? 'Filming' : 'Queued'}
                        </span>
                    </div>
                ))}
            </div>
            <div className="text-[9px] text-brand-gray-dark">🎬 4K · Multi-format delivery</div>
        </div>
    );
}

function UGCAdsVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-pink-500/20 flex items-center justify-center text-pink-400 text-[8px]">◉</span>
                UGC Studio
            </div>
            <div className="grid grid-cols-3 gap-1.5">
                {[1, 2, 3].map(i => (
                    <div key={i} className="aspect-[9/16] rounded bg-gradient-to-br from-pink-500/15 to-rose-500/10 flex items-center justify-center">
                        <span className="text-[8px] text-pink-400/60">UGC {i}</span>
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-1.5">
                <span className="text-[9px] text-emerald-400">✓</span>
                <span className="text-[9px] text-brand-gray-dark">3x outperforming branded ads</span>
            </div>
        </div>
    );
}

function LandingPagesVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-[8px]">⊞</span>
                Page Builder
            </div>
            <div className="bg-brand-dark/60 rounded-lg p-2.5">
                <div className="w-full h-3 bg-brand-card rounded-t mb-1" />
                <div className="w-3/4 h-2 bg-brand-card rounded mb-1" />
                <div className="w-1/2 h-2 bg-brand-card rounded mb-2" />
                <div className="w-1/3 h-5 bg-cyan-500/20 rounded flex items-center justify-center">
                    <span className="text-[7px] text-cyan-400">CTA</span>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-[9px] text-brand-gray-dark">Conversion rate</span>
                <span className="text-[9px] text-emerald-400 font-bold">8.4%</span>
            </div>
        </div>
    );
}

function ContentStrategyVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-teal-500/20 flex items-center justify-center text-teal-400 text-[8px]">◇</span>
                Content Calendar
            </div>
            <div className="grid grid-cols-5 gap-1">
                {['M', 'T', 'W', 'T', 'F'].map((day, i) => (
                    <div key={i} className="text-center">
                        <span className="text-[7px] text-brand-gray-dark">{day}</span>
                        <div className={`mt-1 h-6 rounded ${i === 0 ? 'bg-teal-500/25' : i === 2 ? 'bg-purple-500/20' : i === 4 ? 'bg-amber-500/20' : 'bg-brand-dark/40'}`} />
                    </div>
                ))}
            </div>
            <div className="text-[9px] text-brand-gray-dark">📝 3 posts/week · Topic clusters</div>
        </div>
    );
}

function PitchDecksVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-amber-500/20 flex items-center justify-center text-amber-400 text-[8px]">◫</span>
                Deck Preview
            </div>
            <div className="grid grid-cols-3 gap-1.5">
                {['Problem', 'Solution', 'Traction'].map((slide, i) => (
                    <div key={i} className="aspect-[4/3] rounded bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-brand-border-subtle flex items-center justify-center">
                        <span className="text-[7px] text-amber-400/70">{slide}</span>
                    </div>
                ))}
            </div>
            <div className="text-[9px] text-brand-gray-dark">📑 12-20 slides · Data-driven narrative</div>
        </div>
    );
}

function AIAgentsVisual() {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] text-brand-gray-dark">
                <span className="w-5 h-5 rounded bg-violet-500/20 flex items-center justify-center text-violet-400 text-[8px]">⊛</span>
                AI Agent
            </div>
            <div className="bg-brand-dark/60 rounded-lg p-2.5">
                <div className="font-mono text-[9px] text-brand-gray space-y-1">
                    <p><span className="text-violet-400">Agent:</span> Analyzing incoming lead...</p>
                    <p><span className="text-violet-400">Score:</span> <span className="text-emerald-400">92/100 — High Intent</span></p>
                    <p><span className="text-violet-400">Action:</span> Route to sales + send welcome</p>
                    <p><span className="text-emerald-400">✓</span> Completed in 1.2s</p>
                </div>
            </div>
            <div className="flex items-center gap-1.5">
                <span className="text-[9px] text-violet-400">●</span>
                <span className="text-[9px] text-brand-gray-dark">Custom LLM · Your data</span>
            </div>
        </div>
    );
}

const visualMap: Record<string, () => React.ReactNode> = {
    'marketing-strategy-audit': MarketingStrategyAuditVisual,
    'google-ads': GoogleAdsVisual,
    'meta-ads': MetaAdsVisual,
    'ai-creative-design': AICreativeVisual,
    'creative-design': CreativeDesignVisual,
    'reels-editing': ReelsEditingVisual,
    'book-marketing': BookMarketingVisual,
    'education-marketing': EducationMarketingVisual,
    'real-estate-marketing': RealEstateMarketingVisual,
    'ai-automation': AIAutomationVisual,
    'no-code-development': NoCodeDevVisual,
    'ai-workshops': AIWorkshopsVisual,
    'linkedin-ads': LinkedInAdsVisual,
    'youtube-ads': YouTubeAdsVisual,
    'tiktok-ads': TikTokAdsVisual,
    'retargeting': RetargetingVisual,
    'lead-generation': LeadGenerationVisual,
    'funnel-building': FunnelBuildingVisual,
    'cro': CROVisual,
    'programmatic-seo': ProgrammaticSEOVisual,
    'analytics-reporting': AnalyticsReportingVisual,
    'email-lifecycle': EmailLifecycleVisual,
    'brand-videos': BrandVideosVisual,
    'ugc-ads': UGCAdsVisual,
    'landing-pages': LandingPagesVisual,
    'content-strategy': ContentStrategyVisual,
    'pitch-decks': PitchDecksVisual,
    'ai-agents': AIAgentsVisual,
};

function ServiceCard({ service }: { service: ServiceData }) {
    const Visual = visualMap[service.slug];

    return (
        <Link
            href={`/services/${service.slug}`}
            className="group flex flex-col rounded-2xl bg-brand-card border border-brand-border-subtle hover:border-brand-border-hover transition-all duration-300 overflow-hidden hover:-translate-y-1"
        >
            {/* Visual Illustration Pane */}
            <div className="p-5 pb-4 bg-gradient-to-b from-brand-card to-brand-card-hover border-b border-brand-border-subtle">
                {Visual ? <Visual /> : null}
            </div>

            {/* Text Content */}
            <div className="p-5 pt-4 flex flex-col flex-1">
                <h3 className="text-base font-bold text-brand-white mb-2 group-hover:text-brand-accent transition-colors duration-200">
                    {service.title}
                </h3>
                <p className="text-xs text-brand-gray leading-relaxed flex-1">
                    {service.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-accent group-hover:text-brand-accent-hover transition-colors">
                    Learn More
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
        </Link>
    );
}

export default function ServicesHubClient() {
    return (
        <main className="bg-brand-dark text-brand-white">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-dark" />
                <div className="absolute inset-0 hero-glow opacity-40" />
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-brand-accent/10 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-card/50 border border-brand-border-subtle text-[10px] font-medium text-brand-gray-dark mb-6">
                        <span className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
                        Our Capabilities
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-5">
                        Services built for{' '}
                        <span className="font-display italic font-normal">growth.</span>
                    </h1>

                    <p className="text-base sm:text-lg text-brand-gray max-w-xl mx-auto leading-relaxed mb-8">
                        From performance marketing to AI automation, we offer a full stack
                        of services designed to scale your business.
                    </p>

                    <a
                        href="https://cal.com/aureliusmedia/15min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex px-7 py-3.5 cta-primary text-white font-semibold rounded-lg text-sm"
                    >
                        Book a Strategy Call
                    </a>
                </div>
            </section>

            {/* Service Categories */}
            {serviceCategories.map((category) => {
                const categoryServices = getServicesByCategory(category.key);
                return (
                    <section key={category.key} id={category.key.replace('_', '-')} className="py-16 sm:py-20 odd:bg-brand-darker even:bg-brand-dark scroll-mt-24">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6">
                            <div className="mb-10">
                                <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gray-dark mb-3">{category.label}</p>
                                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
                                    {category.label}
                                </h2>
                                <p className="text-sm text-brand-gray max-w-lg leading-relaxed">
                                    {category.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {categoryServices.map((service) => (
                                    <ServiceCard key={service.slug} service={service} />
                                ))}
                            </div>
                        </div>
                    </section>
                );
            })}

            {/* Final CTA */}
            <section className="py-20 sm:py-28 bg-brand-dark relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-accent/8 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                        Not sure where to <span className="font-display italic font-normal">start?</span>
                    </h2>
                    <p className="text-sm text-brand-gray max-w-lg mx-auto mb-8 leading-relaxed">
                        Book a free 15-minute strategy call. We will review your current marketing
                        and identify the highest-impact opportunities for growth.
                    </p>
                    <a
                        href="https://cal.com/aureliusmedia/15min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex px-8 py-3.5 cta-primary text-white font-semibold rounded-lg text-sm"
                    >
                        Book a Strategy Call
                    </a>
                </div>
            </section>
        </main>
    );
}
