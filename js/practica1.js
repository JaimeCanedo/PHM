class Person {
    constructor(firstName, lastName, age, gender, interests) {
        this.name = {
            first: firstName,
            last: lastName
        };
        this.age = age;
        this.gender = gender;
        this.interests = interests;
        this.getName = function() { 
            return this.name.first +'' + this.name.last;
        };
        this.bio = function() { 
            return 'I am' + this.age + 'years old,' + this.gender +
            ', and I enjoy ' + this.interests[1]+ '.'
    };
    this.greeting = function() {
        alert('Hello, ' + this.name+ '!'); 
    };
    }
}

var person1 = new Person('Jaime', 'Cañedo', 22, 'Male', ['GYM','Skate','Trip']);
console.log(person1.bio()); // Outputs: Jaime Cañedo

var person1 = Object.create(person1);

class Professor extends Person { 
    teaches;

    constructor(first, last, teaches) {
        super(first, last, 45, 'female', ['math', 'physics'])
        this.teaches = teaches;
    }

    teachingBio() {
        return `I am a professor, my name is ${this.name.first}, teaching ${this.teaches}.`;
    }    
};

var person4 = new Professor('Miriam', 'Monroy', 35, 'Female');