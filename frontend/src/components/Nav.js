import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import Logout from './Logout';


const Nav = (props) => {

    const [menuOpen, setMenuOpen] = React.useState(false);
    const userWatchlistURL = `/user/${props.user_id}/`;

    return (
        <nav className="flex items-center justify-center flex-wrap bg-blue-500 p-4 z-50 relative">
            <div className="flex sm:w-full md:w-3/6 lg:w-2/6 p-2 nav-bar">
                <div className="text-white md:mr-2 lg:mr-10">
                    <NavLink to={`/`} className="hover:underline underline-offset-4 decoration-2">
                        <span className="font-bold italic text-2xl tracking-tight">
                        <svg style={{top: "-3px"}} className="relative inline w-7 h-7 fill-white mr-2" viewBox="0 0 184.6 184.9"><path d="M92.2 184.9C40.1 183.6-.2 143.7 0 92.1.2 39.8 41.1-.1 92.2 0c52.5.1 92.7 41.1 92.5 92.8-.3 51.7-40.8 91-92.5 92.1zm-70.9-82.3c1.7 27.8 30.1 64.1 74.6 62 41.3-1.9 66.4-37.2 67.3-61.9h-28.1c-8.9 12.7-17.8 25.6-27.4 39.4C96.6 120.7 86 100.4 75 79.3c-5.3 8.2-10.2 15.6-15.2 23.3H21.3zM163.4 82c-1.9-27.8-29.7-62.9-72.6-62.1-41.6.9-67.8 35.5-69.5 62h28.1c8.8-13.7 17.8-27.5 27.2-42.2 1.5 2.6 2.4 4.2 3.3 5.9 9.4 18.1 18.8 36.2 28.2 54.2.5 1.1 1.3 2 2.2 3.3 5.1-7.3 9.8-14 14.8-21.1h38.3z"/></svg>
                            PricePulse
                        </span>
                    </NavLink>
                </div>
                <div className="text-sm lg:flex-grow">
                    <SearchBar/>
                </div>
                <div className='text-right relative'>
                    <button onClick={() => setMenuOpen(!menuOpen)} className="group rounded-full border-2 border-white h-9 w-9 text-center hover:bg-white">
                        <svg style={{top: "-2px"}} className="fill-white h-4 w-4 inline-block relative group-hover:fill-blue-500" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                    </button>
                    {menuOpen ? <div className="absolute right-0 top-0 mt-11 shadow-lg">
                        <ul className="list-reset overflow-hidden rounded bg-white">
                            <li><NavLink to={`/`} className="block text-blue-500 hover:bg-blue-500 hover:text-white no-underline px-4 py-2">Home</NavLink></li>
                            <li><NavLink to={`/about`} className="block text-blue-500 hover:bg-blue-500 hover:text-white no-underline px-4 py-2">About</NavLink></li>
                            {props.token ? <li><NavLink to={userWatchlistURL} className="block text-blue-500 hover:bg-blue-500 hover:text-white no-underline px-4 py-2">Watchlist</NavLink></li> : null}
                            {!props.token ? <li><NavLink to={`/login`} className="block text-blue-500 hover:bg-blue-500 hover:text-white no-underline px-4 py-2">Login</NavLink></li> : null}
                            {!props.token ? <li><NavLink to={`/register`} className="block text-blue-500 hover:bg-blue-500 hover:text-white no-underline px-4 py-2">Register</NavLink></li> : null}
                            {props.token ? <Logout token={props.removeToken}/> : null}
                        </ul>
                    </div> : null}
                    
                </div>
            </div>
        </nav>
    )

}

export default Nav;