// var date = new Date();
// var months = ['Jan', 'Feb', 'Mar', 'Ap']

// console.log(date.getMonth());

var moment = require('moment');
var createdAt = 1234;
var date = moment(createdAt);
// console.log(date.format('MMM Do YYYY'));
console.log(date.format('HH:mm a'));