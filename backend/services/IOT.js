const IOT = require("../models/IOT");

module.exports = class IOTService{

    static async lastAuthorizationIOT(data){
        try {  
            const lastIOT =  await IOT.find().sort({date: -1}).limit(1);
            return lastIOT[0] ? lastIOT[0] : [];
        } catch (error) {
            console.log(error)
        }
    }

    static async changeDoorState(adminId, doorState) {
	// if 'open' is truthy, open the door
	// otherwise, close the door
	try {
	    const doorFeed = await this.getFeedNameFromAdminId(adminId);

	    const username = process.env.ADAFRUIT_USERNAME;
	    const feedKey = process.env.ADAFRUIT_KEY;

	    const url = await this.getAdafruitFeedUrl(username, doorFeed);

	    const data = new FormData();
	    data.append("value", doorState);

	    let response = await fetch(`${url}/data`, {
		method: "POST",
		headers: {
		    "X-AIO-Key": process.env.ADAFRUIT_KEY
		},
		body: data
	    });
	} catch (err) {
	    console.log(err);
	}
    }

    static async getFeedNameFromAdminId(id) {
	if (process.env.ADAFRUIT_TEST === "true") {
	    return process.env.ADAFRUIT_MOCK_DOOR_FEED;
	}

	return id + "-door";
    }

    static async getAdafruitFeedUrl(username, feedName) {
	return `https://io.adafruit.com/api/v2/${username}/feeds/${feedName}`
    }
}
