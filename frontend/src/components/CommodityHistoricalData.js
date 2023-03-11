const CommodityHistoricalData = (props) => {    

    const commodityPrices = props.commodityPrices;
    const commodityName = props.commodityName;
    
    return (
        <main className="p-4 border border-stone-200 rounded">
            <h3 className="font-bold mb-3 text-sm">{commodityName} Historical Data</h3>
            {/* A html table with the commodity prices, including date, price, open, high, low, volume, and change, styled in tailwind */}
            <table className="table-auto w-full tabular-nums font-light text-sm">
                <thead>
                    <tr>
                        <th className="text-left">Date</th>
                        <th className="text-left">Price</th>
                        <th className="text-left">Open</th>
                        <th className="text-left">High</th>
                        <th className="text-left">Low</th>
                        <th className="text-left">Volume</th>
                        <th className="text-left">Change</th>
                    </tr>
                </thead>
                <tbody>
                    {commodityPrices ? commodityPrices.map((commodity, index) => (
                    <tr key={index}>
                        <td>{commodity.date_created}</td>
                        <td>{commodity.price}</td>
                        <td>{commodity.open}</td>
                        <td>{commodity.high}</td>
                        <td>{commodity.low}</td>
                        <td>{commodity.volume}</td>
                        <td>{commodity.change}</td>
                    </tr>
                    )) : <p>Loading...</p>}
                </tbody>
            </table>

        </main>
    )
}


export default CommodityHistoricalData;

