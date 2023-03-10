import React from 'react';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {

    return (
        <article className="p-4 w-2/6  mb-auto">

            <div className="flex">

                <h1 className="text-2xl block">Dashboard</h1>

                <NavLink to={`/commodities/`} className="inline-block text-sm mb-2 text-blue-500 hover:underline">View Commodities &rarr;</NavLink>

            </div>
        </article>

    );
}

export default Dashboard;
