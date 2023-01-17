import chai from "chai";
import Agent from "../src/Agent";
import Travelers from "../src/Travelers";
import Trips from "../src/Trips";
const expect = chai.expect;

describe("Agent", function () {
	let travelers;
	let travelersData;
	let tripsData;
	let trips;
	let agent;
	beforeEach("test setup", function () {
		travelersData = [
			{
				id: 1,
				name: "Ham Leadbeater",
				travelerType: "relaxer",
			},
			{
				id: 2,
				name: "Rachael Vaughten",
				travelerType: "thrill-seeker",
			},
			{
				id: 3,
				name: "Sibby Dawidowitsch",
				travelerType: "shopper",
			},
			{
				id: 4,
				name: "Leila Thebeaud",
				travelerType: "photographer",
			},
			{
				id: 5,
				name: "Tiffy Grout",
				travelerType: "thrill-seeker",
			},
		];
		travelers = new Travelers(travelersData);
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
				date: "2022/12/07",
				duration: 17,
				status: "approved",
				suggestedActivities: [],
			},
		];
		trips = new Trips(tripsData);
		agent = new Agent(travelersData, tripsData);
	});

	it("should be a function", function () {
		expect(Agent).to.be.a("function");
	});

	it("should be an instance of Agent", function () {
		expect(agent).to.be.an.instanceof(Agent);
	});

	it("should store all travelers' information", function () {
		expect(agent.travelersInfo).to.deep.equal(travelersData);
	});

	it("should store all trips information", function () {
		expect(agent.tripsInfo).to.deep.equal(tripsData);
	});

	it("should find a traveler by their first and last name", function () {
		expect(agent.findUserByName("Rachael Vaughten")).to.deep.equal({
			id: 2,
			name: "Rachael Vaughten",
			travelerType: "thrill-seeker",
		});
	});

	it("should inform Agent if no user by a name is found", function () {
		expect(agent.findUserByName("achael Vaughten")).to.equal(
			`No Travelers by the name of achael Vaughten found`
		);
	});

	it("should find all Travelers currently on a trip", function () {
		expect(agent.findUsersOnATripToday("2022/12/19")).to.deep.equal([
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
				date: "2022/12/07",
				duration: 17,
				status: "approved",
				suggestedActivities: [],
			},
		]);
	});

	it("should inform agent if there are no Travelers currently on a trip", function () {
		expect(agent.findUsersOnATripToday("2023/12/19")).to.equal(
			`There are no users currently on a trip`
		);
	});
});
