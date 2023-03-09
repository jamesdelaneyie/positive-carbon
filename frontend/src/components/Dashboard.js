import React from 'react';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {

    return (
        <article className="p-4 w-2/6  mb-auto h-10">

            <h1 className="text-2xl">Dashboard</h1>

            <NavLink to={`/commodities/`} className="inline-block text-sm mb-2 text-blue-500 hover:underline">View Commodities &rarr;</NavLink>
        </article>

    );
}

export default Dashboard;
