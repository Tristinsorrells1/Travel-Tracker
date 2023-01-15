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
let today = "2020/08/07";

//-----------------------------------querySelectors------------------------
let pastTripsGrid = document.querySelector(".past-trips-grid");
let pendingTripsGrid = document.querySelector(".pending-trips-grid");
let futureTripsGrid = document.querySelector(".future-trips-grid");

let yourJourneyAwaitsText = document.querySelector(".journey-message");
let totalSpentText = document.querySelector(".total-spent-text");
let yearlyAmountText = document.querySelector(".amount-this-year-text");
let emptyInputText = document.querySelector(".empty-input-message");
let requestToBookText = document.querySelector(".request-to-book-text");
let tripEstimateText = document.querySelector(".trip-estimate-text");
let agentFeeText = document.querySelector(".agent-fee-text");
let postResponseMessage = document.querySelector(".post-response-message");
let loginMessage = document.querySelector(".request-to-book-text");
let h1 = document.querySelector("#h1");

let expenseButton = document.querySelector(".expense-button");
let tripButton = document.querySelector(".trips-button");
let bookNewTripButton = document.querySelector(".book-trip-button");
let submitRequestButton = document.querySelector(".submit-request-button");
let priceEstimateButton = document.querySelector(".price-estimate-button");
let loginButton = document.querySelector(".login-button");
let logoutButton = document.querySelector(".logout-button");

let bookingSection = document.querySelector(".booking-view");
let tripsSection = document.querySelector(".trips-view");
let expenseSection = document.querySelector(".expense-view");
let loginSection = document.querySelector(".login-view");

let form = document.querySelector(".booking-form");

let expenseTable = document.querySelector(".expense-table");

let dateandTime = document.querySelector(".date-container");

let dateInput = document.querySelector("#departureDate");
let durationInput = document.querySelector("#numberOfDays");
let groupSizeInput = document.querySelector("#numberOfPeople");
let destinationInput = document.querySelector("#destinationInput");
let usernameInput = document.querySelector("#username");
let passwordInput = document.querySelector("#password");

//-----------------------------------eventListeners------------------------

expenseButton.addEventListener("click", function () {
	expenseSection.classList.remove("hidden");
    addHiddenClass([tripsSection, bookingSection])
});

tripButton.addEventListener("click", function () {
	tripsSection.classList.remove("hidden");
    addHiddenClass([expenseSection, bookingSection]);
});

bookNewTripButton.addEventListener("click", function () {
	bookingSection.classList.remove("hidden");
    addHiddenClass([expenseSection, tripsSection]);
});

submitRequestButton.addEventListener("click", function (event) {
	event.preventDefault();
	postTripRequest();
});

priceEstimateButton.addEventListener("click", function (event) {
	event.preventDefault();
	checkForEmptyInputs();
	getTripEstimate();
});

loginButton.addEventListener("click", function (event) {
	event.preventDefault();
	verifyLoginInfo();
});

logoutButton.addEventListener("click", function () {
	logoutUser();
});

document.addEventListener(
	"invalid",
	(function () {
		return function (e) {
			e.preventDefault();
			document.getElementById("#numberOfDays").focus();
			document.getElementById("#numberOfPeople").focus();
			// document.getElementById("#numberOfDays").focus();
		};
	})(),
	true
);

// -----------------------------------Functions----------------------------
var dt = new Date();
document.getElementById("dateTime").innerHTML = dt.toLocaleTimeString("en-US", {
	hour: "numeric",
	minute: "2-digit",
	hourCycle: "h11",
	hour12: true,
});

const fetchApiPromises = () => {
	return apiCalls.fetchData().then((data) => {
		travelersData = data[0].travelers;
		tripsData = data[1].trips;
		destinationsData = data[2].destinations;
		createInstances();
	});
};

fetchApiPromises();

function addHiddenClass(array) {
	array.forEach((item) => {
		item.classList.add("hidden");
	});
}

function removeHiddenClass(array) {
	array.forEach((item) => {
		item.classList.remove("hidden");
	});
}

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
	h1.innerText = `Welcome Back, ${user.name.split(" ")[0]}`;
}

// function test() {
//     console.log(travelers)
// 	user = new User(travelers.data[22])
// }

function createInstances() {
	travelers = new Travelers(travelersData);
	trips = new Trips(tripsData);
	destinations = new Destinations(destinationsData);
}

function createTripsGrid(tripGrid, tripTimeline) {
	tripGrid.innerHTML = "";
	let tripsInGrid = [];
	let getTrips = tripTimeline.map((trip) => {
		return destinations["data"].find(
			(destination) => destination.id === trip.destinationID
		);
	});

	getTrips.forEach((destination) => {
		tripTimeline.forEach((trip) => {
			if (
				destination.id === trip.destinationID &&
				!tripsInGrid.includes(trip)
			) {
				tripGrid.innerHTML += ` <div class="trip-container border">
                    <div class="trip-image-container">
                            <img class="trip-image"
                            src=${destination.image} alt="A picturesque view in ${destination.destination}">
                        </div>
                        <p>${destination.destination}</p>
                        <p>Duration: ${trip.duration} days</p>
                        <p>Date: ${trip.date}</p>
                </div>
                    `;
				tripsInGrid.push(trip);
			}
		});
	});
	if (tripGrid.innerHTML === "") {
		tripGrid.innerHTML = `<p class="no-trips-in-grid center">No Trips Found</p>`;
	}
}

function createExpenseTable() {
	let usersTrips = user.getTrips(travelers, trips);
	let tripsAlreadyInTable = [];

	let getTrips = usersTrips.map((trip) => {
		return destinations["data"].find(
			(destination) => destination.id === trip.destinationID
		);
	});

	getTrips.forEach((destination) => {
		usersTrips.forEach((trip) => {
			if (
				destination.id === trip.destinationID &&
				!tripsAlreadyInTable.includes(trip)
			) {
				let row = expenseTable.insertRow(-1);
				let cell1 = row.insertCell(0);
				let cell2 = row.insertCell(1);
				let cell3 = row.insertCell(2);
				let cell4 = row.insertCell(3);
				let cell5 = row.insertCell(4);
				let cell6 = row.insertCell(5);

				cell1.innerHTML = `${destination.destination}`;
				cell2.innerHTML = `${trip.date}`;
				cell3.innerHTML = `${trip.duration}`;
				cell4.innerHTML = `${trip.travelers}`;
				cell5.innerHTML = `${trip.status}`;
				cell6.innerHTML = `$${destinations
					.findTripCost(trip)
					.toLocaleString("en-US")}`;
				tripsAlreadyInTable.push(trip);
			}
		});
	});
}

function createExpenseReport() {
	let usersTrips = user.getTrips(travelers, trips);

	let totalSum = usersTrips.reduce((accum, trip) => {
		let tripCost = Number(destinations.findTripCost(trip));
		accum += tripCost;
		return accum;
	}, 0);

	let annualSum = usersTrips.reduce((accum, trip) => {
		if (trip.date.slice(0, 4) === today.slice(0, 4)) {
			let tripCost = Number(destinations.findTripCost(trip));
			accum += tripCost;
		}
		return accum;
	}, 0);

	yearlyAmountText.innerHTML = `You've spent $${annualSum.toLocaleString(
		"en-US"
	)} on trips in ${today.slice(0, 4)}`;

	totalSpentText.innerHTML = `and $${totalSum.toLocaleString("en-US")} total`;
}

function checkForEmptyInputs() {
	let inputValues = [
		dateInput,
		durationInput,
		groupSizeInput,
		destinationInput,
	];

	if (
		!dateInput.value ||
		!durationInput.value.trim() ||
		!groupSizeInput.value.trim() ||
		!destinationInput.value.trim()
	) {
		let filtered = inputValues.filter((userInput) => {
			return userInput.value.trim() === "";
		});
		filtered.forEach((field) => {
			field.classList.add("missing-info");
		});
		requestToBookText.innerText = "Please Fill Out All Fields";
		requestToBookText.classList.add("red-text");
		return false;
	}
	requestToBookText.classList.remove("red-text");
	requestToBookText.innerText = "Request to Book a Trip";
	inputValues.forEach((field) => {
		field.classList.remove("missing-info");
	});
	return true;
}

function createTrip() {
	let tripRequest;
	if (
		dateInput.value &&
		durationInput.value.trim() &&
		groupSizeInput.value.trim() &&
		destinationInput.value.trim()
	) {
		tripRequest = user.createTripRequest(
			Number(destinationInput.value),
			dateInput.value.replaceAll("-", "/"),
			Number(durationInput.value),
			Number(groupSizeInput.value),
			trips
		);
	}
	return tripRequest;
}

function getTripEstimate() {
	let tripRequest = createTrip();
	let estimateCost = destinations.findTripCost(tripRequest);
    addHiddenClass([submitRequestButton, priceEstimateButton])
	agentFeeText.classList.remove("hidden");
	tripEstimateText.innerHTML = `
    <p>Based on the information provided, the estimated trip price is $${estimateCost.toLocaleString(
			"en-US"
		)}</p>`;

	setTimeout(() => {
		resetAfterEstimate();
	}, "6000");
}

function resetAfterEstimate() {
	tripEstimateText.innerHTML = "";
    removeHiddenClass([submitRequestButton, priceEstimateButton])
	agentFeeText.classList.add("hidden");
}
function showPostResult(result) {
	form.classList.add("hidden");
	postResponseMessage.classList.remove("hidden");
	if (result === "success") {
		postResponseMessage.innerText =
			"Success! Your trip request will be reviewed by a travel agent soon.";
	} else if (result === "server error") {
		postResponseMessage.innerText =
			"A server issue has occured. Please try again later.";
	} else {
		postResponseMessage.innerText =
			"An unexpected issue has occured. Please try again later.";
	}
	setTimeout(resetForm, 6000);
}

function postTripRequest() {
	if (!checkForEmptyInputs()) {
		return checkForEmptyInputs();
	}
	let tripRequest = createTrip();
	durationInput.value = null;
	groupSizeInput.value = null;
	destinationInput.value = null;
	fetch(`http://localhost:3001/api/v1/trips`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(tripRequest),
	})
		.then((response) => {
			if (!response.ok) {
				response.json().then((response) => {
					console.log(response.message);
				});
				return showPostResult("unknown");
			} else {
				showPostResult("success");
				fetch(`http://localhost:3001/api/v1/trips`)
					.then((response) => response.json())
					.then((data) => {
						fetchApiPromises().then(() => {
							resetExpenseTable();
							createLayout();
						});
					});
			}
		})
		.catch((error) => {
			showPostResult("server error");
		});
}

function resetForm() {
	form.classList.remove("hidden");
	postResponseMessage.innerText = "";
	postResponseMessage.classList.add("hidden");
}

function verifyLoginInfo() {
	let inputValues = [usernameInput, passwordInput];

	if (!usernameInput.value.trim() || !passwordInput.value.trim()) {
		let filtered = inputValues.filter((userInput) => {
			return userInput.value.trim() === "";
		});
		filtered.forEach((field) => {
			field.classList.add("missing-info");
		});
		loginMessage.innerText = "Please enter a username and password.";
		loginMessage.classList.add("red-text");
		return;
	}
	inputValues.forEach((field) => {
		field.classList.remove("missing-info");
	});
	loginMessage.innerText = "Login";
	loginMessage.classList.remove("red-text");
	findUserInSystem();
}

function findUserInSystem() {
	if (
		usernameInput.value.slice(0, 8) !== "traveler" ||
		isNaN(usernameInput.value.slice(8)) ||
		usernameInput.value.slice(8) <= 0 ||
		usernameInput.value.slice(8) > 50
	) {
		usernameInput.classList.add("missing-info");
		loginMessage.innerText = "Please enter a valid username.";
		loginMessage.classList.add("red-text");
		return;
	}
	if (passwordInput.value !== "travel") {
		passwordInput.classList.add("missing-info");
		loginMessage.innerText =
			"Please enter a valid username and password combination.";
		loginMessage.classList.add("red-text");
		return;
	}
	loginAsUser();
}

function loginAsUser() {
	let userID = Number(usernameInput.value.slice(8));
	user = new User(travelers.findTravelerById(userID));
	loginSection.classList.add("hidden");
	removeHiddenClass([
		tripsSection,
		expenseButton,
		tripButton,
		bookNewTripButton,
		logoutButton,
		dateandTime,
	]);
	yourJourneyAwaitsText.innerText = `Your Next Journey Awaits, ${
		user.name.split(" ")[0]
	}`;
	createLayout();
}

function logoutUser() {
	user = null;
	passwordInput.value = "";
	usernameInput.value = "";
	loginSection.classList.remove("hidden");
	addHiddenClass([
		tripsSection,
		expenseButton,
		tripButton,
		bookNewTripButton,
		logoutButton,
		dateandTime,
        bookingSection,
        expenseSection
	]);
	yourJourneyAwaitsText.innerText =
		"Travel Tracker - Imagine Where Life Can Take You";
	resetExpenseTable();
}

function resetExpenseTable() {
	while (expenseTable.rows.length > 0) {
		expenseTable.deleteRow(0);
	}
}
