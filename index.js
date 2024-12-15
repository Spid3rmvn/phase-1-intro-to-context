function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(employeeDataArray) {
    return employeeDataArray.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employeeRecord, dateTimeString) {
    const hour = dateTimeString.substring(11, 13);
    const minute = dateTimeString.substring(14, 16);
    const timeInEvent = {
      type: "TimeIn",
      date: dateTimeString.substring(0, 10),
      hour: hour + minute,
    };
    if (hour.length === 1) {
      timeInEvent.hour = '0' + hour + minute;
    }
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, dateTimeString) {
    const hour = dateTimeString.substring(11, 13);
    const minute = dateTimeString.substring(14, 16);
    const timeOutEvent = {
      type: "TimeOut",
      date: dateTimeString.substring(0, 10),
      hour: hour + minute,
    };
    if (hour.length === 1) {
      timeOutEvent.hour = '0' + hour + minute;
    }
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    if (timeInEvent && timeOutEvent) {
      const timeInHour = parseInt(timeInEvent.hour.substring(0, 2));
      const timeInMinute = parseInt(timeInEvent.hour.substring(2, 4));
      const timeOutHour = parseInt(timeOutEvent.hour.substring(0, 2));
      const timeOutMinute = parseInt(timeOutEvent.hour.substring(2, 4));
      const hoursWorked = (timeOutHour - timeInHour) + (timeOutMinute - timeInMinute) / 60;
      return hoursWorked;
    } else {
      return 0;
    }
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  }
  
  function allWagesFor(employeeRecord) {
    const wages = employeeRecord.timeInEvents.map(timeInEvent => {
      const date = timeInEvent.date;
      return wagesEarnedOnDate(employeeRecord, date);
    });
    return wages.reduce((a, b) => a + b, 0);
  }
  
  function calculatePayroll(employeeRecords) {
    const payroll = employeeRecords.map(allWagesFor);
    return payroll.reduce((a, b) => a + b, 0);
  }
  
  // Example usage:
  const employeeDataArray = [
    ["John", "Doe", "Developer", "15.00"],
    ["Jane", "Smith", "Designer", "18.00"],
  ];
  
  const employeeRecords = createEmployeeRecords(employeeDataArray);
  
  const dateTimeString1 = "2022-01-01T14:00:00";
  const dateTimeString2 = "2022-01-01T17:00:00";
  
  const employeeRecord1 = createTimeInEvent(employeeRecords[0], dateTimeString1);
  const employeeRecord2 = createTimeOutEvent(employeeRecord1, dateTimeString2);
  
  const dateTimeString3 = "2022-01-02T09:00:00";
  const dateTimeString4 = "2022-01-02T17:00:00";
  
  const employeeRecord3 = createTimeInEvent(employeeRecords[1], dateTimeString3);
  const employeeRecord4 = createTimeOutEvent(employeeRecord3, dateTimeString4);
  
  const totalPayroll = calculatePayroll(employeeRecords);
  console.log(totalPayroll);