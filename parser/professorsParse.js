let officeHr = response => {
    if(response.lname){
        return `Office hours of Dr. ${response.lname} are ${response.officeHours}.`
    }
}

let emailId = response => {
    if(response.lname){
        return `Email of Dr. ${response.lname} is ${response.email}.`
    }
}

let phoneNo = response => {
    if(response.lname){
        return `Phone number of Dr. ${response.lname} is ${response.phone}.`
    }
}

let officeLocation = response => {
    if(response.lname){
        return `Office location of Dr. ${response.lname} is ${response.location}.`
    }
}

let allProfessors = response => {
    console.log("Here is the faculty list: ");
    for(let i = 0; i<response.length; i++) {
        if(response[i].lname){
            console.log( `${response[i].fname} ${response[i].lname},`);
        }
    }
}

module.exports = {
    officeHr,
    emailId,
    phoneNo,
    officeLocation,
    allProfessors
};
