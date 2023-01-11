import chai from "chai";
import Travelers from "../src/Travelers";
const expect = chai.expect;

describe("Travelers", function () {
	let travelersData;
	let travelers;
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
			{
				id: 6,
				name: "Laverna Flawith",
				travelerType: "shopper",
			},
			{
				id: 7,
				name: "Emmet Sandham",
				travelerType: "relaxer",
			},
			{
				id: 8,
				name: "Carlin O'Reilly",
				travelerType: "history buff",
			},
			{
				id: 9,
				name: "Natalee Deegin",
				travelerType: "relaxer",
			},
			{
				id: 10,
				name: "Rickie Jodlowski",
				travelerType: "relaxer",
			},
			{
				id: 11,
				name: "Joy Dovington",
				travelerType: "history buff",
			},
			{
				id: 12,
				name: "Lannie Heynel",
				travelerType: "history buff",
			},
			{
				id: 13,
				name: "Torin Billington",
				travelerType: "photographer",
			},
			{
				id: 14,
				name: "Ellynn Kyne",
				travelerType: "history buff",
			},
			{
				id: 15,
				name: "Emeline Winslet",
				travelerType: "history buff",
			},
			{
				id: 16,
				name: "Deirdre Paeckmeyer",
				travelerType: "foodie",
			},
			{
				id: 17,
				name: "Julian Ullyott",
				travelerType: "relaxer",
			},
			{
				id: 18,
				name: "Sheila Valentetti",
				travelerType: "foodie",
			},
			{
				id: 19,
				name: "Felicdad Rishbrook",
				travelerType: "thrill-seeker",
			},
			{
				id: 20,
				name: "Gregg Tours",
				travelerType: "thrill-seeker",
			},
		];
		travelers = new Travelers(travelersData);
	});

	it("should be a function", function () {
		expect(Travelers).to.be.a("function");
	});

	it("should be an instance of Travelers", function () {
		expect(travelers).to.be.an.instanceof(Travelers);
	});

	it("should store all travelers' data", function () {
		expect(travelers.data).to.deep.equal(travelersData);
	});

	it("should find a traveler by their id", function () {
		expect(travelers.findTravelerById(15)).to.deep.equal({
			id: 15,
			name: "Emeline Winslet",
			travelerType: "history buff",
		});
	});

	it("should return an error message if a traveler with an id is not found", function () {
		expect(travelers.findTravelerById(50)).to.equal(
			`We could not find a traveler with this id`
		);
	});
});
