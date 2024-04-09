const admin = require("../models/member");

module.exports = class memberService{
    static async creatmember(data){
        try {
            const newmember = {
                name: data.name,  
                image: data.image,
                sex: data.sex,
                relationship: data.relationship,
                age : data.age,
                dateStart: data.dateStart,
                dateEnd: data.dateEnd,
                active: []
            }
            console.log(newmember)
           const response = await new member(newmember).save();
           return response;
        } catch (error) {
            console.log(error);
        } 
    }

    static async listAllmember(data){
        try {
            const allmember = await member.find();
            return allmember;
        } catch (error) {
            console.log(error);
        } 
    }

    static async deletemember(Id){
        try {
            const deletedResponse = await member.findByIdAndDelete(Id);
            return deletedResponse;
        } catch (error) {
            console.log(error);
        }
    }

    static async updatemember(Id, dateEnd) {
        try {
            const updateResponse =  await member.findByIdAndUpdate({_id:Id},{dateEnd: dateEnd});
            return updateResponse;
        } catch (error) {
            console.log(error);
        }
    }
}