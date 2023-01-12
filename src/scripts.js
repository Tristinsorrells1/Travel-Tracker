//----------------------------Imports------------------------------------------
import './css/styles.css';
import apiCalls from "./apiCalls";
import Destinations from "../src/Destinations";
import User from "../src/User";
import Trips from "../src/Trips";
import Travelers from "../src/Travelers";

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// ----------------------------------Variables----------------------------
let trips
let travelers
let destinations
let tripsData
let travelersData
let destinationsData
let user
let today = "2023/01/05"

//-----------------------------------querySelectors------------------------
let pastTripsGrid = document.querySelector(".past-trips-grid");
let pendingTripsGrid = document.querySelector(".pending-trips-grid");
let futureTripsGrid = document.querySelector(".future-trips-grid");

// -----------------------------------Functions----------------------------

const fetchApiPromises = () => {
	apiCalls.fetchData().then((data) => {
		travelersData = data[0].travelers
		tripsData = data[1].trips
		destinationsData = data[2].destinations
		test();
        createInstances();
        // createTripsGrid()
	});
};

fetchApiPromises();

function test() {
    user = new User(travelersData[0])
    console.log(user)
}

function createInstances() {
    travelers = new Travelers(travelersData);
    trips = new Trips(tripsData)
    destinations = new Destinations(destinationsData)
}

function createTripsGrid() {
    let pastTrips = user.getTripByStatus(
			"past",
			trips,
			travelers,
			today
		);
        console.log(pastTrips)
        console.log(destinations["data"])
        pastTripsGrid.innerHTML = ""
         let past = pastTrips.map((trip) => {
            return destinations["data"].find((destination) => destination.id === trip.destinationID)
        })
        past.forEach((trip) => {

            pastTripsGrid.innerHTML += `<div>${trip.destination}<div>
            `
        })
console.log(past[0].image)
}




