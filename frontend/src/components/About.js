function About() {

    return (
      <article className="bg-white mb-auto p-6 w-2/6 border rounded-md">
        <div>
          <h1 className='text-2xl font-bold mb-4'>About</h1>
          <p className="text-slate-500 mb-3">PricePulse is a web application that provides users with a comprehensive platform to track commodity prices in real-time. It allows users to create an account, view commodity prices, search for commodities, add commodities to a watchlist, and receive notifications when the price of a commodity reaches a certain threshold.</p>

          <p className="text-slate-500 mb-3">The frontend and backend components of the application have been designed with cutting-edge technologies to ensure that it can handle high traffic volumes. Users can easily search for specific commodities by name and add them to their watchlist. The watchlist feature sends notifications when a commodity price reaches a certain threshold, ensuring that users never miss out on price changes that could affect their business or investments.</p>

          <p className="text-slate-500 mb-3">PricePulse is a project by <a href="https://jamesdelaney.ie">James Delaney</a> and is MIT open source licensed.</p>

          <a href="https://github.com" className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">View on Github</a>
        </div>
      </article>
    );
}

export default About;
