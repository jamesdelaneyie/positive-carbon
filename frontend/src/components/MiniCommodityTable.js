import React, { useState, useEffect } from 'react';
import MiniLineChart from './MiniLineChart';
import { NavLink } from 'react-router-dom';


const MiniCommodityTable = (props) => {

    const commodity = props.commodity;
    const symbol = commodity.symbol;

    const [commodityPrices, setCommodityPrices] = useState(0);

    useEffect(() => {
        fetch('/commodities/' + symbol + '').then(res => res.json()).then(data => {
            setCommodityPrices(data['prices']);
        });
    }, [symbol]);

    return (

            <NavLink to={`/commodities/${symbol}`} className="block">
                <article className="group relative border border-stone-200 rounded p-4">
                    <div className="relative flex justify-between">
                        <div className="mini-commodity-table-bg relative z-20 pr-15">
                            <p className="group-hover:underline font-medium whitespace-nowrap">{commodity.name} </p>
                            <h2 className="tabular-nums text-3xl font-bold inline mr-1">{commodity.price}</h2>
                            <span className="whitespace-nowrap">
                                {commodity.price_change === 'same' ? (
                                    <span className='text-gray-400 align-text-bottom font-black text-xxs mr-1'> &ndash; </span>
                                ) : (
                                    <span className={commodity.price_change === 'up' ? 'text-green-500 align-text-bottom mr-1 text-xxs' : 'text-red-500 align-text-bottom mr-1 text-xxs'}>
                                        {commodity.price_change === 'up' ? ' ▲' : ' ▼'}
                                    </span>
                                )} 
                                {commodity.price_change === 'same' ? (
                                    <span className='text-gray-400 align-text-bottom font-black text-xxs mr-1'></span>
                                ) : (
                                    <span className={commodity.price_change === 'up' ? 'inline text-green-500 bg-white align-text-bottom text-xs' : 'inline text-red-500 align-text-bottom text-xs'}>
                                        {commodity.price_change === 'up' ? '+' : '-'}{commodity.price_change_percentage}%
                                    </span>
                                )}
                            </span>
                            
                        </div>
                        <div className="z-10">
                            {commodityPrices && <MiniLineChart data={commodityPrices} />}
                        </div>
                                            
                    </div>
                </article>
            </NavLink>
            
    );
}

export default MiniCommodityTable;
