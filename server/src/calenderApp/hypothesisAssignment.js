var myArgs = process.argv.slice(2);

var parse = function(val){
    // add validation for
    //1. input dates are in correct format like dd/mm/yyyy
    //2. date formats are in range between 01/01/1901 and 31/12/2999. The logic is based on taking a
    // base date of 01/01/1900. there is a chance that it can have error for dates between 1900 and 1901. so
    // this validation is essential
    //3. end date is after start date
    //4. program can be made interactive with process.stdin
};
myArgs.forEach((val) =>{
    parse(val);
})

var calculateNoOfDaysFromBaseDate = function(dateArray){
    var startNoOfYears = dateArray[2];
    var startNoOfMonths =   dateArray[1];
    var StartNoOfDays =  dateArray[0];

    var baseStartDay =01, baseStartMonth=01,baseStartYear =1900;
    var finalStartNoOfDays =0;
    var yearDiffWithBaseYear = startNoOfYears - baseStartYear;
    finalStartNoOfDays = yearDiffWithBaseYear * 365;
    finalStartNoOfDays = finalStartNoOfDays + Math.floor(yearDiffWithBaseYear / 4);

    var monthsDiffWithBaseMonth = startNoOfMonths - baseStartMonth;

    switch(monthsDiffWithBaseMonth){
        case 1:
            finalStartNoOfDays = finalStartNoOfDays + 31;
            break;
        case 2:
            finalStartNoOfDays = finalStartNoOfDays + 31 + 28;
            break;
        case 3:
            finalStartNoOfDays = finalStartNoOfDays + 31 + 28 +31;
            break;
        case 4:
            finalStartNoOfDays = finalStartNoOfDays + 31 + 28 +31 + 30;
            break;
        case 5:
            finalStartNoOfDays = finalStartNoOfDays + 31 + 28 +31 + 30+31;
            break;
        case 6:
            finalStartNoOfDays = finalStartNoOfDays + 31 + 28 +31 + 30 + 31 +30;
            break;
        case 7:
            finalStartNoOfDays = finalStartNoOfDays + 31 + 28 +31 + 30 + 31 +30 + 31;
            break;
        case 8:
            finalStartNoOfDays = finalStartNoOfDays + 31 + 28 +31 + 30 + 31 +30 + 31 +31;
            break;
        case 9:
            finalStartNoOfDays = finalStartNoOfDays + 31 + 28 +31 + 30 + 31 +30 + 31 +31 +30;
            break;
        case 10:
            finalStartNoOfDays = finalStartNoOfDays + 31 + 28 +31 + 30 + 31 +30 + 31 +31 +30 + 31;
            break;
        case 11:
            finalStartNoOfDays = finalStartNoOfDays + 31 + 28 +31 + 30 + 31 +30 + 31 +31 +30 + 31 +30;
            break;
    }

    var monthsDiffWithBaseDays = StartNoOfDays - baseStartDay;

    finalStartNoOfDays = finalStartNoOfDays + monthsDiffWithBaseDays;

    // correct if a specific target day is 29 feb of a leap year
    if((startNoOfYears % 4) == 0 && (startNoOfMonths > 2 ))
        finalStartNoOfDays++;

    return finalStartNoOfDays;
}
var enddatearray = myArgs[1].split('/');
var endDaysFromBaseDate = calculateNoOfDaysFromBaseDate(enddatearray);

var startDateArray = myArgs[0].split('/');
var startDaysFromBaseDate = calculateNoOfDaysFromBaseDate(startDateArray);

var finalDatesInBetween = endDaysFromBaseDate - startDaysFromBaseDate;

// decrease by 1 for days in between
finalDatesInBetween--;

console.log( "finalDatesInBetween = "+finalDatesInBetween);
