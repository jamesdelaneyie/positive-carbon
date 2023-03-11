import React, { useState, useEffect } from 'react';
//import { NavLink } from 'react-router-dom';
import MiniCommodityTable from './MiniCommodityTable';

const Dashboard = () => {

    const [commodities, setCommodities] = useState(0);

    useEffect(() => {
        fetch('/index').then(res => res.json()).then(data => {
            setCommodities(data);
        });
    }, []);


    return (
        <article className="p-4 w-2/6  mb-auto">

                <h1 className="text-2xl font-bold mb-4 block">Latest Prices</h1>

                <div className="grid grid-cols-2 gap-4">
                    {commodities ? commodities.map((commodity, index) => (
                        <MiniCommodityTable key={index} commodity={commodity} />
                    )) : <li>Loading...</li>}
                </div>

                {/* <NavLink to={`/commodities/`} className="inline-block text-sm mb-2 text-blue-500 hover:underline">View Commodities &rarr;</NavLink> */}
        </article>

    );
}

export default Dashboard;
