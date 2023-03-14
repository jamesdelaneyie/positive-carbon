# Commodity Prices App
Positive Carbon Take Home Test

This is a simple app that displays the price of commodities over time.

- Backend API: Flask
- Frontend Client: React.js
- Styles: Tailwind
- Database: SQLite
- Deployment: Docker on Azure

View at: http://967f8d1c01b8.ngrok.app

Sample backend API view on Azure: https://pricepulseapi.azurewebsites.net/api/index

# Deployment setup
- NGINX on React frontend
- Gunicorn on Flask backend

# Notes / Issues / Future To Do
- Likely an API key in this somewhere, didn't .env everything when I should have
- First time using Flask to such a degree, would be more familiar with Django for such a setup but wanted to try it out
- First time using Tailwind for styles, responsive elements tripped me up somewhat
- Tried to get it on Azure with Docker Compose, had to switch to just single docker containers and didn't get frontend up
- Didn't get to finish filtering the chart view on 1D, 1M, etc
- All historial prices are faked, no free API to get 40+ commodities going back a year
- Was planning to setup event scheduler to run on add_latest_commodity_prices.py, hit API limit x2
- Was planning websockets to update prices on site in realtime
- Was planning to add better UI / Logic for price alerts, i.e. up/down on the figure
- Was planning to lock up the API, i.e. only allow requests from the frontend, only users get full data, etc
- Add UI for price alerts in frontend
- Didn't complete a visual for the DB Schema







