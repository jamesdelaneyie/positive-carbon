import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import WatchlistButton from './WatchlistButton';
import LineChart from './LineChart';


const SingleCommodityTable = () => {

    // use getParams to get the symbol from the URL
    const { symbol } = useParams();

    const [commodityPrices, setCommodityPrices] = useState(0);

    // get the commodity name from the first element in the array
    const commodityName = useRef();
    const commodityDescription = useRef();
    const latestCommodityPrice = useRef(0);
    const latestCommodityDateTime = useRef({date: "", time: ""});

    //calculate if the price has gone up or down
    const priceChange = useRef(0);
    const priceChangePercentage = useRef(0);

    const calculatePriceChange = (latestPrice, previousPrice) => {
        const diff = latestPrice - previousPrice;
        priceChange.current = Math.round(diff * 100) / 100;
        priceChangePercentage.current = Math.round((diff / previousPrice) * 10000) / 100;
    };



    useEffect(() => {
        fetch('/commodities/' + symbol + '').then(res => res.json()).then(data => {
            setCommodityPrices(data['prices']);

            commodityName.current = data['info'].name;
            commodityDescription.current = data['info'].description;

            latestCommodityPrice.current = Math.round(data['prices'][0].price * 100) / 100;
            latestCommodityPrice.current = latestCommodityPrice.current.toFixed(2);

            let datetime = data['prices'][0].date_created;
            latestCommodityDateTime.current.date = datetime.slice(0, 16);
            latestCommodityDateTime.current.time = datetime.slice(16, datetime.length);

            if (data['prices'].length > 1) {
                calculatePriceChange(data['prices'][0].price, data['prices'][1].price);
            }

        });
    }, [symbol]);

      return (
        <article className="mb-auto p-4 sm:w-full md:w-3/6 lg:w-2/6">
            <NavLink className="inline-block text-sm mb-2 text-blue-500 hover:underline" to={`/commodities/`}>
               &larr; Return to all commodities
            </NavLink>
            <header className="relative border border-stone-200 rounded mb-4">
                <div className="relative p-4">
                    <p className="text-stone-500 text-sm">{latestCommodityDateTime.current.date}</p>
                    <p className="font-bold">{commodityName.current} <span className="font-normal">({symbol})</span></p>
                    <h2 className="tabular-nums text-4xl font-bold inline mr-3">{latestCommodityPrice.current}</h2>
                    {priceChange.current !== 0 ? (
                        <p className={priceChange.current > 0 ? "inline text-green-500" : "inline text-red-500"}>
                            <span className="text-xs relative" style={{top: "-1px"}}>{priceChange.current > 0 ? "▲" : "▼"}</span> {priceChange.current} ({priceChangePercentage.current}%)
                        </p>
                    ) : (
                        <p className="inline text-stone-500 text-xs">No Change</p>
                    )}
                    <p className="text-stone-500 text-sm">
                        <svg style={{width:"16px", height:"16px", top: "-1px"}} className="inline relative fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c115 0 208.2-93.2 208.2-208S370.8 48 255.8 48zm.2 374.4c-91.9 0-166.4-74.5-166.4-166.4S164.1 89.6 256 89.6 422.4 164.1 422.4 256 347.9 422.4 256 422.4z"/><path d="M266.4 152h-31.2v124.8l109.2 65.5 15.6-25.6-93.6-55.5V152z"/></g></svg>
                        {latestCommodityDateTime.current.time}
                    </p>
                    <span className="absolute bottom-4 right-4 text-stone-400 text-xs">Currency in <span className="font-bold">EUR</span></span>
                    
                    <WatchlistButton symbol={symbol} name={commodityName.current} price={latestCommodityPrice.current} />
                    
                
                </div>
                <hr className="ml-4 mr-4"/>
                <div className="relative p-4">
                    <p className="text-xs text-stone-700 mb-2">{commodityDescription.current}</p>
                    
                    <p className="text-xs text-stone-700">Source: <a href="https://commodities-api.com/" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">Commodities-API</a></p>
                </div>
                
                
                
            </header>
            

            {commodityPrices && <LineChart data={commodityPrices} />}
            
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
        </article>
    );
}

export default SingleCommodityTable;
