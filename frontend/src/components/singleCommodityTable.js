import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const SingleCommodityTable = () => {

    // use getParams to get the symbol from the URL
    const { symbol } = useParams();

    const [commodityPrices, setCommodityPrices] = useState(0);

    // get the commodity name from the first element in the array
    const commodityName = useRef(0);
    const latestCommodityPrice = useRef(0);
    const latestCommodityDateTime = useRef({date: 0, time: 0});

    useEffect(() => {
        fetch('/commodities/' + symbol + '').then(res => res.json()).then(data => {
            setCommodityPrices(data);
            commodityName.current = data[0].commodity_name;
            latestCommodityPrice.current = data[0].price;
            let datetime = data[0].date_created;
            latestCommodityDateTime.current.date = datetime.slice(0, 16);
            latestCommodityDateTime.current.time = datetime.slice(16, datetime.length);
        });
    }, [symbol]);

      return (
        <article className="p-4 w-2/6">
            <NavLink className="inline-block text-sm mb-2 text-blue-500 hover:underline" to={`/commodities/`}>
               &larr; Return to all commodities
            </NavLink>
            <header className="p-4 border border-stone-200 rounded">
                <p className="text-stone-500 text-sm">{latestCommodityDateTime.current.date}</p>
                <p className="font-bold">{commodityName.current} <span className="font-light">({symbol})</span></p>
                <h2 className="text-4xl font-bold">{latestCommodityPrice.current}</h2>
                <p className="text-stone-500 text-sm">{latestCommodityDateTime.current.time}</p>
            </header>
            
            <ul>
                {commodityPrices ? commodityPrices.map((commodity, index) => (
                <li key={index}>
                    {commodity.currency}: {commodity.price} <br/>
                </li>
                )) : <p>Loading...</p>}
            </ul>
        </article>
    );
}

export default SingleCommodityTable;
