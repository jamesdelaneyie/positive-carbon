import WatchlistButton from './WatchlistButton';
import PriceAlertDialog from './PriceAlertDialog';
import { getPastelColor } from './getPastelColor.js';

const singleCommodityInfo = (props) => {

    //console.log(props)

    const generatedColor = getPastelColor(props.commodityName);

    return (
        <header className="relative border border-slate-200 rounded mb-4">
            <div className="relative flex p-4">
                <div className="mr-5 flex flex-col justify-center">
                    <span style={{color: generatedColor.text, backgroundColor: generatedColor.color, borderColor: generatedColor.borderColor }} className="bg-slate-100 border left-1 rounded-full w-20 h-20 inline-block relative top-1">
                        <span className="text-3xl text-opacity-70 font-medium transform-center">{props.commodityName.substring(0, 2)}</span>
                    </span>
                </div>
                <div>
                    <p className="text-slate-400 text-sm">{props.latestCommodityDate}</p>
                    <p className="font-bold">{props.commodityName} <span className="font-normal">({props.symbol})</span></p>
                    <h2 className="tabular-nums text-4xl font-bold inline mr-3">{props.latestCommodityPrice}</h2>
                    {props.priceChange !== 0 ? (
                        <p className={props.priceChange > 0 ? "inline text-green-500" : "inline text-red-500"}>
                            <span className="text-xs relative" style={{top: "-1px"}}>{props.priceChange > 0 ? "▲" : "▼"}</span> {props.priceChange} ({props.priceChangePercentage}%)
                        </p>
                    ) : (
                        <p className="inline text-slate-500 text-xs">No Change</p>
                    )}
                    <p className="text-slate-400 text-sm">
                        <svg style={{width:"16px", height:"16px", top: "-1px"}} className="inline relative fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c115 0 208.2-93.2 208.2-208S370.8 48 255.8 48zm.2 374.4c-91.9 0-166.4-74.5-166.4-166.4S164.1 89.6 256 89.6 422.4 164.1 422.4 256 347.9 422.4 256 422.4z"/><path d="M266.4 152h-31.2v124.8l109.2 65.5 15.6-25.6-93.6-55.5V152z"/></g></svg>
                        {props.latestCommodityTime}
                    </p>
                    <span className="absolute bottom-5 right-4 text-slate-400 text-xs">Currency in <span className="font-bold">EUR</span></span>
                </div>
                
                <WatchlistButton token={props.token} user_id={props.user_id} symbol={props.symbol} name={props.commodityName} price={props.latestCommodityPrice} />
                
                <PriceAlertDialog token={props.token} user_id={props.user_id} price={props.latestCommodityPrice} symbol={props.symbol} name={props.commodityName} />

            </div>
            <hr className="ml-4 mr-4"/>
            <div className="relative p-4">
                <p className="text-sm text-slate-700 mb-2">{props.commodityDescription}</p>
                
                <p className="text-xs text-slate-700">Source: <a href="https://commodities-api.com/" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">Commodities-API</a>.</p>
                <span className="absolute bottom-4 right-4 text-xxs text-slate-500 font-light">Historical data is fake.</span>
            </div>
            
        </header>
    )

}

export default singleCommodityInfo