//----------------------------Imports------------------------------------------
import "./css/styles.css";
import apiCalls from "./apiCalls";
import Destinations from "../src/Destinations";
import User from "../src/User";
import Trips from "../src/Trips";
import Travelers from "../src/Travelers";

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";

// ----------------------------------Variables----------------------------
let trips;
let travelers;
let destinations;
let tripsData;
let travelersData;
let destinationsData;
let user;
// let today = "2023/01/05";
let today = "2020/08/07";

//-----------------------------------querySelectors------------------------
let pastTripsGrid = document.querySelector(".past-trips-grid");
let pendingTripsGrid = document.querySelector(".pending-trips-grid");
let futureTripsGrid = document.querySelector(".future-trips-grid");

// -----------------------------------Functions----------------------------

const fetchApiPromises = () => {
	apiCalls.fetchData().then((data) => {
		travelersData = data[0].travelers;
		tripsData = data[1].trips;
		destinationsData = data[2].destinations;
		createInstances();
		test();
		createTripsGrid(
			pastTripsGrid,
			user.getTripByStatus("past", trips, travelers, today)
		);
		createTripsGrid(
			pendingTripsGrid,
			user.getTripByStatus("pending", trips, travelers, today)
		);
		createTripsGrid(
			futureTripsGrid,
			user.getTripByStatus("upcoming", trips, travelers, today)
		);
	});
};

fetchApiPromises();

function test() {
	user = new User(travelersData[18]);
	console.log(user.getTrips(travelers, trips));
    console.log(user.trips)
}

function createInstances() {
	travelers = new Travelers(travelersData);
	trips = new Trips(tripsData);
	destinations = new Destinations(destinationsData);
}

function createTripsGrid(tripGrid, tripDate) {
	// let pastTrips = user.getTripByStatus("past", trips, travelers, today);

	tripGrid.innerHTML = "";
	let getTrips = tripDate.map((trip) => {
		return destinations["data"].find(
			(destination) => destination.id === trip.destinationID
		);
	});

	getTrips.forEach((destination) => {
		tripDate.forEach((trip) => {
			tripGrid.innerHTML += ` <div class="trip-container">
                <div class="trip-image-container">
                  <img class="trip-image"
                    src=${destination.image} >
                    </div>
                    <p>${destination.destination}</p>
                    <p>Duration: ${trip.duration} days</p>
                    <p>Date: ${trip.date}</p>
              </div>
                `;
		});
	});

    if (tripGrid.innerHTML === "") {
        tripGrid.innerHTML = `
        <p class="no-trips-in-grid">No Trips Found</p>`
    }
}
