var Request = require("request");

PROFESSOR_URL = "https://chatbot2018.azurewebsites.net/api/professors/";

const getProfessorService = (id, callback) => {
    return new Promise((resolve, reject) => {
        Request.get(`${PROFESSOR_URL}${id}`, {json:true}, (err,res,body) => {
            if(err){
                reject(err);
            }
            resolve(body);
        });
    });  
}

module.exports = getProfessorService;