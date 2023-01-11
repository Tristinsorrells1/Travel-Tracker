import chai from "chai";
import Trips from "../src/Trips";
const expect = chai.expect;

describe("Trips", function () {
	let tripsData;
	let trips;
	beforeEach("test setup", function () {
		tripsData = [
			{
				id: 1,
				userID: 44,
				destinationID: 49,
				travelers: 1,
				date: "2022/09/16",
				duration: 8,
				status: "approved",
				suggestedActivities: [],
			},
			{
				id: 2,
				userID: 35,
				destinationID: 25,
				travelers: 5,
				date: "2022/10/04",
				duration: 18,
				status: "approved",
				suggestedActivities: [],
			},
			{
				id: 3,
				userID: 3,
				destinationID: 22,
				travelers: 4,
				date: "2022/05/22",
				duration: 17,
				status: "approved",
				suggestedActivities: [],
			},
			{
				id: 4,
				userID: 43,
				destinationID: 14,
				travelers: 2,
				date: "2022/02/25",
				duration: 10,
				status: "approved",
				suggestedActivities: [],
			},
			{
				id: 5,
				userID: 42,
				destinationID: 29,
				travelers: 3,
				date: "2022/04/30",
				duration: 18,
				status: "approved",
				suggestedActivities: [],
			},
			{
				id: 6,
				userID: 29,
				destinationID: 35,
				travelers: 3,
				date: "2022/06/29",
				duration: 9,
				status: "approved",
				suggestedActivities: [],
			},
			{
				id: 7,
				userID: 37,
				destinationID: 17,
				travelers: 5,
				date: "2022/5/28",
				duration: 20,
				status: "approved",
				suggestedActivities: [],
			},
			{
				id: 8,
				userID: 36,
				destinationID: 39,
				travelers: 6,
				date: "2022/02/07",
				duration: 4,
				status: "approved",
				suggestedActivities: [],
			},
			{
				id: 9,
				userID: 24,
				destinationID: 19,
				travelers: 5,
				date: "2022/12/19",
				duration: 19,
				status: "approved",
				suggestedActivities: [],
			},
			{
				id: 10,
				userID: 9,
				destinationID: 50,
				travelers: 6,
				date: "2022/07/23",
				duration: 17,
				status: "approved",
				suggestedActivities: [],
			},
			{
				id: 11,
				userID: 50,
				destinationID: 5,
				travelers: 4,
				date: "2022/10/14",
				duration: 4,
				status: "approved",
				suggestedActivities: [],
			},
			{
				id: 12,
				userID: 33,
				destinationID: 33,
				travelers: 6,
				date: "2022/10/17",
				duration: 6,
				status: "approved",
				suggestedActivities: [],
			},
			{
				id: 13,
				userID: 14,
				destinationID: 12,
				travelers: 1,
				date: "2022/02/12",
				duration: 11,
				status: "approved",
				suggestedActivities: [],
			},
			{
				id: 14,
				userID: 19,
				destinationID: 35,
				travelers: 1,
				date: "2022/09/24",
				duration: 10,
				status: "approved",
				suggestedActivities: [],
			},
			{
				id: 15,
				userID: 50,
				destinationID: 13,
				travelers: 3,
				date: "2022/07/04",
				duration: 6,
				status: "approved",
				suggestedActivities: [],
			},
			{
				id: 16,
				userID: 19,
				destinationID: 27,
				travelers: 1,
				date: "2022/11/20",
				duration: 9,
				status: "approved",
				suggestedActivities: [],
			},
			{
				id: 17,
				userID: 28,
				destinationID: 31,
				travelers: 1,
				date: "2022/10/30",
				duration: 20,
				status: "approved",
				suggestedActivities: [],
			},
			{
				id: 18,
				userID: 18,
				destinationID: 2,
				travelers: 2,
				date: "2022/10/05",
				duration: 17,
				status: "approved",
				suggestedActivities: [],
			},
			{
				id: 19,
				userID: 47,
				destinationID: 47,
				travelers: 4,
				date: "2022/07/21",
				duration: 5,
				status: "approved",
				suggestedActivities: [],
			},
			{
				id: 20,
				userID: 41,
				destinationID: 19,
				travelers: 4,
				date: "2022/10/05",
				duration: 6,
				status: "approved",
				suggestedActivities: [],
			},
		];
		trips = new Trips(tripsData);
	});

	it("should be a function", function () {
		expect(Trips).to.be.a("function");
	});

	it("should be an instance of Trips", function () {
		expect(trips).to.be.an.instanceof(Trips);
	});

	it("should return every trip for all travelers", function () {
		expect(trips.getTripsForAllUsers()).to.deep.equal(tripsData);
	});

	it("should store every trip for all travelers", function () {
		expect(trips.data).to.deep.equal(tripsData);
	});

	it("should find all trips for a traveler by their id", function () {
		expect(trips.getTripsByUser(19)).to.deep.equal([
			{
				id: 14,
				userID: 19,
				destinationID: 35,
				travelers: 1,
				date: "2022/09/24",
				duration: 10,
				status: "approved",
				suggestedActivities: [],
			},
			{
				id: 16,
				userID: 19,
				destinationID: 27,
				travelers: 1,
				date: "2022/11/20",
				duration: 9,
				status: "approved",
				suggestedActivities: [],
			},
		]);
		expect(trips.findIfUserHasTrips(19)).to.deep.equal([
			{
				id: 14,
				userID: 19,
				destinationID: 35,
				travelers: 1,
				date: "2022/09/24",
				duration: 10,
				status: "approved",
				suggestedActivities: [],
			},
			{
				id: 16,
				userID: 19,
				destinationID: 27,
				travelers: 1,
				date: "2022/11/20",
				duration: 9,
				status: "approved",
				suggestedActivities: [],
			},
		]);
	});

	it("should return false if no trips are found for a traveler by their id", function () {
		expect(trips.findIfUserHasTrips(500)).to.equal(false);
	});

	it("should return an error message if no trips are found for a traveler by their id", function () {
		expect(trips.getTripsByUser(500)).to.equal(
			`No trips found for this traveler`
		);
	});

	it("should return all trips on a specified date", function () {
		expect(trips.getTripsByDate("2022/10/05")).to.deep.equal([
			{
				id: 18,
				userID: 18,
				destinationID: 2,
				travelers: 2,
				date: "2022/10/05",
				duration: 17,
				status: "approved",
				suggestedActivities: [],
			},
			{
				id: 20,
				userID: 41,
				destinationID: 19,
				travelers: 4,
				date: "2022/10/05",
				duration: 6,
				status: "approved",
				suggestedActivities: [],
			},
		]);
	});

	it("should return an error message if no trips are found on a specified date", function () {
		expect(trips.getTripsByDate("2022/10/03")).to.equal(
			`No trips found on this date`
		);
	});
});
