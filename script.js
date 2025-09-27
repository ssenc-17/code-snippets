const textarea = document.getElementById("textarea");
const buttonDuck = document.getElementById("button-duck");
const buttonCat = document.getElementById("button-cat");

const duck = {
    name: "Duck",
    sound: "*quack*",
    hobbies: ["read", "swim"],
    makeSound: function() {
        textarea.value += this.name + " makes " + this.sound + "\n";
    },
    showHobbies: function () {
        this.hobbies.forEach((hobby) => {
            textarea.value += this.name + " likes to " + hobby + "\n";
        })
    }
};

// "this" depends on:
//    in traditional functions: where the function is CALLED
//    in arrow functions:       where the function is DEFINED

const cat = {
    name: "Cat",
    sound: "*meow*",
    hobbies: ["sleep", "eat"],
    makeSound: function() {
        textarea.value += this.name + " makes " + this.sound + "\n";
    }
};


class Animal {
    constructor(name, sound) {
        this.name = name;
        this.sound = sound;
    }

    makeSound() {
        textarea.value += this.name + " makes " + this.sound + "\n";
    }
}

const ooCat = new Animal("Cat", "*meow*");


test();

// hoisted
function test() {
    console.log("test");
}
// const test = () => {
//     console.log("test");
// }


buttonDuck.onclick = function() {
    console.log(this);
    duck.showHobbies();
}
buttonCat.onclick = () => {
    ooCat.makeSound();
}