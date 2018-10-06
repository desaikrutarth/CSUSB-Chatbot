let courseTitle = response => {
    if(response.id){
        let course = response.number;
        return `The title of ${course.trim()} is ${response.name}.`
    }
}

let courseTime = response => {
    if(response.id){
        let courseId = response.number;
        return `Hours of ${courseId.trim()} are ${response.time}.`
    }
}

let classLocation = response => {
    if(response.id){
        let courseNo = response.number;
        return `The class location of ${courseNo.trim()} is ${response.location}.`
    }
}

let courseUnits = response => {
    if(response.id){
        let units = response.noOfUnits;
        return `Total number of units are ${units.toString()}.`
    }
}

let courseByProfessor = response => {
    if(response.id){
        let courseName = response.number.trim();
        return `Instructor of ${courseName} is ${response.professors.fname} ${response.professors.lname}`
    }
}

module.exports = { 
    courseTitle,
    courseTime,
    classLocation,
    courseUnits,
    courseByProfessor
};