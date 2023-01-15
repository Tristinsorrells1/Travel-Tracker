import chai from "chai";
import Agent from "../src/Agent";
import Travelers from "../src/Travelers";
const expect = chai.expect;

describe("Agent", function () {
	let travelers;
	let travelersData;
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
		agent = new Agent(travelersData);
	});

	it("should be a function", function () {
		expect(Agent).to.be.a("function");
	});

	it("should be an instance of Agent", function () {
		expect(agent).to.be.an.instanceof(Agent);
	});

	it("should store travelers' information", function () {
		expect(agent.travelersInfo).to.deep.equal(travelersData);
	});

	it("should find a traveler by their first name", function () {
		expect(agent.findUserByName("Rachael Vaughten")).to.deep.equal({
			id: 2,
			name: "Rachael Vaughten",
			travelerType: "thrill-seeker",
			amountSpent: 0,
		});
	});

	it("should inform Agent if no user by a name is found", function () {
		expect(agent.findUserByName("achael Vaughten")).to.equal(
			`No Travelers by the name of achael Vaughten found`
		);
	});
});
