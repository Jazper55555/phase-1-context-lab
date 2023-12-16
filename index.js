/* Create function w/ 4 arguments
Create a newObject w/ 6 keys
Initialize empty arrays for last 2 keys (time in/out)
*/
function createEmployeeRecord(array) {
    let newEmployee = {};
    newEmployee.firstName = array[0];
    newEmployee.familyName = array[1];
    newEmployee.title = array[2];
    newEmployee.payPerHour = array[3];
    newEmployee.timeInEvents = [];
    newEmployee.timeOutEvents = [];
    return newEmployee;
  }

/* Create function w/ array as argument
Create newArray that houses nested arrays from newEmployee into a new array
*/
function createEmployeeRecords(collection) {
    let employeeRecords = []
    collection.forEach((array) => {
        let employeeRecord = createEmployeeRecord(array)
        employeeRecords.push(employeeRecord)
    })
    return employeeRecords
}

// function createEmployeeRecords(arrayOfArrays) {
//     let employeeRecords = [];
//     arrayOfObjects.forEach((object) => {
//       let employeeRecord = createEmployeeRecord(Object.values(object));
//       employeeRecords.push(employeeRecord);
//     });
//     return employeeRecords;
//   }

/* Create function w/ 2 arguments
Add object w/ 3 keys to the timeIn array
*/
function createTimeInEvent(dateStamp) {
    const hour = parseInt(dateStamp.substring(11, 15))
    const date = dateStamp.substring(0, 10)
    let timeInEvent = {
        type: 'TimeIn',
        hour: hour,
        date: date
    }
    this.timeInEvents.push(timeInEvent)
    return this
}

function createTimeOutEvent(dateStamp) {
    const hour = parseInt(dateStamp.substring(11, 15))
    const date = dateStamp.substring(0, 10)
    let timeOutEvent = {
        type: 'TimeOut',
        hour: hour,
        date: date
    }
    this.timeOutEvents.push(timeOutEvent)
    return this
}

function hoursWorkedOnDate(dateStamp) {
    const date = dateStamp.substring(0, 10)
    let timeInHours = this.timeInEvents.find(event => event.date === date)
    let timeOutHours = this.timeOutEvents.find(event => event.date === date)
    let hoursWorked = (timeOutHours.hour - timeInHours.hour) / 100
    return hoursWorked
}

function wagesEarnedOnDate(dateStamp) {
    let hoursWorked = hoursWorkedOnDate.call(this, dateStamp);
    let payRate = this.payPerHour;
    let payOwed = hoursWorked * payRate;
    console.log(payOwed);
    return payOwed;
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find((record) => record.firstName === firstNameString)
}

console.log(loki.familyName)

function calculatePayroll(employeeRecords) {
    let totalPay = 0
    employeeRecords.forEach((employeeRecord) => {
        totalPay += allWagesFor.call(employeeRecord)
    })
    return totalPay
    // const datesWorked = wagesEarnedOnDate(employeeRecord, dateStamp)
    // const employeeRecords = createEmployeeRecords(arrayOfArrays)
    // // const wagesForEmployees = employeeRecords.map(allWagesFor); // Calculate wages for each employee
    // // const totalPayroll = wagesForEmployees.reduce((total, wages) => total + wages, 0); // Sum up all wages
    // return totalPayroll
}

// function allWagesFor(employeeRecord) {
//     const dates = employeeRecord.timeInEvents.map(event => event.date)
//     const wagesForDates = dates.map(date => wagesEarnedOnDate(employeeRecord, date));

//     const totalWages = wagesForDates.reduce((total, wages) => total + wages, 0);
  
//     return totalWages;
// }

// let Luca = createEmployeeRecord(['Luca', 'Saldana', 'Boi', 55])
// createTimeInEvent(Luca, "0044-03-15 0900")
// createTimeOutEvent(Luca, "0044-03-15 1100")
// allWagesFor(Luca)

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */



