class car {
    constructor(name, speed, price){
        this.name = name;
        this.speed = speed;
        this.price  =price;
    }
    //methods
    getDetails() {
        console.log(`Car is ${this.name} with speed ${this.speed} and price ${this.price}`)
    }

    setDetails(prop, value) {
        this[prop]  = value;
        console.log(`${prop} of ${this.name} changed to ${value}`);
    }
}

let swift = new car("Swift",200,"5L");
swift.getDetails();
swift.setDetails("")