import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


import LineChart from './LineChart';

import SingleCommodityInfo from './SingleCommodityInfo';

import CommodityHistoricalData from './CommodityHistoricalData';


const SingleCommodityTable = (props) => {

    // use getParams to get the symbol from the URL
    const { symbol } = useParams();

    const [commodityPrices, setCommodityPrices] = useState(0);

    // get the commodity name from the first element in the array
    const commodityName = useRef();
    const commodityDescription = useRef();
    const latestCommodityPrice = useRef(0);
    const latestCommodityDate = useRef("");
    const latestCommodityTime = useRef("");

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

            latestCommodityPrice.current = data['prices'][0].price.toLocaleString();

            let datetime = data['prices'][0].date_created;
            latestCommodityDate.current = datetime.slice(0, 16);
            latestCommodityTime.current = datetime.slice(16, datetime.length);

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

            {commodityPrices && commodityName.current && <SingleCommodityInfo symbol={symbol} commodityName={commodityName.current} commodityDescription={commodityDescription.current} latestCommodityPrice={latestCommodityPrice.current} latestCommodityDate={latestCommodityDate.current} latestCommodityTime={latestCommodityTime.current} priceChange={priceChange.current} priceChangePercentage={priceChangePercentage.current} />}
            
            {commodityPrices && <LineChart data={commodityPrices} />}
            
            {commodityPrices && commodityName.current && <CommodityHistoricalData commodityName={commodityName.current} commodityPrices={commodityPrices} />}

            
        </article>
    );
}

export default SingleCommodityTable;
