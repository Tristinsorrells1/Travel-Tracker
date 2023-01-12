class Trips {
	constructor(tripsData) {
		this.data = tripsData;
	}
	findIfUserHasTrips(id) {
		let trips = this.data.filter((trip) => trip.userID === id);
		if (trips.length < 1) {
			return false
		}
		return trips;
	}
	getTripsByUser(id) {
		if (!this.findIfUserHasTrips(id)) {
			return `No trips found for this traveler`;
		}
		return this.findIfUserHasTrips(id);
	}
    getTripsForAllUsers() {
        return this.data
    }
	getTripsByDate(date) {
		let trips = this.data.filter((trip) => trip.date === date);
		if (trips.length < 1) {
			return `No trips found on this date`;
		}
		return trips;
	}
}

export default Trips;
