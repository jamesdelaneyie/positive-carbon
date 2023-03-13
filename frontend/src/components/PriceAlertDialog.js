import { useEffect, useState } from 'react';

const PriceAlertDialog = (props) => {

    const [open, setOpen] = useState(false);
    const [price, setPrice] = useState(0);

    const token = props.token;
    const user_id = props.user_id;

    const openModal = () => {
        
        if (!token) {
            window.location.href = "/login";
            return
        }

        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('/api/set-price-alert/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': props.csrfToken,
            },
            body: JSON.stringify({
                symbol: props.symbol,
                user: user_id,
                price: price,
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });

        closeModal();
    };

    const handleChange = (e) => {
        setPrice(e.target.value.toLocaleString());
    };

    useEffect(() => {
        setPrice(parseFloat(props.price.replace(/,/g, '')));
    }, [props.price]);

    return (
        <div>
            <button onClick={openModal} className="group absolute top-4 right-4">
                <svg className="w-4 h-4 text-blue-500 fill-current cursor-pointer" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10,21h4a2,2,0,0,1-4,0ZM3.076,18.383a1,1,0,0,1,.217-1.09L5,15.586V10a7.006,7.006,0,0,1,6-6.92V2a1,1,0,0,1,2,0V3.08A7.006,7.006,0,0,1,19,10v5.586l1.707,1.707A1,1,0,0,1,20,19H4A1,1,0,0,1,3.076,18.383ZM6.414,17H17.586l-.293-.293A1,1,0,0,1,17,16V10A5,5,0,0,0,7,10v6a1,1,0,0,1-.293.707Z"/></svg>
                <span style={{width: "100px"}} className="absolute top-8 -left-9 text-center scale-0 rounded bg-gray-600 p-2 text-xs text-white group-hover:scale-100">Set Price Alert</span>
            </button>
            <div className={`${open ? 'block' : 'hidden'} fixed z-10 inset-0 overflow-y-auto`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-xl leading-6 font-bold mt-3 text-gray-900" id="modal-title">
                                        Price Alert
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-gray-500">
                                            Set a price alert for <span className="font-bold">{props.name}</span> ({props.symbol}) at <input type="number" min="0" step="0.01" defaultValue={price} onChange={(e) => { handleChange(e) }} className="ml-2 w-40 border p-1 text-right border-gray-300 rounded-md price-alert-number-input" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="button" onClick={(e) => { handleSubmit(e) }} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                                Set Alert
                            </button>
                            <button type="button" onClick={() => { closeModal() }} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default PriceAlertDialog