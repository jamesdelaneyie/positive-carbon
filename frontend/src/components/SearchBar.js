import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const handleChange = event => {
        setSearchTerm(event.target.value);
        if(event.target.value.length > 2) {
            searchForCommodity(event.target.value);
        } else {
            setSearchResults([]);
        }
    };

    const searchForCommodity = (searchTerm) => {
        fetch(`/commodities/search/${searchTerm}`).then(res => res.json()).then(data => {
            setSearchResults(data);
            if(data.length === 0) {
                setSearchResults(null);
            }
        });
    }

    return (
      <div className="w-80 relative z-10">
        <input
            className="w-full border border-stone-200 rounded p-2"
            type="text"
            placeholder="Search Commodities"
            value={searchTerm}
            onChange={handleChange}
            onBlur={() => {
              setTimeout(() => {
                setSearchResults([]);
                setSearchTerm("");
              }, 100);
            }}
            onFocus={() => {
                if(searchTerm.length > 2) {
                    searchForCommodity(searchTerm);
                }
            }}
        />
          <svg
            className="text-gray-300 h-4 w-4 fill-current absolute right-4 top-3"
            style={{top: '11px', enableBackground: 'new 0 0 56.966 56.966'}}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            xmlSpace="preserve"
            width="512px"
            height="512px"
          >
            <path
              d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
            />
          </svg>
        <ul className="absolute w-full top-11">
          {searchResults ? searchResults.map((commodity, index) => (
            <NavLink key={index} className="block p-2 border border-stone-200 rounded mb-2 bg-white hover:underline" to={`/commodities/${commodity.symbol}/`}>
                {commodity.name} ({commodity.symbol})
            </NavLink>
          )) : <li>No results found</li>}
        </ul>
      </div>


      
    );
}

export default SearchBar;