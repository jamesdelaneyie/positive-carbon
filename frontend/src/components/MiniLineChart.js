const LineChart = ({ data }) => {

    //console.log(data)

    //reverse the order of the array
    const chartData = data.slice()
    chartData.reverse();

    //change all prices to numbers
    chartData.forEach(d => {
        d.price = Number(d.price);
    });

    // get the max and min price from the data, the price is stored as a string so we need to convert it to a number
    const maxPrice = Math.max(...chartData.map(d => Number(d.price)));
    const minPrice = Math.min(...chartData.map(d => Number(d.price)));

    const height = 40;
    const width = 120;

    // create an array of points for the line
    const points = chartData.map((d, i) => {
        const x = i * (width / (data.length - 1));
        const y = height - ((d.price - minPrice) / (maxPrice - minPrice)) * height;
        return `${x},${y}`;
    })

    const linePoints = points.join(" ");

    const Line = ({ points }) => (
        <polyline
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
            points={points}
        />
    );
                
    return (
        <div className="absolute left-20">
            <svg className="ml-3 mt-2" height={height} width={width} style={{overflow: 'visible'}}>
                <Line points={linePoints} />
            </svg>       
        </div>
    )
}

export default LineChart;


