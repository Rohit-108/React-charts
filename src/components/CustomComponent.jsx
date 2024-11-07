export const CustomLegend = ({ payload }) => (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', margin: '10px 0' }}>
        {payload.map((entry, index) => (
            <div key={`legend-item-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: entry.color }}></div>
                <span style={{ color: '#333', fontSize: '14px' }}>{entry.value}</span>
            </div>
        ))}
    </div>
);

export const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px' }}>
                <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>{label}</p>
                {payload.map((entry, index) => (
                    <p key={`tooltip-item-${index}`} style={{ color: entry.color }}>
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export const CustomXAxisTick = ({ x, y, payload }) => (
    <text x={x} y={y + 15} textAnchor="middle" fill="#333" fontSize="12px">
        {payload.value}
    </text>
);