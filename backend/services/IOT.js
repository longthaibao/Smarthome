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

}