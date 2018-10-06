const HashMap = require('hashmap');

const getMapProfessor = function(){
    const map = new Map();

    map.set('Yu',1);
    map.set('Murphy',3);
    map.set('Concepcion',4);
    map.set('Gomez',6);
    map.set('Hou',7);
    map.set('Karant',8);
    map.set('Mendoza',9);
    map.set('Qiao',10);
    map.set('Sun',11);
    map.set('Turner',12);
    map.set('Voigt',13);
    map.set('Zemoudeh',14);
    map.set('Georgiou',15);  

    return map;
}

//var myMap = getMapProfessor();
//console.log(myMap.get('Yu'));
/*for(let [key, value] of myMap.entries()){
    console.log(key, value);
}*/
module.exports = getMapProfessor;


