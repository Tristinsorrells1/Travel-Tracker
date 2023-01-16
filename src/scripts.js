//----------------------------Imports------------------------------------------
import "./css/styles.css";
import apiCalls from "./apiCalls";
import Destinations from "../src/Destinations";
import User from "../src/User";
import Trips from "../src/Trips";
import Travelers from "../src/Travelers";
import Agent from "../src/Agent";

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
let agent;
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
let agentResponseMessage = document.querySelector(".agent-result");
let agentStats = document.querySelector(".agent-stats");
let h1 = document.querySelector("#h1");

let expenseButton = document.querySelector(".expense-button");
let tripButton = document.querySelector(".trips-button");
let bookNewTripButton = document.querySelector(".book-trip-button");
let submitRequestButton = document.querySelector(".submit-request-button");
let priceEstimateButton = document.querySelector(".price-estimate-button");
let loginButton = document.querySelector(".login-button");
let logoutButton = document.querySelector(".logout-button");
let searchButton = document.querySelector(".search-button");
let approveTripButton = document.querySelector(".aprove-trip-button");
let deleteTripButton = document.querySelector(".delete-trip-button");

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
let searchInput = document.querySelector("#search");

let pendingTrips = document.querySelector(".pending-trips");
let usersOnTrips = document.querySelector(".users-on-a-trip");
let totalMoneyEarned = document.querySelector(".money-earned");
let annualMoneyEarned = document.querySelector(".annual-money-earned");
let allTripsTable = document.querySelector(".all-users-table");
let searchedUserTable = document.querySelector(".searched-table");
let foundTrip = document.querySelector(".found-trip");
let searchForUserContainer = document.querySelector(
	".search-for-user-container"
);

//-----------------------------------eventListeners------------------------

expenseButton.addEventListener("click", function () {
	expenseSection.classList.remove("hidden");
	addHiddenClass([tripsSection, bookingSection]);
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

searchButton.addEventListener("click", function () {
	event.preventDefault();
	searchForUser();
});

searchedUserTable.addEventListener("click", function (event) {
	console.log(event.target);
});

allTripsTable.addEventListener("click", function (event) {
	let tripFound = trips.data.find(
		(trip) => trip.id === Number(event.target.innerText)
	);
	if (tripFound) {
		getTripToApproveOrDeny(tripFound);
	}
});

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
	agent = new Agent(travelersData, tripsData);
	getAgentStats();
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
	addHiddenClass([submitRequestButton, priceEstimateButton]);
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
	removeHiddenClass([submitRequestButton, priceEstimateButton]);
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

function showAgentResult(result) {
	addHiddenClass([agentStats, approveTripButton, deleteTripButton]);
	
	if (result === "success") {
		agentResponseMessage.innerText =
			"Success! This trip request has been deleted.";
	} else if (result === "server error") {
		agentResponseMessage.innerText =
			"A server issue has occured. Please try again later.";
	} else {
		agentResponseMessage.innerText =
			"An unexpected issue has occured. Please try again later.";
	}
	setTimeout(resetAgentDashboard, 6000);
}

function resetAgentDashboard() {
	agentStats.classList.remove("hidden");
	agentResponseMessage = ""
	getAgentStats();
}

function resetForm() {
	form.classList.remove("hidden");
	postResponseMessage.innerText = "";
	postResponseMessage.classList.add("hidden");
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
							resetTable(expenseTable);
							createLayout();
						});
					});
			}
		})
		.catch((error) => {
			showPostResult("server error");
		});
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
		expenseSection,
	]);
	yourJourneyAwaitsText.innerText =
		"Travel Tracker - Imagine Where Life Can Take You";
	resetTable(expenseTable);
}

function resetTable() {
	while (allTripsTable.rows.length > 1) {
		allTripsTable.deleteRow(1);
	}
}

///// Agents

function getAgentStats() {
	let allUsersTrips = trips.getTripsForAllUsers();
	let getPendingTrips = allUsersTrips.filter(
		(trip) => trip.status === "pending"
	);
	let getUsersOnTrips = agent.findUsersOnATripToday(today);
	let totalSum = allUsersTrips.reduce((accum, trip) => {
		let tripCost = destinations.findTripCost(trip, "agent");
		accum += tripCost;
		return accum;
	}, 0);
	let annualSum = allUsersTrips.reduce((accum, trip) => {
		if (trip.date.slice(0, 4) === today.slice(0, 4)) {
			let tripCost = Number(destinations.findTripCost(trip, "agent"));
			accum += tripCost;
		}
		return accum;
	}, 0);

	pendingTrips.innerText = `There are ${getPendingTrips.length} pending trips to review`;
	usersOnTrips.innerText = `There are ${getUsersOnTrips.length} users on a trip today`;
	totalMoneyEarned.innerText = `You have earned a total commission of $${totalSum.toLocaleString(
		"en-US"
	)}`;
	annualMoneyEarned.innerText = `You have earned $${annualSum.toLocaleString(
		"en-US"
	)} this year`;
	createAgentTable();
}

function createAgentTable() {
	allTripsTable.classList.remove("hidden")
	let usersTrips = trips.getTripsForAllUsers();
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
				let row = allTripsTable.insertRow(-1);
				let cell1 = row.insertCell(0);
				let cell2 = row.insertCell(1);
				let cell3 = row.insertCell(2);
				let cell4 = row.insertCell(3);
				let cell5 = row.insertCell(4);
				let cell6 = row.insertCell(5);
				let cell7 = row.insertCell(6);
				let cell8 = row.insertCell(7);
		

				cell1.innerHTML = `${travelers.findTravelerById(trip.userID).name}`;
				cell8.innerHTML = `${trip.id}`;
				cell2.innerHTML = `${destination.destination}`;
				cell3.innerHTML = `${trip.date}`;
				cell4.innerHTML = `${trip.duration} days`;
				cell5.innerHTML = `${trip.travelers} travelers`;
				cell7.innerHTML = `${trip.status}`;
				cell6.innerHTML = `$${destinations
					.findTripCost(trip, "agent")
					.toLocaleString("en-US")}`;
				tripsAlreadyInTable.push(trip);
			}
		});
	});
}

function searchForUser() {
	let foundUser = agent.findUserByName(searchInput.value);
	allTripsTable.classList.add("hidden");

	// Rachael Vaughten
	searchInput.value = "";
	createTableForSearchUser(foundUser);
}

function createTableForSearchUser(user) {
	let usersTrips = trips.getTripsByUser(user.id);
	searchedUserTable.classList.remove("hidden");
	allTripsTable.classList.add("hidden");
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
				console.log(trip);
				let row = searchedUserTable.insertRow(-1);
				let cell1 = row.insertCell(0);
				let cell2 = row.insertCell(1);
				let cell3 = row.insertCell(2);
				let cell4 = row.insertCell(3);
				let cell5 = row.insertCell(4);
				let cell6 = row.insertCell(5);
				let cell7 = row.insertCell(6);
				let cell8 = row.insertCell(7);

				cell1.innerHTML = `${travelers.findTravelerById(trip.userID).name}`;
				cell2.innerHTML = `${trip.id}`;
				cell3.innerHTML = `${destination.destination}`;
				cell4.innerHTML = `${trip.date}`;
				cell5.innerHTML = `${trip.duration}`;
				cell6.innerHTML = `${trip.travelers}`;
				cell8.innerHTML = `${trip.status}`;
				cell7.innerHTML = `$${destinations
					.findTripCost(trip, "agent")
					.toLocaleString("en-US")}`;
				tripsAlreadyInTable.push(trip);
			}
		});
	});
}

function getTripToApproveOrDeny(tripFound) {
	addHiddenClass([searchForUserContainer, searchButton, allTripsTable]);
	foundTrip.classList.remove("hidden");
	deleteTripButton.addEventListener("click", function () {
		deleteTrip(tripFound.id);
	});
}

function deleteTrip(id) {
	fetch(`http://localhost:3001/api/v1/trips/${id}`, {
		method: "DELETE",
	})
		.then((response) => {
			if (!response.ok) {
				response.json().then((response) => {
					console.log(response.message);
				});
				return showAgentResult("unknown");
			} else {
				fetch(`http://localhost:3001/api/v1/trips`)
					.then((response) => response.json())
					.then((data) => {
						fetchApiPromises().then(() => {
							createInstances();
							allTripsTable.classList.add("hidden");
							resetTable();
							showAgentResult("success");
						});
					});
			}
		})
		.catch((error) => {
			showAgentResult("server error");
		});
}
