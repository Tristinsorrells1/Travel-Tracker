import chai from "chai";
import Destinations from "../src/Destinations";
import Trips from "../src/Trips";
import Travelers from "../src/Travelers";
import User from "../src/User";
const expect = chai.expect;

describe("Destinations", function () {
	let destinationsData;
	let destinations;
	let travelers;
	let travelersData;
	let tripsData;
	let trips;
	let userData;
	let user;
	beforeEach("test setup", function () {
		destinationsData = [
			{
				id: 1,
				destination: "Lima, Peru",
				estimatedLodgingCostPerDay: 70,
				estimatedFlightCostPerPerson: 400,
				image:
					"https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
				alt: "overview of city buildings with a clear sky",
			},
			{
				id: 2,
				destination: "Stockholm, Sweden",
				estimatedLodgingCostPerDay: 100,
				estimatedFlightCostPerPerson: 780,
				image:
					"https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
				alt: "city with boats on the water during the day time",
			},
			{
				id: 3,
				destination: "Sydney, Austrailia",
				estimatedLodgingCostPerDay: 130,
				estimatedFlightCostPerPerson: 950,
				image:
					"https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
				alt: "opera house and city buildings on the water with boats",
			},
			{
				id: 4,
				destination: "Cartagena, Colombia",
				estimatedLodgingCostPerDay: 65,
				estimatedFlightCostPerPerson: 350,
				image:
					"https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
				alt: "boats at a dock during the day time",
			},
			{
				id: 5,
				destination: "Madrid, Spain",
				estimatedLodgingCostPerDay: 150,
				estimatedFlightCostPerPerson: 650,
				image:
					"https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
				alt: "city with clear skys and a road in the day time",
			},
			{
				id: 6,
				destination: "Jakarta, Indonesia",
				estimatedLodgingCostPerDay: 70,
				estimatedFlightCostPerPerson: 890,
				image:
					"https://images.unsplash.com/photo-1555333145-4acf190da336?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
				alt: "lit up city at night",
			},
			{
				id: 7,
				destination: "Paris, France",
				estimatedLodgingCostPerDay: 100,
				estimatedFlightCostPerPerson: 395,
				image:
					"https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
				alt: "city during the day time with eiffel tower",
			},
			{
				id: 8,
				destination: "Tokyo, Japan",
				estimatedLodgingCostPerDay: 125,
				estimatedFlightCostPerPerson: 1000,
				image:
					"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1971&q=80",
				alt: "city with people walking in crosswalk and brightly lit shops at night",
			},
			{
				id: 9,
				destination: "Amsterdam, Netherlands",
				estimatedLodgingCostPerDay: 100,
				estimatedFlightCostPerPerson: 950,
				image:
					"https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
				alt: "canal with boats and trees and buildings along the side",
			},
			{
				id: 10,
				destination: "Toronto, Canada",
				estimatedLodgingCostPerDay: 90,
				estimatedFlightCostPerPerson: 450,
				image:
					"https://images.unsplash.com/photo-1535776142635-8fa180c46af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2756&q=80",
			},
			{
				id: 11,
				destination: "Mikonos, Greece",
				estimatedLodgingCostPerDay: 140,
				estimatedFlightCostPerPerson: 1000,
				image:
					"https://images.unsplash.com/photo-1573783309724-e44b859f5a85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80",
				alt: "cityscape along the water during the day",
			},
			{
				id: 12,
				destination: "Wellington, New Zealand",
				estimatedLodgingCostPerDay: 150,
				estimatedFlightCostPerPerson: 1200,
				image:
					"https://images.unsplash.com/photo-1442483221814-59f7d8b22739?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
				alt: "overview of city with buildings, water and trees",
			},
			{
				id: 13,
				destination: "St. Petersburg, Russia",
				estimatedLodgingCostPerDay: 100,
				estimatedFlightCostPerPerson: 1100,
				image:
					"https://images.unsplash.com/photo-1556543697-2fb00d31948a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
				alt: "buildings and people crossing the street carrying shoping bags during the day",
			},
			{
				id: 14,
				destination: "Marrakesh, Morocco",
				estimatedLodgingCostPerDay: 70,
				estimatedFlightCostPerPerson: 830,
				image:
					"https://images.unsplash.com/photo-1517821362941-f7f753200fef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80",
				alt: "people buying oranges and other fruit from a street vendor",
			},
			{
				id: 15,
				destination: "Manila, Philippines",
				estimatedLodgingCostPerDay: 40,
				estimatedFlightCostPerPerson: 900,
				image:
					"https://images.unsplash.com/photo-1555557356-51c5d7a8f4c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
				alt: "colorful buildings near the water with docked boats",
			},
			{
				id: 16,
				destination: "Bangkok, Thailand",
				estimatedLodgingCostPerDay: 35,
				estimatedFlightCostPerPerson: 988,
				image:
					"https://images.unsplash.com/photo-1563492065599-3520f775eeed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
				alt: "ornate buildings with a garden during the day",
			},
			{
				id: 17,
				destination: "Jaipur, India",
				estimatedLodgingCostPerDay: 30,
				estimatedFlightCostPerPerson: 1200,
				image:
					"https://images.unsplash.com/photo-1534758607507-754e582adfa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
				alt: "a courtyard with trees and mountain in the distance",
			},
			{
				id: 19,
				destination: "Cape Town, South Africa",
				estimatedLodgingCostPerDay: 120,
				estimatedFlightCostPerPerson: 1200,
				image:
					"https://images.unsplash.com/photo-1522576775862-7168ae29372c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1568&q=80",
				alt: "a city with mountain cliffs by the sea",
			},
			{
				id: 22,
				destination: "Quito, Ecuador",
				estimatedLodgingCostPerDay: 60,
				estimatedFlightCostPerPerson: 500,
				image:
					"https://images.unsplash.com/photo-1501684691657-cf3012635478?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
				alt: "a city at night with cloudy, snowy mountains in the distance",
			},
			{
				id: 29,
				destination: "Miami, Florida",
				estimatedLodgingCostPerDay: 158,
				estimatedFlightCostPerPerson: 275,
				image:
					"https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1573&q=80",
				alt: "sand with palm trees and tall buildings in the background",
			},
		];
		destinations = new Destinations(destinationsData);
		tripsData = [
			{
				id: 1,
				userID: 4,
				destinationID: 49,
				travelers: 1,
				date: "2022/09/16",
				duration: 8,
				status: "approved",
				suggestedActivities: [],
			},
			{
				id: 2,
				userID: 4,
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
				userID: 3,
				destinationID: 14,
				travelers: 2,
				date: "2022/02/25",
				duration: 10,
				status: "pending",
				suggestedActivities: [],
			},
			{
				id: 5,
				userID: 4,
				destinationID: 29,
				travelers: 3,
				date: "2022/04/30",
				duration: 18,
				status: "pending",
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
				userID: 3,
				destinationID: 17,
				travelers: 5,
				date: "2022/05/28",
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
				userID: 19,
				destinationID: 19,
				travelers: 5,
				date: "2022/12/19",
				duration: 19,
				status: "approved",
				suggestedActivities: [],
			},
			{
				id: 10,
				userID: 19,
				destinationID: 50,
				travelers: 6,
				date: "2022/07/23",
				duration: 17,
				status: "approved",
				suggestedActivities: [],
			},
		];
		trips = new Trips(tripsData);
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
		userData = {
			id: 3,
			name: "Tiffy Grout",
			travelerType: "thrill-seeker",
		};

		user = new User(userData);
	});

	it("should be a function", function () {
		expect(Destinations).to.be.a("function");
	});

	it("should be an instance of Destinations", function () {
		expect(destinations).to.be.an.instanceof(Destinations);
	});

	it("should store all destination information", function () {
		expect(destinations.data).to.deep.equal(destinationsData);
	});

	it("should calculate how much a user's trip request would cost", function () {
		let request = user.createTripRequest(19, "2022/04/30", 6, 5, trips);
		expect(destinations.findTripCost(request)).to.equal(7392);
	});

	it("should calculate how much commission an agent would earn from a trip request", function () {
		let request = user.createTripRequest(19, "2022/04/30", 6, 5, trips);
		expect(destinations.findTripCost(request, "agent")).to.equal(672);
	});
});
