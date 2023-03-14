const CommodityHistoricalData = (props) => {    

    const commodityPrices = props.commodityPrices;
    const commodityName = props.commodityName;

    function kFormatter(num) {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
    }
    
    return (
        <main className="p-4 border border-slate-200 rounded mb-4">
            <h3 className="font-bold mb-3">{commodityName} Historical Data</h3>
            {/* A html table with the commodity prices, including date, price, open, high, low, volume, and change, styled in tailwind */}
            
            <div className="block h-96 max-h-96 overflow-y-scroll">
                <table className="table-auto w-full tabular-nums font-light text-xs rounded-md overflow-hidden">
                    <thead style={{top: "-1px"}} className="sticky top-0">
                        <tr className="bg-slate-200 border">
                            <th className="text-left py-2 px-2 font-normal text-slate-600">Date</th>
                            <th className="text-left font-normal text-slate-600">Price</th>
                            <th className="text-left font-normal text-slate-600">High</th>
                            <th className="text-left font-normal text-slate-600">Low</th>
                            <th className="text-right font-normal text-slate-600">Volume</th>
                            <th className="text-right font-normal text-slate-600">Change</th>
                            <th className="text-right px-1 pr-3 font-normal text-slate-600">%Change</th>
                        </tr>
                    </thead>
                    <tbody className="overflow-y-scroll h-350">
                        {commodityPrices ? commodityPrices.map((commodity, index) => (
                        <tr key={index} className="border">
                            <td className="py-2 px-2 text-slate-700">{ (new Date(commodity.date_created)).toLocaleDateString() }</td>
                            <td className="font-medium pr-5">{ (Number(commodity.price).toFixed(2)) }</td>
                            <td className="text-slate-500 pr-3">{ (Number(commodity.high).toFixed(2) )}</td>
                            <td className="text-slate-500">{ (Number(commodity.low).toFixed(2) )}</td>
                            <td className="text-right text-slate-500">{ kFormatter(commodity.volume) }</td>
                            <td className="text-right px-1">
                                { (Number(commodity.change) ) < 0 ?
                                    <span className="text-red-500">{ (Number(commodity.change).toFixed(2)) }</span>
                                    :
                                    <span className="text-green-500">{ (Number(commodity.change).toFixed(2)) }</span>
                                }
                            </td>
                            <td className="text-right px-1 pr-3 font-medium">
                                {/* if is minus */}
                                { (Number(commodity.change_percentage) ) < 0 ?
                                    <span className="text-red-500">{ commodity.change_percentage }% ▼ </span>
                                    :
                                    <span className="text-green-500">{ commodity.change_percentage }% ▲</span>
                                }
                            </td>
                        </tr>
                        )) : <p>Loading...</p>}
                    </tbody>
                </table>
            </div>

        </main>
    )
}


export default CommodityHistoricalData;

