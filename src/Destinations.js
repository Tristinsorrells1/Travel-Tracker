class Destinations {
	constructor(destinationsData) {
		this.data = destinationsData;
	}

	findTripCost(request, type) {
		let destination = this.data.find(
			(destination) => destination.id === request.destinationID
		);
		let tripCost =
			destination.estimatedLodgingCostPerDay * request.duration +
			destination.estimatedFlightCostPerPerson * request.travelers;
		if (type === "agent") {
			return tripCost * 0.1;
		}
		return tripCost + tripCost * 0.1;
	}
}

export default Destinations;
