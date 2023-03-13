import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import MiniCommodityTable from './MiniCommodityTable';

const Dashboard = (props) => {

    const [commodities, setCommodities] = useState(0);

    useEffect(() => {
        fetch('/index').then(res => res.json()).then(data => {
            setCommodities(data);
        });
    }, []);


    return (
        <article className="bg-white p-4 w-2/6  mb-auto">

                {/* Banner with welcome message */}
                <div className="bg-white border-2 border-blue-300 rounded-md p-6 mb-4">
                    <h2 className="text-2xl font-bold mb-2">Welcome to PricePulse</h2>
                    <p className="text-sm text-slate-500">This is a simple dashboard that displays the latest prices for a selection of commodities. <a href="/register" className="underline">Register</a> to start your watchlist and set price alerts.</p>
                </div>

                <h1 className="text-xl font-bold mb-4 block">Latest Prices</h1>

                <div className="grid grid-cols-2 gap-4">
                    {commodities ? commodities.map((commodity, index) => (
                        index < 12 &&
                        <MiniCommodityTable key={index} commodity={commodity} />
                    )) : <li>Loading...</li>}
                </div>

                <NavLink to={`/commodities/`} className="inline-block bg-blue-500 w-full rounded-full text-white p-3 mt-4 text-center text-sm mb-2 text-blue-500 hover:underline">View All Commodities &rarr;</NavLink>
        </article>

    );
}

export default Dashboard;
