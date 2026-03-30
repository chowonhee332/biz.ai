import React from 'react';

const VennDiagram = () => {
    const items = [
        { title: 'AI:ON-U' },
        { title: 'AI Works' },
        { title: 'SQL Agent' },
    ];

    return (
        <div className="w-full max-w-[800px] mx-auto py-8 relative" style={{ overflow: 'visible' }}>
            <svg
                width="100%"
                viewBox="0 0 1080 360"
                style={{ overflow: 'visible', display: 'block' }}
            >
                <defs>
                    {/* Animated sweep gradient */}
                    <linearGradient id="heroSweep" gradientUnits="userSpaceOnUse" x1="-150" y1="0" x2="150" y2="0">
                        <stop offset="0%" stopColor="white" stopOpacity="0" />
                        <stop offset="50%" stopColor="white" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                        <animateTransform
                            attributeName="gradientTransform"
                            type="translate"
                            from="-800 0"
                            to="1880 0"
                            dur="5s"
                            repeatCount="indefinite"
                            begin="0s"
                        />
                    </linearGradient>
                </defs>

                {/* Full-width horizontal line (static + sweep) */}
                <line x1="-600" y1="180" x2="1680" y2="180" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <line x1="-600" y1="180" x2="1680" y2="180" stroke="url(#heroSweep)" strokeWidth="1" />

                {/* Circles with dark fill to hide line behind them */}
                {[180, 520, 860].map((cx, i) => (
                    <circle key={i} cx={cx} cy={180} r={179} fill="#0A0A0A" />
                ))}

                {/* Circle borders (static + sweep) */}
                {[180, 520, 860].map((cx, i) => (
                    <circle key={i} cx={cx} cy={180} r={179} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
                ))}
                {[180, 520, 860].map((cx, i) => (
                    <circle key={i} cx={cx} cy={180} r={179} fill="none" stroke="url(#heroSweep)" strokeWidth="1.5" />
                ))}

                {/* Labels */}
                {items.map((item, i) => (
                    <text
                        key={i}
                        x={180 + i * 340}
                        y={188}
                        textAnchor="middle"
                        fill="white"
                        fontSize="22"
                        fontWeight="bold"
                        fontFamily="Pretendard, sans-serif"
                    >
                        {item.title}
                    </text>
                ))}
            </svg>
        </div>
    );
};

export default VennDiagram;
