import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';


const Nav = () => {

    return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-20">
            <NavLink to={`/`} className="hover:underline">
                <span className="font-regular text-xl tracking-tight">Commodities App</span>
            </NavLink>
        </div>
        <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
                <SearchBar/>
            </div>
            <div>
                <NavLink to={`/user/1`} className="text-white py-2 px-4 rounded mr-3 bg-blue-600 hover:bg-blue-700">
                    My Watchlist
                </NavLink>
                <a href="/register" className="text-white py-2 px-4 rounded mr-3 bg-blue-600 hover:bg-blue-700">Register</a>
                <a href="/login" className="bg-white bg-white hover:bg-white text-black font-bold py-2 px-4 rounded">Login</a>
            </div>
        </div>
        </nav>
    )

}

export default Nav;