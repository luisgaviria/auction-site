Auctomatic is designed to save the real estate inverstor lots of time. Currently a real estate investor in the MA area needs to check between 15-20 auctioneer websites to choose the Auctions they will like to attend on a given day, now you can simply visit Auctomatic and see all the Auctions in one place.

Auctomatic collects data from multiple different real estate auction sites and displays it all in one place sorted by the earliest auction happening at the time one visits the site.

The app is built with Node.js, node-fetch, Cheerio.js, Puppeteer and React. It utilizes google maps api to display the auctions as markers on the map.

To run the app you can use the command yarn dev and visit http://localhost:3000/

You can also visit the site at https://auction-site-ma.herokuapp.com/

You can find the functions that collect data on the controllers folder on the auctionControl file.

This project utilizes jest testing to ensure that each function collects the appropiate data and to make sure that the dates which are rendered are all sorted in ascending order. 

To run async jest tests you will need to comment out all the code on the files located in the server/sr/boot/environments folder and add import “generator-runtime/runtime" to the development.js file. After this you can enter the command yarn test from the server directory to run tests.




