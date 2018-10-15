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
    pattern: '(office ?hours?)\\sof\\s?(d|D)?r?.?\\s\\b(?<professor>.+)\\b',
    intent: 'OfficeHours'
},{
    pattern: '(email ?id|email|email ?address)\\sof\\s?(d|D)?r?.?\\s\\b(?<professor>.+)\\b',
    intent: 'Email'
},{
    pattern: '(phone no.?|phone number|phone|contact|contact number|contact information)\\sof\\s?(d|D)?r?.?\\s\\b(?<professor>.+)\\b',
    intent: 'Phone'
},{
    pattern: '(office number|office no.?|office location|office)\\sof\\s?(d|D)?r?.?\\s\\b(?<professor>.+)\\b',
    intent: 'OfficeLocation'
},{
    pattern: '(name|title)\\sof\\s\\b(?<course>.+)\\b',
    intent: 'CourseName'
},{
    pattern: '(time?i?n?g?|duration|hours?|lab hours?|lab time?i?n?g?|class hours?)\\sof\\s\\b(?<course>.+)\\b',
    intent: 'CourseTime'
},{
    pattern: '(location|room number|room no.?|lab ?n?u?m?b?e?r?|class ?n?u?m?b?e?r?|class location)\\sof\\s\\b(?<course>.+)\\b',
    intent: 'ClassLocation'
},{
    pattern: '(units?|credits?)\\s(of|have|has)\\s\\b(?<course>.+)\\b',
    intent: 'CourseUnits'
},{
    pattern: '(instructor|faculty|professor|teacher)\\sof\\s\\b(?<course>.+)\\b',
    intent: 'CourseByProfessor'
},{
    pattern: '(teache?s?i?n?g?)\\s\\b(?<course>.+)\\b',
    intent: 'CourseByProfessor'
},{
    pattern: '(list of ?a?l?l?|all|all the|catalogu?e? of)\\s\\b(?<course>.+)\\b',
    intent: 'AllCourses'
},{
    pattern: '\\b(?<course>.+)\\b\\sare\\s?c?a?t?a?l?o?g?o?u?e?',
    intent: 'AllCourses'
},{
    pattern: '\\b(?<course>.+)\\b\\scatalogo?u?e?',
    intent: 'AllCourses'
},{
    pattern: '\\b(help|menu|info)\\b',
    intent: 'Help'
},{
    pattern: '\\b(sample questions?)\\b',
    intent: 'SampleQuestions'
},{
    pattern : '\\b(?<greeting>bye|see you)',
    intent : 'Exit'
}
];

module.exports = patternDict;