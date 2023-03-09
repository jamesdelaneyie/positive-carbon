import { NavLink } from 'react-router-dom';

const SlimSingleCommodity = ({ commodity }) => {
    return (
        <div className="p-4 bg-white border border-stone-200 rounded mb-2">
            <div className="flex">
                <div className="w-1/2">
                    <NavLink className="hover:underline" to={`/commodities/${commodity.symbol}/`}>
                        <span className="font-bold">{commodity.name}</span> ({commodity.symbol})
                    </NavLink>
                </div>
                <div className="w-1/2 text-right tabular-nums">
                    {commodity.price}

                    {commodity.price_change === 'same' ? (
                        <span className='text-gray-400 font-black'> &ndash; </span>
                    ) : (
                        <span className={commodity.price_change === 'up' ? 'text-green-500' : 'text-red-500'}>
                            {commodity.price_change === 'up' ? ' ▲' : ' ▼'}
                        </span>
                    )}


                </div>
            </div>
        </div>
    );
};

export default SlimSingleCommodity;