const Footer = () => {
    return (
        <footer className="flex justify-center h-15 bg-blue-500 p-4 pl-4 text-white text-xs">
            <div className="sm:w-full md:w-3/6 lg:w-2/6 pl-2">
                <ul className="footer-ul inline">
                    <li className="inline">
                        &copy; 2023 James Delaney
                    </li>
                    <li className="inline">
                        <a href="/about" className="hover:underline">About</a>
                    </li>
                    <li className="inline">
                        Live Data Source: <a href="https://commodities-api.com/" className="hover:underline">Commodities-API</a>.
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer