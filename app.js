'use strict';

const Readline = require('readline');
const rl = Readline.createInterface({
    input : process.stdin,
    output : process.stdout,
    terminal: false
});
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
//const mapProfessor = require('./map/professorMap');

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
let mapCourses = getMapCourses();

rl.setPrompt('> ');
rl.prompt();
rl.on('line', reply => {
    matcher(reply, data => {
        switch(data.intent){
            //Greetings
            case 'Hello':
                console.log(`${data.entities.greeting} Krutarth! How can I help you?`);
                rl.prompt();
                break;
            case 'Greetings':
                console.log(`I am doing great! How can I help you today?`);
                rl.prompt();
                break;
            //Show Weather
            case 'CurrentWeather':
                //console.log(`checking weather for ${data.entities.city}...`);
                weather(data.entities.city, 'current')
                    .then(response => {
                        let parseResult = currentWeather(response);
                        console.log(parseResult);
                        rl.prompt();
                     })
                     .catch(error => {
                         console.log("It seems to be a problem");
                         rl.prompt();
                     });
                break;
            //Show Professors :
            case 'AllProfessors':
                professorAll(data.entities.professor)
                    .then(response => {
                        allProfessors(response);
                        rl.prompt();
                    })
                    .catch(error => {
                        console.log("It seems to be a problem");
                        rl.prompt();
                    });
                break;
            case 'OfficeHours':
                professorApi(mapProfessor.get((data.entities.professor).toLowerCase()))
                    .then(response => {
                        let parseResult = officeHr(response);
                        console.log(parseResult);
                        rl.prompt();
                     })
                     .catch(error => {
                         console.log("It seems to be a problem");
                         rl.prompt();
                     });
                break;
            case 'Email':
                professorApi(mapProfessor.get((data.entities.professor).toLowerCase()))
                     .then(response => {
                         let parseResult = emailId(response);
                         console.log(parseResult);
                         rl.prompt();
                      })
                      .catch(error => {
                          console.log("It seems to be a problem");
                          rl.prompt();
                      });
                 break;
            case 'Phone':
                professorApi(mapProfessor.get((data.entities.professor).toLowerCase()))
                      .then(response => {
                          let parseResult = phoneNo(response);
                          console.log(parseResult);
                          rl.prompt();
                       })
                       .catch(error => {
                           console.log("It seems to be a problem");
                           rl.prompt();
                       });
                  break;
            case 'OfficeLocation':
                professorApi(mapProfessor.get((data.entities.professor).toLowerCase()))
                       .then(response => {
                           let parseResult = officeLocation(response);
                           console.log(parseResult);
                           rl.prompt();
                        })
                        .catch(error => {
                            console.log("It seems to be a problem");
                            rl.prompt();
                        });
                   break;  
            // Show Courses:
            case 'AllCourses':
                courseAll(mapCourses.get((data.entities.course).toLowerCase()))
                    .then(response => {
                        console.log("Here is the course list: ")
                        for(let i = 0; i<response.length; i++) {
                            if(response[i].id){
                                console.log( `Course name: ${response[i].number.trim()}   Title: ${response[i].name.trim()}     By Instructor: ${response[i].professors.fname.trim()}  ${response[i].professors.lname.trim()},`);
                            }
                        }
                        rl.prompt();
                    })
                    .catch(error => {
                        console.log("It seems to be a problem");
                        rl.prompt();
                    });
                break;
            case 'CourseName':
                courseApi(mapCourses.get((data.entities.course).replace(/\s+/, "").toLowerCase()))
                       .then(response => {
                           let parseResult = courseTitle(response);
                           console.log(parseResult);
                           rl.prompt();
                        })
                        .catch(error => {
                            console.log("It seems to be a problem");
                            rl.prompt();
                        });
                   break;  
            case 'CourseTime':
                courseApi(mapCourses.get((data.entities.course).replace(/\s+/, "").toLowerCase()))
                        .then(response => {
                            let parseResult = courseTime(response);
                             console.log(parseResult);
                             rl.prompt();
                          })
                        .catch(error => {
                            console.log("It seems to be a problem");
                            rl.prompt();
                        });
                    break;  
            case 'ClassLocation':
                    courseApi(mapCourses.get((data.entities.course).replace(/\s+/, "").toLowerCase()))
                            .then(response => {
                                let parseResult = classLocation(response);
                                 console.log(parseResult);
                                 rl.prompt();
                              })
                            .catch(error => {
                                console.log("It seems to be a problem");
                                rl.prompt();
                            });
                    break;  
            case 'CourseUnits':
                    courseApi(mapCourses.get((data.entities.course).replace(/\s+/, "").toLowerCase()))
                            .then(response => {
                                let parseResult = courseUnits(response);
                                 console.log(parseResult);
                                 rl.prompt();
                              })
                            .catch(error => {
                                console.log("It seems to be a problem");
                                rl.prompt();
                            });
                    break;  
            case 'CourseByProfessor':
                    courseApi(mapCourses.get((data.entities.course).replace(/\s+/, "").toLowerCase()))
                            .then(response => {
                                let parseResult = courseByProfessor(response);
                                 console.log(parseResult);
                                 rl.prompt();
                              })
                            .catch(error => {
                                console.log("It seems to be a problem");
                                rl.prompt();
                            });
                    break; 
            case 'Help':
                    console.log(`This is the personal assistant bot for CSUSB. This bot serves you informations about courses and professors of Computer Science and Engineering department only. Please type "Sample Questions" for more idea.`);
                    rl.prompt();
                    break; 
            case 'SampleQuestions':
                    console.log(`You may ask "Who is the instructor of cse 202?"  "May I know office hours of Dr. Yu?"  You may ask questions about professors(by last name) to check their office hours, email, phone, office location. You may ask questions about computer science courses to check course title, class location, class/lab hours or timing, no. of units and course instructor. You may type "Faculty List" or "Course Catalog" to get more details about faculties and courses.`);
                    rl.prompt();
                    break; 
            case 'Exit':
                console.log(`${data.entities.greeting} Krutarth`);
                console.log("Have a great day :)");
                rl.prompt();
                break;
            default: {
                console.log(`I don't know what do you mean. Type "Help" for more help.`);
                rl.prompt();
            }
        }
    });
});