// create new user 

export class CreateUser {
    userName: string;
    userEmail: string;
    userBirthDate: string;
    userPassword: string;
    userRole: string;

    constructor(userName: string, userEmail: string, userBirthDate: string, userPassword: string, userRole: string = "user") {
        this.userName = userName;
        this.userEmail = userEmail;
        this.userBirthDate = userBirthDate;
        this.userPassword = userPassword;
        this.userRole = userRole;
    }

    displayData(): void {
        console.log(`Name: ${this.userName}`);
        console.log(`Email: ${this.userEmail}`);
        console.log(`Date of Birth: ${this.userBirthDate}`);
        console.log(`Password: ${this.userPassword}`);
        console.log(`Role: ${this.userRole}`);
    }

    toPlainObject(): object {
        return {
            userName: this.userName,
            userEmail: this.userEmail,
            userBirthDate: this.userBirthDate,
            userPassword: this.userPassword,
            userRole: this.userRole
        };
    }
}

// Define Event interface
export interface Event {
    eventCategory: string;
    eventStatus: string;
    eventDate: string;
    eventDescription: string;
}

// Define User interface
export interface User {
    userEmail: string;
    userName: string;
    userBirthDate: string;
    events?: Event[];
}

// Create object for event
export class EventDetails {
    constructor(
        public eventName: string,
        public eventDate: string,
        public eventDescription: string,
        public eventStatus: string,
        public eventCategory: string
    ) {}

    displayData(): void {
        console.log(`Event Name: ${this.eventName}`);
        console.log(`Event Date: ${this.eventDate}`);
        console.log(`Event Description: ${this.eventDescription}`);
        console.log(`Event Status: ${this.eventStatus}`);
        console.log(`Event Category: ${this.eventCategory}`);
    }

    toPlainObject(): object {
        return {
            eventName: this.eventName,
            eventDate: this.eventDate,
            eventDescription: this.eventDescription,
            eventStatus: this.eventStatus,
            eventCategory: this.eventCategory
        };
    }
}

// Guest constructor
export class Guest {
    guestName: string;
    guestEmail: string;
    guestLocation: string;

    constructor(name: string, email: string, location: string) {
        this.guestName = name;
        this.guestEmail = email;
        this.guestLocation = location;
    }
}
