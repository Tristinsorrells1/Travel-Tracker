# Travel Tracker
## Overview of Project 
### Description
I was given one week to create an application that manages and tracks different trips for users and a travel agency as part of my coursework in Mod 2 of the Turing School of Software & Design's Front-End Engineering bootcamp. I employed a range of programming techniques, including the use of OOP and TDD, to drive the design of the application and the code. I also utilized the fetch API to retrieve, modify, and add data, as well as Mocha and Chai for testing.

When users log in with a valid username and password, they are taken to a dashboard that displays all of their past trips, upcoming trips, and pending trip requests. They are also able to make a new trip request and receive an estimated price for that trip. When a user makes a new trip request, it is sent to the API with a pending trip status, waiting for a travel agent to approve or deny it. Additionally, users can see the cost and details of each trip, including their pending trips, in their expenses section.

When a travel agents logs in with a valid username and password, they have access to different features, such as the ability to see how many users are currently on a trip, their commission, and a table showing trips for all users. They can also filter the table for a specific user's trips by searching that user's first and last name. Furthermore, agents have the ability to approve or deny user's trip requests and cancel approved trips. When this happens, the trip data in the API is persisted with the updated information.

Overall, the application was designed to provide a seamless and efficient experience for both users and travel agents. The details of this project are outlined in [this project spec](https://frontend.turing.edu/projects/travel-tracker.html). 

### Goals
- Implement ES6 classes that communicate to each other as needed.
- Use object and array prototype methods to perform data manipulation.
- Create a dashboard that is easy to use and displays information in a clear way.
- Write modular, reusable code that follows SRP (Single Responsibility Principle).
- Work with a local server and make network requests to API endpoints to retrieve and manipulate data.
- Implement best practices for accessibility
- Use OOP to drive the design of the application and the code
- Create a robust test suite that thoroughly tests all functionality of a client-side application

## Technologies Used:
- HTML, CSS, and Javascript 
- Test Driven Development (TDD)
- Fetch API
- Webpack
- Mocha/Chai
- WAVE Evaluation Tool
- Lighthouse

## Installation Instructions:
### Run the local server
- In your terminal, clone 'git@github.com:turingschool-examples/fitlit-api.git' and CD into the directory.
- Run `npm install` to install project dependencies.
- Run `npm start` in to start the local server.
- To stop the local server from running in your terminal use `command + c`.

### Run the application locally using Webapck
- In a second terminal, clone this repository to your local machine and CD into the directory. 
- Run `npm install` to install project dependencies.
- Run `npm start` to get a local host URL. 
- Copy the local host URL given and paste it in your browswer to view the website.
- To stop the local server from running in your terminal use `command + c`.

### Login As User
- Username: travelers<number> (number refers to the traveler's id and can be any number between 1-50. Ex: traveler5).
- Password: travel
  
### Login As Agent
- Username: agent
- Password: travel

## App Preview
#### Demos

#### Login Demo
![Webpack_Starter_Kit_-_17_January_2023__6__AdobeExpress](https://user-images.githubusercontent.com/109977562/212988889-a322312d-7205-4575-afb8-f2469df14491.gif)

##### Search for User Demo
![Webpack_Starter_Kit_-_17_January_2023__3__AdobeExpress](https://user-images.githubusercontent.com/109977562/212986642-5a418f77-3250-46e2-b1a3-ba5a0e33d2d4.gif)
  
#### Agent Homepage Demo
![Webpack_Starter_Kit_-_17_January_2023__4__AdobeExpress (1)](https://user-images.githubusercontent.com/109977562/212987757-09fcc001-17a1-4762-8969-5e9d472b16fd.gif)

##### Book a Trip Demo
![Webpack_Starter_Kit_-_17_January_2023__5__AdobeExpress](https://user-images.githubusercontent.com/109977562/212988274-10948171-e32e-45ac-aa86-e304f04276a4.gif)

## Reflection

### Wins
- Received a 100% accessibility score from the Lighthouse Accessibility Audit.
- Created an app that supports two types of users (admin and travelers).
- Implemented a login feature for the first time.
- Improved UX by implementing client-side form validation and error handling messages.
- Designed a "forgiving" UI by implementing backwards navigation buttons and a logout button. 

### Challenges 
- I had to do a lot of research to figure out how to manipulate dates. At firt I struggled to add the trip duration to the trip start date, but accomplished this through the .getTime() method. 
- I would have liked to only have one dynamic function to create all of the tables.

### Future Considerations
- If I had time, I would have liked to add a current trip page for any trips that span the current date. I would want this page to display the trip, suggest activities, and allow the user to create an agenda for each day. If a user did not have a current trip, then this page could display a countdown to show the number of days until their next trip. If there are no upcoming trip, then it would display a message encouraging the user to book a trip.

## Contributors
- Tristin Sorrells [GitHub](https://github.com/Tristinsorrells1), [LinkedIn](https://www.linkedin.com/in/tristinsorrells/)
