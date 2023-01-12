class Travelers {
	constructor(travelersData) {
		this.data = travelersData;
	}
	findIfUserExists(id) {
		let traveler = this.data.find((user) => user.id === id);
		if (traveler === undefined) {
			return false
		}
		return traveler;
	}
	findTravelerById(id) {
		if (!this.findIfUserExists(id)) {
			return `We could not find a traveler with this id`;
		}
		return this.findIfUserExists(id);
	}
}

export default Travelers;