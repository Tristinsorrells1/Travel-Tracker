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

let expenseButton = document.querySelector(".expense-button");
let tripButton = document.querySelector(".trips-button");
let bookNewTripButton = document.querySelector(".book-trip-button");
let submitRequestButton = document.querySelector(".submit-request-button");
let priceEstimateButton = document.querySelector(".price-estimate-button");

let bookingSection = document.querySelector(".booking-view");
let tripsSection = document.querySelector(".trips-view");
let expenseSection = document.querySelector(".expense-view");

let form = document.querySelector(".form");

let expenseTable = document.querySelector(".expense-table");

let dateInput = document.querySelector("#departureDate");
let durationInput = document.querySelector("#numberOfDays");
let groupSizeInput = document.querySelector("#numberOfPeople");
let destinationInput = document.querySelector("#destinationInput");

//-----------------------------------eventListeners------------------------

expenseButton.addEventListener("click", function () {
	expenseSection.classList.remove("hidden");
	tripsSection.classList.add("hidden");
	bookingSection.classList.add("hidden");
	console.log("expense");
});

tripButton.addEventListener("click", function () {
	tripsSection.classList.remove("hidden");
	expenseSection.classList.add("hidden");
	bookingSection.classList.add("hidden");
	console.log("trip");
});

bookNewTripButton.addEventListener("click", function () {
	bookingSection.classList.remove("hidden");
	tripsSection.classList.add("hidden");
	expenseSection.classList.add("hidden");
	console.log("book");
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
	apiCalls.fetchData().then((data) => {
		travelersData = data[0].travelers;
		tripsData = data[1].trips;
		destinationsData = data[2].destinations;
		createInstances();
		test();
		createLayout();
	});
};
fetchApiPromises();

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

function test() {
	user = new User(travelersData[22]);
    user.getTrips(travelers, trips)
}

function createInstances() {
	travelers = new Travelers(travelersData);
	trips = new Trips(tripsData);
	destinations = new Destinations(destinationsData);
}

function createTripsGrid(tripGrid, tripTimeline) {
	tripGrid.innerHTML = "";
    let tripsInGrid = []
	let getTrips = tripTimeline.map((trip) => {
		return destinations["data"].find(
			(destination) => destination.id === trip.destinationID
		);
	});

	getTrips.forEach((destination) => {
		tripTimeline.forEach((trip) => {
			if (destination.id === trip.destinationID && !tripsInGrid.includes(trip)) {
				tripGrid.innerHTML += ` <div class="trip-container">
                    <div class="trip-image-container">
                            <img class="trip-image"
                            src=${destination.image} alt="A picturesque view in ${destination.destination}">
                        </div>
                        <p>${destination.destination}</p>
                        <p>Duration: ${trip.duration} days</p>
                        <p>Date: ${trip.date}</p>
                </div>
                    `;
                    tripsInGrid.push(trip)
			}
		});
	});
	if (tripGrid.innerHTML === "") {
		tripGrid.innerHTML = `<p class="no-trips-in-grid">No Trips Found</p>`;
	}
}

function createExpenseTable() {
	let usersTrips = user.getTrips(travelers, trips);
    let tripsAlreadyInTable = []

	let getTrips = usersTrips.map((trip) => {
		return destinations["data"].find(
			(destination) => destination.id === trip.destinationID
		);
	});

	getTrips.forEach((destination) => {
		usersTrips.forEach((trip) => {
			if (destination.id === trip.destinationID && !tripsAlreadyInTable.includes(trip)) {
				let row = expenseTable.insertRow(-1);
				let cell1 = row.insertCell(0);
				let cell2 = row.insertCell(1);
				let cell3 = row.insertCell(2);
				let cell4 = row.insertCell(3);
                let cell5 = row.insertCell(4)

				cell1.innerHTML = `${destination.destination}`;
				cell2.innerHTML = `${trip.date}`;
				cell3.innerHTML = `${trip.duration}`;
                cell4.innerHTML = `${trip.status}`;
				cell5.innerHTML = `$${destinations
					.findTripCost(trip)
					.toLocaleString("en-US")}`;
                    tripsAlreadyInTable.push(trip)
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
			return userInput.value === "";
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
    return true
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
			Number(groupSizeInput.value),
			dateInput.value.replaceAll("-", "/"),
			Number(durationInput.value),
			trips
		);
	}
	return tripRequest;
}

function getTripEstimate() {
	let tripRequest = createTrip();
	let estimateCost = destinations.findTripCost(tripRequest);

	submitRequestButton.classList.add("hidden");
	priceEstimateButton.classList.add("hidden");
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
	submitRequestButton.classList.remove("hidden");
	priceEstimateButton.classList.remove("hidden");
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
            showPostResult("unknown");
        } else {
            showPostResult("success");
            fetch(`http://localhost:3001/api/v1/trips`)
                .then((response) => response.json())
                .then((data) => {
                    fetchApiPromises();
                });
            return;
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
