class Destinations {
	constructor(destinationsData) {
		this.data = destinationsData;
	}
	findTripCost(request) {
		let destination = this.data.find(
			(destination) => destination.id === request.destinationID
		);
		let tripCost =
		(destination.estimatedLodgingCostPerDay * request.duration) +
		(destination.estimatedFlightCostPerPerson * request.travelers);
		
		let tripWithFee = tripCost + tripCost * 0.1;
		return tripWithFee;
	}
}

export default Destinations;
