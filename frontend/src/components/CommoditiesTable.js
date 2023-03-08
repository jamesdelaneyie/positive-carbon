import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const CommoditiesTable = () => {

    const [commodities, setCommodities] = useState(0);

    useEffect(() => {
        fetch('/index').then(res => res.json()).then(data => {
            console.log(data)
            setCommodities(data);
        });
    }, []);

      return (
        <article className="p-4 w-2/6">
            <NavLink to={`/`} className="inline-block text-sm mb-2 text-blue-500 hover:underline">
                &larr; Return to Home
            </NavLink>
            <h2 className="text-2xl mb-2">Commodities</h2>
            <ul>
                {/* output a list of commodities after checking if the data is loaded */}
                {commodities ? commodities.map((commodity, index) => (
                <li className="p-4 border border-stone-200 rounded mb-2" key={index}>

                    <NavLink className="hover:underline" to={`/prices/${commodity.symbol}/`}>
                        {commodity.name} ({commodity.symbol})
                    </NavLink> <br/>

                    {/*{commodity.description} <br/>
                    {commodity.currency}: {commodity.price} <br/><br/>*/}
                </li>
                )) : <p>Loading...</p>}
            </ul>
        </article>
    );
}

export default CommoditiesTable;
