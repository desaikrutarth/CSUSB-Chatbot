'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const FBeamer = require('./fbeamer');

const matcher = require('./matcher');
//Get APIs
const weather = require('./weather');
const professorApi = require('./api/professorApi');
const courseApi = require('./api/courseApi');
const professorAll = require('./api/professorAllApi');
const courseAll = require('./api/courseAllApi');
//Weather Parser
const {currentWeather} = require('./parser');
//Professor Parser
const {officeHr} = require('./parser/professorsParse');
const {emailId} = require('./parser/professorsParse');
const {phoneNo} = require('./parser/professorsParse');
const {officeLocation} = require('./parser/professorsParse');
const {allProfessors} = require('./parser/professorsParse');
//Course Parser
const {courseTitle} = require('./parser/courseParse');
const {courseTime} = require('./parser/courseParse');
const {classLocation} = require('./parser/courseParse');
const {courseUnits} = require('./parser/courseParse');
const {courseByProfessor} = require('./parser/courseParse');

const server = express();
const PORT = process.env.PORT || 3000;
const f = new FBeamer(config.fb);

server.get('/', (req, res) => f.registerHook(req,res));
server.post('/', bodyParser.json({
    verify: f.verifySignature
}));

const getMapProfessor = function(){
    const map = new Map();

    map.set('yu',1);
    map.set('murphy',3);
    map.set('concepcion',4);
    map.set('gomez',6);
    map.set('hou',7);
    map.set('karant',8);
    map.set('mendoza',9);
    map.set('qiao',10);
    map.set('sun',11);
    map.set('turner',12);
    map.set('voigt',13);
    map.set('zemoudeh',14);
    map.set('georgiou',15);  

    return map;
}
let mapProfessor = getMapProfessor();

const getMapCourses = function(){
    const map = new Map();

    map.set('cse201', 3);
    map.set('cse202', 6);
    map.set('cse202 02', 7);
    map.set('cse310', 11);
    map.set('cse310 02', 12);
    map.set('cse313', 15);
    map.set('cse313 02', 16);
    map.set('cse330', 18);
    map.set('cse330 02', 19);
    map.set('cse401', 22);
    map.set('cse401 02', 23);
    map.set('cse408', 25);
    map.set('cse408 02', 26);
    map.set('cse431', 27);
    map.set('cse441', 28);
    map.set('cse441 02', 29);
    map.set('cse456', 30);
    map.set('cse456 02', 31);
    map.set('cse460', 32);
    map.set('cse461', 34);
    map.set('cse461 02', 35);
    map.set('cse488', 37);
    map.set('cse489', 38);
    map.set('cse541', 39);
    map.set('cse541 02', 40);
    map.set('cse570', 41);
    map.set('cse570 02', 42);
    map.set('cse630', 45);
    map.set('cse655', 46);
    map.set('cse655 02', 47);
    map.set('cse660', 48);
    map.set('cse660 02', 49); 

    return map;
}
let mapCourse = getMapCourses();

server.post('/', (req, res, next) => {
    return f.incoming(req, res, data => {
        try{
            if(data.type === 'text'){
                matcher(data.content, async resp => {
                    switch(resp.intent){
                        case 'Hello':
                            await f.txt(data.sender, `${resp.entities.greeting} there! How can I help you?`);
                            break;
                        case 'Greetings':
                            await f.txt(data.sender, 'I am doing great! How can I help you today?');
                            break;
                        case 'CurrentWeather':
                            await f.txt(data.sender, 'Let me check...');
                            let weatherData = await weather(resp.entities.city, 'current');
                            let cwResult = currentWeather(weatherData);
                            await f.txt(data.sender, cwResult);
                            break;
                         //Show Professors:
                        case 'AllProfessors':
                            await f.txt(data.sender, 'Here is the faculty list:');
                            let response = await professorAll(resp.entities.professor); 
                            for(let i = 0; i<response.length; i++) {
                                if(response[i].lname){
                                    await f.txt(data.sender, response[i].fname +' '+ response[i].lname);
                                }
                            }
                            break;
                        case 'OfficeHours':
                            await f.txt(data.sender, 'Let me check...');
                            let cwData1 = await professorApi(mapProfessor.get((resp.entities.professor).toLowerCase()));
                            let office = officeHr(cwData1);
                            await f.txt(data.sender, office);
                            break;
                        case 'Email':
                            await f.txt(data.sender, 'Let me check...');
                            let cwData2 = await professorApi(mapProfessor.get((resp.entities.professor).toLowerCase()));
                            let email = emailId(cwData2);
                            await f.txt(data.sender, email);
                            break;
                        case 'Phone':
                            await f.txt(data.sender, 'Let me check...');
                            let cwData3 = await professorApi(mapProfessor.get((resp.entities.professor).toLowerCase()));
                            let phone = phoneNo(cwData3);
                            await f.txt(data.sender, phone);
                            break;
                        case 'OfficeLocation':
                            await f.txt(data.sender, 'Let me check...');
                            let cwData4 = await professorApi(mapProfessor.get((resp.entities.professor).toLowerCase()));
                            let loc = officeLocation(cwData4);
                            await f.txt(data.sender, loc);
                            break;
                        // Show Courses:
                        case 'AllCourses':
                            await f.txt(data.sender, 'Here is the coutrse catalog:');
                            let courses = await courseAll(resp.entities.course); 
                            for(let i = 0; i<courses.length; i++) {
                                if(courses[i].id){
                                    await f.txt(data.sender, courses[i].number +' '+ courses[i].name+' by '+courses[i].professors.fname+' '+courses[i].professors.lname);
                                }
                            }
                            break;
                        case 'CourseName':
                            await f.txt(data.sender, 'Let me check...');
                            let courseData1 = await courseApi(mapCourse.get((resp.entities.course).replace(/\s+/, "").toLowerCase()));
                            let title = courseTitle(courseData1);
                            await f.txt(data.sender, title);
                            break;
                        case 'CourseTime':
                            await f.txt(data.sender, 'Let me check...');
                            let courseData2 = await courseApi(mapCourse.get((resp.entities.course).replace(/\s+/, "").toLowerCase()));
                            let time = courseTime(courseData2);
                            await f.txt(data.sender, time);
                            break;
                        case 'ClassLocation':
                            await f.txt(data.sender, 'Let me check...');
                            let courseData3 = await courseApi(mapCourse.get((resp.entities.course).replace(/\s+/, "").toLowerCase()));
                            let location = classLocation(courseData3);
                            await f.txt(data.sender, location);
                            break;
                        case 'CourseUnits':
                            await f.txt(data.sender, 'Let me check...');
                            let courseData4 = await courseApi(mapCourse.get((resp.entities.course).replace(/\s+/, "").toLowerCase()));
                            let units = courseUnits(courseData4);
                            await f.txt(data.sender, units);
                            break;
                        case 'CourseByProfessor':
                            await f.txt(data.sender, 'Let me check...');
                            let courseData5 = await courseApi(mapCourse.get((resp.entities.course).replace(/\s+/, "").toLowerCase()));
                            let course = courseByProfessor(courseData5);
                            await f.txt(data.sender, course);
                            break;
                        default: {
                            await f.txt(data.sender, "I don't know what you mean :(");
                        }
                    }
                });
            }
        } catch(e){
            console.log(e);
        }
    });
});  
server.listen(PORT, () => console.log(`CSUSB ChatBot Service running on Port ${PORT}`));