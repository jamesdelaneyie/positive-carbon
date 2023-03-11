import { NavLink } from 'react-router-dom';
import { getPastelColor } from './getPastelColor.js';

const SlimSingleCommodity = ({ commodity }) => {


    const generatedColor = getPastelColor(commodity.name);


    return (
        <div className="p-4 bg-white border border-stone-200 rounded mb-2">
            <div className="flex">
                <div>
                    <span style={{color: generatedColor.text, backgroundColor: generatedColor.color, borderColor: generatedColor.borderColor }} className="bg-slate-100 border rounded-full w-10 h-10 inline-block relative top-1">
                        <span className="text-sm text-opacity-70 font-bold transform-center">{commodity.name.substring(0, 2)}</span>
                    </span>
                </div>
                <div className="w-1/2 ml-4">
                    <NavLink className="hover:underline" to={`/commodities/${commodity.symbol}/`}>
                        <span className="font-bold">{commodity.name}</span>
                    </NavLink><br/>
                    ({commodity.symbol})
                </div>
                <div className="w-1/2 text-right tabular-nums">

                    <span className="font-bold">{commodity.price}</span> <br/>

                    {commodity.price_change === 'same' ? (
                        <span className='text-gray-400 align-text-bottom font-black text-xs mr-1'> &ndash; </span>
                    ) : (
                        <span className={commodity.price_change === 'up' ? 'text-green-500 align-text-bottom mr-1 text-xs' : 'text-red-500 align-text-bottom mr-1 text-xs'}>
                            {commodity.price_change === 'up' ? ' ▲' : ' ▼'}
                        </span>
                    )} 

                    {commodity.price_change === 'same' ? (
                        <span className='text-gray-400 align-text-bottom text-sm'>(0%)</span>
                    ) : (
                        <span className={commodity.price_change === 'up' ? 'text-green-500 align-text-bottom text-xs' : 'text-red-500 align-text-bottom text-xs'}>
                            ({commodity.price_change_percentage}%)
                        </span>
                    )}



                </div>
            </div>
        </div>
    );
};

export default SlimSingleCommodity;