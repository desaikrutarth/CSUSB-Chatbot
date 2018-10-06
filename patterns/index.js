const patternDict = [{
    pattern : '\\b(?<greeting>Hi|Hello|Hey)\\b',
    intent : 'Hello'
},{
    pattern: '\\b(How are you|How are you doing|How you doing)',
    intent: 'Greetings'
},{
    pattern: 'like\\sin\\s\\b(?<city>.+)',
    intent: 'CurrentWeather'
},{
    pattern: '\\b(?<professor>.+)\\slist',
    intent: 'AllProfessors'
},{
    pattern: '(office ?hours?)\\sof\\s?(d|D)?r?.?\\s\\b(?<professor>.+)',
    intent: 'OfficeHours'
},{
    pattern: '(email ?id|email|email ?address)\\sof\\s?(d|D)?r?.?\\s\\b(?<professor>.+)',
    intent: 'Email'
},{
    pattern: '(phone no.?|phone number|phone|contact|contact number|contact information)\\sof\\s?(d|D)?r?.?\\s\\b(?<professor>.+)',
    intent: 'Phone'
},{
    pattern: '(office number|office no.?|office location|office)\\sof\\s?(d|D)?r?.?\\s\\b(?<professor>.+)',
    intent: 'OfficeLocation'
},{
    pattern: '(name|title)\\sof\\s\\b(?<course>.+)',
    intent: 'CourseName'
},{
    pattern: '(time?i?n?g?|duration|hours?|lab hours?|lab time?i?n?g?|class hours?)\\sof\\s\\b(?<course>.+)',
    intent: 'CourseTime'
},{
    pattern: '(location|room number|room no.?|lab number|class number|class location)\\sof\\s\\b(?<course>.+)',
    intent: 'ClassLocation'
},{
    pattern: '(units?|credits?)\\s(of|have|has)\\s\\b(?<course>.+)',
    intent: 'CourseUnits'
},{
    pattern: '(teache?s?i?n?g?|instructor|faculty|professor)\\so?f?\\s?\\b(?<course>.+)',
    intent: 'CourseByProfessor'
},{
    pattern : '\\b(bye|exit)\\b',
    intent : 'Exit'
},{
    pattern: '(list of ?a?l?l?|all|all the|catalogu?e? of)\\s\\b(?<course>.+)',
    intent: 'AllCourses'
},{
    pattern: '\\b(?<course>.+)\\sare\\s?c?a?t?a?l?o?g?o?u?e?',
    intent: 'AllCourses'
},{
    pattern: '\\b(?<course>.+)\\scatalogo?u?e?',
    intent: 'AllCourses'
}
];

module.exports = patternDict;