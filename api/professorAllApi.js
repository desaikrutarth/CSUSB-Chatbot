var Request = require("request");

PROFESSOR_ALL_URL = "https://chatbot2018.azurewebsites.net/api/professors";

const getProfessorAllService = (id, callback) => {
    return new Promise((resolve, reject) => {
        Request.get(`${PROFESSOR_ALL_URL}`, {json:true}, (err,res,body) => {
            if(err){
                reject(err);
            }
            resolve(body);
        });
    });
}

module.exports = getProfessorAllService;