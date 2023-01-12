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
let year = "2022/01/01";

//-----------------------------------querySelectors------------------------
let pastTripsGrid = document.querySelector(".past-trips-grid");
let pendingTripsGrid = document.querySelector(".pending-trips-grid");
let futureTripsGrid = document.querySelector(".future-trips-grid");
let yourJourneyAwaitsText = document.querySelector(".journey-message");
let expenseButton = document.querySelector(".expense-button");
let tripButton = document.querySelector(".trips-button");
let tripsSection = document.querySelector(".trips-view");
let expenseSection = document.querySelector(".expense-view");
let tripExpenses = document.querySelector(".trip-expense-info");
let expenseTable = document.querySelector(".expense-table");
let totalSpentText = document.querySelector(".total-spent-text");
let yearlyAmountText = document.querySelector(".amount-this-year-text");

//-----------------------------------eventListeners------------------------

expenseButton.addEventListener("click", function () {
	tripsSection.classList.add("hidden");
	expenseSection.classList.remove("hidden");
});

tripButton.addEventListener("click", function () {
	tripsSection.classList.remove("hidden");
	expenseSection.classList.add("hidden");
});

// -----------------------------------Functions----------------------------

const fetchApiPromises = () => {
	apiCalls.fetchData().then((data) => {
		travelersData = data[0].travelers;
		tripsData = data[1].trips;
		destinationsData = data[2].destinations;
		createInstances();
		test();
		createLayout();
	});
};

function createLayout() {
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
	createExpenseTable();
	createExpenseReport();
	yourJourneyAwaitsText.innerText = `Your Next Journey Awaits, ${
		user.name.split(" ")[0]
	}`;
}

fetchApiPromises();

function test() {
	user = new User(travelersData[17]);
	console.log(user.getTrips(travelers, trips));
	console.log(user.id);
}

function createInstances() {
	travelers = new Travelers(travelersData);
	trips = new Trips(tripsData);
	destinations = new Destinations(destinationsData);
}

function createTripsGrid(tripGrid, tripTimeline) {
	tripGrid.innerHTML = "";
	let getTrips = tripTimeline.map((trip) => {
		return destinations["data"].find(
			(destination) => destination.id === trip.destinationID
		);
	});

	getTrips.forEach((destination) => {
		tripTimeline.forEach((trip) => {
			if (destination.id === trip.destinationID) {
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
			}
		});
	});
	if (tripGrid.innerHTML === "") {
		tripGrid.innerHTML = `<p class="no-trips-in-grid">No Trips Found</p>`;
	}
}

function createExpenseTable() {
	let usersTrips = user.getTrips(travelers, trips);

	let getTrips = usersTrips.map((trip) => {
		return destinations["data"].find(
			(destination) => destination.id === trip.destinationID
		);
	});

	getTrips.forEach((destination) => {
		usersTrips.forEach((trip) => {
			if (destination.id === trip.destinationID) {
				let row = expenseTable.insertRow(-1);
				let cell1 = row.insertCell(0);
				let cell2 = row.insertCell(1);
				let cell3 = row.insertCell(2);
				let cell4 = row.insertCell(3);

				cell1.innerHTML = `${destination.destination}`;
				cell2.innerHTML = `${trip.date}`;
				cell3.innerHTML = `${trip.duration}`;
				cell4.innerHTML = `$${destinations
					.findTripCost(trip)
					.toLocaleString("en-US")}`;
			}
		});
	});
	// if (tripExpenses.innerHTML === "") {
	// 	tripExpenses.innerHTML = `<p class="You haven't spent money on a trip yet."`;
	// }
}

function createExpenseReport() {
	let usersTrips = user.getTrips(travelers, trips);
	let totalSum = usersTrips.reduce((accum, trip) => {
		let tripCost = Number(destinations.findTripCost(trip));
		accum += tripCost;
		return accum;
	}, 0);

	let tripsThisYear = trips.getTripsByDate(year);

	if (typeof tripsThisYear === "object") {
		let annualSum = tripsThisYear.reduce((accum, trip) => {
			let tripCost = Number(destinations.findTripCost(trip));
			accum += tripCost;
			return accum;
		}, 0);
		yearlyAmountText.innerHTML = `You've spent $${annualSum.toLocaleString(
			"en-US"
		)} on trips this year`;
	}

	totalSpentText.innerHTML = `and $${totalSum.toLocaleString(
		"en-US"
	)} on trips total`;
}
