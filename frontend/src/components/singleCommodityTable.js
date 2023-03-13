import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


import LineChart from './LineChart';

import SingleCommodityInfo from './SingleCommodityInfo';

import CommodityHistoricalData from './CommodityHistoricalData';


const SingleCommodityTable = (props) => {

    // use getParams to get the symbol from the URL
    const { symbol } = useParams();

    //console.log(props)

    //const [commodity, setCommodity] = useState(0);
    const [commodityPrices, setCommodityPrices] = useState(0);
    const [commodityNews, setCommodityNews] = useState(0);
    

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

            fetch('https://newsapi.org/v2/everything?q='+ commodityName.current + '%20finance&apiKey=a11e9ab294f749fb8a54acff4c7bca64&pageSize=4').then(res => res.json()).then(data => {
                //console.log(data)
                setCommodityNews(data['articles']);
            });

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
        <article className="bg-white mb-auto p-4 sm:w-full md:w-3/6 lg:w-2/6">

            <NavLink className="inline-block text-sm mb-2 text-blue-500 hover:underline" to={`/commodities/`}>
               &larr; Return to all commodities
            </NavLink>

            {commodityPrices && commodityName.current && <SingleCommodityInfo token={props.token} user_id={props.user_id} symbol={symbol} commodityName={commodityName.current} commodityDescription={commodityDescription.current} latestCommodityPrice={latestCommodityPrice.current} latestCommodityDate={latestCommodityDate.current} latestCommodityTime={latestCommodityTime.current} priceChange={priceChange.current} priceChangePercentage={priceChangePercentage.current} />}
            
            {commodityPrices && <LineChart data={commodityPrices} />}
            
            {commodityPrices && commodityName.current && <CommodityHistoricalData commodityName={commodityName.current} commodityPrices={commodityPrices} />}

            {commodityNews && (
                <header className="relative border border-stone-200 rounded">
                    <div className="relative p-4">
                        <h2 className="font-bold mb-4">{commodityName.current} News</h2>
                        
                            {commodityNews.map((news, index) => (

                                index < 4 &&
                                <div className="news-item flex mb-6" key={index}>
                                    <div className="w-1/5">
                                        {news.urlToImage ? (
                                            <a href={news.url} target="_blank" rel="noreferrer">
                                                <img style={{width: "100px", height: "100px"}} alt={news.title} className="block border rounded object-cover" src={news.urlToImage} />
                                            </a>
                                        ) : (
                                            <div style={{width: "100px", height: "100px"}} className="block border bg-slate-300 rounded object-cover"></div>
                                        )}
                                    </div>
                                    <div className="w-4/5 pl-3 pr-7">
                                        <span style={{marginTop: "-1px"}} className="truncate block text-xs font-medium text-slate-500 mb-1">{news.author}: {news.source.name} - { (new Date(news.publishedAt)).toLocaleDateString() }</span>
                                        <h4 className="text-md font-bold mb-1 leading-tight	">
                                            <a href={news.url} target="_blank" rel="noreferrer" className="hover:underline">{news.title}</a>
                                        </h4>
                                        <p className="text-sm text-slate-500">{news.description}</p>
                                    </div>
                                    
                                    
                                </div>
                            ))}

                    </div>
                </header>
            )}

            
        </article>
    );
}

export default SingleCommodityTable;
