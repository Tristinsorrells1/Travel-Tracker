class User {
	constructor(userData) {
		this.id = userData.id;
		this.name = userData.name
		this.travelerType = userData.travelerType;
		this.trips;
		this.amountSpent = 0;
	}
	checkIDandTrips(travelers, trips) {
		if (!travelers.findIfUserExists(this.id)) {
			return `No user with this ID found`;
		} else if (!trips.findIfUserHasTrips(this.id)) {
			return `No trips found for this traveler`;
		}
		return false;
	}
	getTrips(travelers, trips) {
		if (this.checkIDandTrips(travelers, trips)) {
			return this.checkIDandTrips(travelers, trips);
		}
		this.trips = trips.getTripsByUser(this.id);
		return this.trips;
	}

	getTripByStatus(schedule, trips, travelers, todaysDate) {
		this.getTrips(travelers, trips);
		if (this.checkIDandTrips(travelers, trips)) {
			return this.checkIDandTrips(travelers, trips);
		}
		let pastOrUpcomingTrips;
		let tripsByStatus = [];
		let allTrips = this.trips.slice();

		if (schedule === "pending") {
			return this.trips.filter((trip) => trip.status === "pending");
		}

		let notPendingTrips = allTrips.filter((trip) => trip.status !== "pending");

		notPendingTrips = notPendingTrips.map((trip) => {
			return {
				...trip,
				date: trip.date.replaceAll("/", ""),
			};
		});

		todaysDate = todaysDate.replaceAll("/", "");

		if (schedule === "past") {
			pastOrUpcomingTrips = notPendingTrips.filter(
				(trip) => parseInt(trip.date) < parseInt(todaysDate)
			);
		} else if (schedule === "upcoming") {
			pastOrUpcomingTrips = notPendingTrips.filter(
				(trip) => parseInt(trip.date) > parseInt(todaysDate)
			);
		}
		pastOrUpcomingTrips.forEach((pastTrip) => {
			this.trips.forEach((trip) => {
				if (pastTrip.id === trip.id) {
					tripsByStatus.push(trip);
				}
			});
		});
		return tripsByStatus;
	}
	createTripRequest(
		destinationID,
		date,
		duration,
		travelers,
		trips
	) {
		let allTrips = trips.getTripsForAllUsers();
		let lastUsedId = allTrips[allTrips.length - 1].id;
		let tripRequest = {
			id: lastUsedId += 1,
			userID: this.id,
			destinationID,
			travelers,
			date,
			duration,
			status: "pending",
			"suggestedActivities": []
		};
		return tripRequest;
	}
	totalAmountSpent(destinations, todaysDate) {
		let yearlyTrips = this.trips.filter((trip) => {
			return trip.date.slice(0, 4) === todaysDate.slice(0, 4);
		});
		return yearlyTrips.reduce((accum, trip) => {
			let tripCost = destinations.findTripCost(trip);

			accum += tripCost;
			return accum;
		}, 0);
	}
}

export default User;
