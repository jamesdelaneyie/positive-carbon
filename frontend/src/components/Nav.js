import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import Logout from './Logout';


const Nav = (props) => {

    return (
        <nav className="flex items-center justify-center flex-wrap bg-blue-500 p-4">
            <div className="flex sm:w-full md:w-3/6 lg:w-2/6 p-2">
            <div className="text-white mr-10">
                <NavLink to={`/`} className="hover:underline">
                    <span className="font-regular text-2xl tracking-tight">Commodities App</span>
                </NavLink>
            </div>
            {/*<div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>*/}
            <div className="block">
                <div className="text-sm lg:flex-grow">
                    <SearchBar/>
                    {/* if token is present, show the header component */
                        props.token ? <Logout token={props.removeToken}/> : null
                    }
                </div>
                <div>
                    {/* if token is present show the watchlist button */}
                    {props.token ? <NavLink to={`/user/1`} className="text-white py-2 px-4 rounded mr-3 bg-blue-600 hover:bg-blue-700">Watchlist</NavLink> : null}

                    {/*<a href="/register" className="text-white py-2 px-4 rounded mr-3 bg-blue-600 hover:bg-blue-700">Register</a>*/}
                    
                    {/* if token is not present, show the login button */}
                    {!props.token ? <NavLink to={`/login`} className="text-white py-2 px-4 rounded mr-3 bg-blue-600 hover:bg-blue-700">Login</NavLink> : null}
                </div>
            </div>
            </div>
        </nav>
    )

}

export default Nav;