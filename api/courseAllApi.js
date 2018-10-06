var Request = require("request");

COURSE_URL = "https://chatbot2018.azurewebsites.net/api/courses/";

const getAllCourseService = (id, callback) => {
    return new Promise((resolve, reject) => {
        Request.get(`${COURSE_URL}`, {json:true}, (err,res,body) => {
            if(err){
                reject(err);
            }
            resolve(body);
        });
    });  
}

module.exports = getAllCourseService;