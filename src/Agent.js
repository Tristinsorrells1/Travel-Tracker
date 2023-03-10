import User from "../src/User";

class Agent {
  constructor(travelersInfo, tripsInfo) {
    this.travelersInfo = travelersInfo;
    this.tripsInfo = tripsInfo;
  }

  findUserByName(name) {
    let foundUser = this.travelersInfo.find((userInfo) => {
      return (
        userInfo.name.trim().toLowerCase() === name.trim().toLowerCase()
      );
    });
    if (!foundUser) {
      return `No Travelers by the name of ${name} found`;
    }
    return new User(foundUser);
  }

  findUsersOnATripToday(week) {
    let date = new Date(week);
    let usersOnTrips = [];
    this.tripsInfo.forEach((trip) => {
      let startDate = new Date(trip.date);
      let endDate = new Date(startDate.getTime() + trip.duration * 86400000);
      if (
        date.getTime() >= startDate.getTime() &&
        date.getTime() <= endDate.getTime()
      ) {
        usersOnTrips.push(trip);
      }
    });
    if (usersOnTrips.length === 0) {
      return `There are no users currently on a trip`;
    }
    return usersOnTrips;
  }
}

export default Agent;
