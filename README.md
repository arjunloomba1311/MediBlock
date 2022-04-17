# LA HACKS SUBMISSION

View Our Devpost Submission for LA hacks 2022 [here](https://devpost.com/submit-to/15271-la-hacks-2022/manage/submissions/322624-mediblock/project-overview)

## CONCEPT

It was unheard of for vaccines or any other medicines for that matter to go from a factory in one corner of the world to your local pharmacy in less than 2 years. But because of the covid pandemic over the past 36 months, this is exactly what occurred.

Unfortunately, the rush to deliver vaccines and medicines around the world has also created plentiful opportunities for counterfeit drug manufacturers to make a quick buck. 

On a broader scale, The World Health Organization estimates that up to 1% of medicines available in the developed world are likely to be counterfeit. 1% of the medicine market is a lot, and potentially affects hundreds of thousands of lives. In the developing world though, this number can go upto 50%! Imagine having to bet on your life-saving medicine to be authentic and not fake!

## FLOW OF OUR APPLICATION

Our landing Page 

<img width="1457" alt="Screen Shot 2022-04-17 at 7 45 25 AM" src="https://user-images.githubusercontent.com/34513460/163719638-1ec7c1a7-dd9f-433a-a38d-fc92ca257875.png">

User Dashboard to connect smart contract to Ethereum Blockchain

<img width="1432" alt="Screen Shot 2022-04-17 at 9 23 40 AM" src="https://user-images.githubusercontent.com/34513460/163723422-c2b75c44-b931-4c05-80c3-4bed8c520d4a.png">

Ledger Entries that make up the contents of blocks

<img width="1439" alt="Screen Shot 2022-04-17 at 9 24 26 AM" src="https://user-images.githubusercontent.com/34513460/163723453-24207d06-f9b2-4000-959a-33709db5b9e0.png">

Adding a new Ledger Entry

<img width="1440" alt="Screen Shot 2022-04-17 at 9 25 37 AM" src="https://user-images.githubusercontent.com/34513460/163723489-09e4eb27-c708-42fd-9681-b21045684692.png">

Login Page

<img width="1435" alt="Screen Shot 2022-04-17 at 9 27 01 AM" src="https://user-images.githubusercontent.com/34513460/163723541-14a6aedd-63aa-4e98-b9d0-f1f6e553ccd1.png">


## OUR API INTEGRATIONS

### Ankr API

We used the Ankr API to deploy our smart contracts onto a public Ethereum Blockchain network. Initially, we tested out our code with ganache, which is a test blockchain network, together with Truffle. However, Ankr helped us quickly migrate it to a public network. Below is a code snippet that helped us. 

### Google Maps API 

The google maps API is used as a visualization tool to understand the real time locations of where the counterfeit medicine shipment is positioned. We used a QR code scanner code that we built using flask. This hosted data to a server using EngineX and is then scraped using js and integrated with our main application. 

### OUR TECH STACK

Node/Express JS, MongoDB, Solidity, Truffle, Web3-JS, Nodemailer

### DEVELOPMENT PROCESS

We started with setting up a backend server using the node/express framework. This set up the bare bones for our backend. We then used MongoDB to store hashed user data with npm libraries like bcrypt JS. We then started working on creating smart contracts with solidity. We initially used a local network in the form of ganache and truffle, but soon migrated to a public and more robust network in Ankr. Our team simultaneously worked on the front end of the website where we used AdobeXD to create the designs and then write up the HTML/CSS to match those designs. We faced some challenges in properly integrating the front end and the backend, such as making sure that the date is parsed in properly from Node to the EJS files that we made, and functionality like looping within an HTML document worked well. We then came back to Node JS, and defining any routes we might have left as well as **connected our solidity smart contracts together for the checks for 'weight' and 'units'** which are core to our application. Next all 3 of us worked together to scrape real time data for the coordinates and then used the 'Request' library in JS to pass the coordinates through to our Maps API.

## WHAT'S NEXT 

## APPENDIX
