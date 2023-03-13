
import React, { useState, useEffect } from 'react';

const WatchlistButton = (props) => {
    
    const [watchlistButton, setWatchlistButton] = useState(false);

    const symbol = props.symbol;
    const token = props.token;
    const user_id = props.user_id;

    //console.log(props)

    const addToWatchlist = (symbol) => {

        //if the user is not logged in then redirect to the login page
        if(!token) {
            window.location.href = "/login";
            return
        }
        
        fetch('/api/user/'+user_id+'/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                symbol: symbol
            })
        }).then(res => res.json()).then(data => {
            //if the message is "success" then set the watchlist button to true
            if(data['message'] === "success") {
                setWatchlistButton(true);
            } else {
                console.log("error");
            }

        });

    };

    const removefromWatchlist = (symbol) => {
        fetch('/api/user/'+user_id+'/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                symbol: symbol
            })
        }).then(res => res.json()).then(data => {
            //if the message is "success" then set the watchlist button to false
            if(data['message'] === "success") {
                setWatchlistButton(false);
            } else {
                console.log("error");
            }
        });
    };

    // get the users watchlist and check if the symbol is in it
    // then set the watchlist button to true
    useEffect(() => {
        fetch('/api/user/'+user_id+'').then(res => res.json()).then(data => {
            //console.log(data);
            if(data['commodities'].some(item => item.symbol === symbol)) {
                setWatchlistButton(true);
            }
        });
    }, [symbol, user_id]);

    return (
        <div>
            {watchlistButton ? 
                <div style={{ top: "10px" }} className="group absolute right-10">
                    <button onClick={() => { removefromWatchlist(symbol) }} className="text-green-500 font-bold hover:pointer-normal text-xs">
                        Watching
                        <svg style={{ top: "-1px"}} className="relative w-4 h-4 inline ml-2 fill-current" xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 488.85 488.85"><path d="M244.425 98.725c-93.4 0-178.1 51.1-240.6 134.1-5.1 6.8-5.1 16.3 0 23.1 62.5 83.1 147.2 134.2 240.6 134.2s178.1-51.1 240.6-134.1c5.1-6.8 5.1-16.3 0-23.1-62.5-83.1-147.2-134.2-240.6-134.2zm6.7 248.3c-62 3.9-113.2-47.2-109.3-109.3 3.2-51.2 44.7-92.7 95.9-95.9 62-3.9 113.2 47.2 109.3 109.3-3.3 51.1-44.8 92.6-95.9 95.9zm-3.1-47.4c-33.4 2.1-61-25.4-58.8-58.8 1.7-27.6 24.1-49.9 51.7-51.7 33.4-2.1 61 25.4 58.8 58.8-1.8 27.7-24.2 50-51.7 51.7z"/></svg>
                    </button>
                    <span style={{width: "150px"}} className="absolute top-8 -left-7 text-center scale-0 rounded bg-gray-600 p-2 text-xs text-white group-hover:scale-100">Remove from watchlist</span>
                </div>
             : <button onClick={() => { addToWatchlist(symbol) }} className="absolute top-4 right-10 text-blue-500 hover:underline text-xs">Add to watchlist +</button>}
        </div>
    );
};

export default WatchlistButton;