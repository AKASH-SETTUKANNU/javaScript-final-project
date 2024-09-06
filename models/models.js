"use strict";
// create new user 
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guest = exports.EventDetails = exports.CreateUser = void 0;
var CreateUser = /** @class */ (function () {
    function CreateUser(userName, userEmail, userBirthDate, userPassword, userRole) {
        if (userRole === void 0) { userRole = "user"; }
        this.userName = userName;
        this.userEmail = userEmail;
        this.userBirthDate = userBirthDate;
        this.userPassword = userPassword;
        this.userRole = userRole;
    }
    CreateUser.prototype.displayData = function () {
        console.log("Name: ".concat(this.userName));
        console.log("Email: ".concat(this.userEmail));
        console.log("Date of Birth: ".concat(this.userBirthDate));
        console.log("Password: ".concat(this.userPassword));
        console.log("Role: ".concat(this.userRole));
    };
    CreateUser.prototype.toPlainObject = function () {
        return {
            userName: this.userName,
            userEmail: this.userEmail,
            userBirthDate: this.userBirthDate,
            userPassword: this.userPassword,
            userRole: this.userRole
        };
    };
    return CreateUser;
}());
exports.CreateUser = CreateUser;
// Create object for event
var EventDetails = /** @class */ (function () {
    function EventDetails(eventName, eventDate, eventDescription, eventStatus, eventCategory) {
        this.eventName = eventName;
        this.eventDate = eventDate;
        this.eventDescription = eventDescription;
        this.eventStatus = eventStatus;
        this.eventCategory = eventCategory;
    }
    EventDetails.prototype.displayData = function () {
        console.log("Event Name: ".concat(this.eventName));
        console.log("Event Date: ".concat(this.eventDate));
        console.log("Event Description: ".concat(this.eventDescription));
        console.log("Event Status: ".concat(this.eventStatus));
        console.log("Event Category: ".concat(this.eventCategory));
    };
    EventDetails.prototype.toPlainObject = function () {
        return {
            eventName: this.eventName,
            eventDate: this.eventDate,
            eventDescription: this.eventDescription,
            eventStatus: this.eventStatus,
            eventCategory: this.eventCategory
        };
    };
    return EventDetails;
}());
exports.EventDetails = EventDetails;
// Guest constructor
var Guest = /** @class */ (function () {
    function Guest(name, email, location) {
        this.guestName = name;
        this.guestEmail = email;
        this.guestLocation = location;
    }
    return Guest;
}());
exports.Guest = Guest;
