import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import SlimSingleCommodity from './SlimSingleCommodity';

const CommoditiesTable = () => {

    const [commodities, setCommodities] = useState(0);
    const [pageTitle, setPageTitle] = useState('Commodities');
    const [loadingEmptyMessage, setLoadingEmptyMessage] = useState('Loading...');

    const { user_id } = useParams();

    useEffect(() => {
        if(user_id) {
            fetch('/user/' + user_id + '').then(res => res.json()).then(data => {
                //console.log(data)
                setCommodities(data['watchlist']);
                setPageTitle('My Watchlist');
                setLoadingEmptyMessage('Your watchlist is empty');
            });
        } else {
            fetch('/index').then(res => res.json()).then(data => {
                setCommodities(data);
            });
        }
    }, [user_id]);

      return (
        <article className="p-4 w-2/6 mb-auto">
            <NavLink to={`/`} className="inline-block text-sm mb-2 text-blue-500 hover:underline">
                &larr; Return to Home
            </NavLink>
            <h2 className="text-2xl mb-2">{pageTitle}</h2>
            <ul>
                {/* output a list of commodities after checking if the data is loaded */}
                {commodities ? commodities.map((commodity, index) => (
                    <SlimSingleCommodity key={index} commodity={commodity} />
                )) : <li>{loadingEmptyMessage}</li>}
            </ul>
        </article>
    );
}

export default CommoditiesTable;
