import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';


const Ticker = () => {

    const [commodities, setCommodities] = useState([]);

    useEffect(() => {
        fetch('/api/index').then(res => res.json()).then(data => {
            setCommodities(data);
        });
    }, []);

    return (
        <div className="bg-white ticker-marquee border-b-1">
            <ul className="ticker-marquee__content relative">
                <li className="absolute text-xs bg-slate-100 text-slate-500 font-medium p-1 pt-2 hidden">Latest Update: Today</li>
                {commodities.map((commodity, index) =>
                commodity.price_change === "same" ? null : (
                    <li key={index} className="inline mr-4">
                        <NavLink to={`/commodities/${commodity.symbol}`}>
                            <span className="font-bold text-xs inline align-text-bottom mr-1 hover:underline">{commodity.symbol}</span>
                            <span className={commodity.price_change === 'up' ? 'inline text-green-500 align-text-bottom mr-1 text-xxs' : 'inline text-red-500 align-text-bottom mr-1 text-xxs'}>
                                {commodity.price_change === 'up' ? ' ▲' : ' ▼'}
                            </span>
                            <span className={commodity.price_change === 'up' ? 'inline text-green-500 align-text-bottom text-xs' : 'inline text-red-500 align-text-bottom text-xs'}>
                                {commodity.price_change === 'up' ? '+' : '-'}{commodity.price_change_percentage}%
                            </span>
                        </NavLink>
                    </li>
                )
            )}
            </ul>
            <ul className="ticker-marquee__content relative" aria-hidden="true">
                <li className="absolute text-xs bg-slate-100 text-slate-500 font-medium p-1 pt-2 hidden">Latest Update: Today</li>
                {commodities.map((commodity, index) =>
                commodity.price_change === "same" ? null : (
                    <li key={index} className="inline mr-4">
                        <NavLink to={`/commodities/${commodity.symbol}`}>
                            <span className="font-bold text-xs inline align-text-bottom mr-1 hover:underline">{commodity.symbol}</span>
                            <span className={commodity.price_change === 'up' ? 'inline text-green-500 align-text-bottom mr-1 text-xxs' : 'inline text-red-500 align-text-bottom mr-1 text-xxs'}>
                                {commodity.price_change === 'up' ? ' ▲' : ' ▼'}
                            </span>
                            <span className={commodity.price_change === 'up' ? 'inline text-green-500 align-text-bottom text-xs' : 'inline text-red-500 align-text-bottom text-xs'}>
                                {commodity.price_change === 'up' ? '+' : '-'}{commodity.price_change_percentage}%
                            </span>
                        </NavLink>
                    </li>
                )
            )}
            </ul>
        </div>
    );
}

export default Ticker;