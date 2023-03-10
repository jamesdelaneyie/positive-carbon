{/*const YXAxis = ({ data }) => (
    <g className="y-axis">
        {data.map((d, i) => {
            const y = i * (height / (data.length - 1));
            return (
                <g key={i} transform={`translate(0, ${y + 5})`}>
                    <line x2={width} stroke="#cecece" strokeWidth="0" />
                    <text
                        x={width + 10}
                        textAnchor="start"
                        fontSize="10"
                        fill="#2563eb"
                    >
                        {Number(d.price).toFixed(2)}
                    </text>
                </g>
            );
        })}
    </g>
);


const XAxis = ({ data }) => (
    <g className="x-axis">
        {data.map((d, i) => {
            const x = i * (width / (data.length - 1));
            return (
                <g key={i} transform={`translate(${x}, 0)`}>
                    <line y2={height} stroke="#cecece" strokeWidth="0.5" />
                    <text
                        y={height + 20}
                        textAnchor="middle"
                        fontSize="10"
                        fill="#2563eb"
                    >
                        {d.date_created.slice(16, d.date_created.length - 7)} 
                    </text>
                </g>
            );
        })}
    </g>
);
*/}