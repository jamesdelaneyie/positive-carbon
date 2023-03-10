const commodityHistoricalData = (props) => {    
    
    <main className="p-4 border border-stone-200 rounded">
        <h3 className="font-bold mb-3 text-sm">{commodityName.current} Historical Data</h3>
        <ul>
            {commodityPrices ? commodityPrices.map((commodity, index) => (
            <li key={index} className="tabular-nums flex font-light text-sm">
                <div class="flex-1">{commodity.time}</div>
                <div class="flex-1 text-right">{Number(commodity.price).toFixed(2)}</div>
            </li>
            )) : <p>Loading...</p>}
        </ul>
    </main>

            }


export default commodityHistoricalData;

