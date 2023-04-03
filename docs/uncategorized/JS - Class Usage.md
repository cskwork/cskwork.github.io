---
title: "JS - Class Usage"
description: "https&#x3A;//www.tabnine.com/academy/javascript/how-to-use-classes-in-javascript/"
date: 2022-03-24T02:15:55.662Z
tags: []
---
## Create Basic Class
```js
class Car {
    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
    }
  	drive() {
        return this.brand + ' ' + this.model + ' is driving...'
    }
    // Only accessed by class name
    static stop() {
        return 'Car stopped'
    }
  
  	set type(x) {
        this.model = x;
    }
    get type() {
        return this.model;
    }
}
```
## Make & Run Instance
```js
const car1 = new Car('Toyota', 'Yaris');

console.log(car1);
// Expected output: 
// Car {brand: "Toyota", model: "Yaris"}

console.log(car1.drive());
// Expected output:
// Toyota Yaris is driving...

console.log(Car.stop());
// Expected output: Car stopped

console.log(car1.stop());
// Expected output:
Uncaught TypeError: car1.stop is not a function

car1.type = 'Prius';        // type serves as a setter
console.log(car1.type);        // type serves as a getter
// Expected output: Prius
```

## Class Inheritance
```js
class EvCar extends Car {
    constructor(brand, model, requireGas) {
        super(brand, model)
        this.requireGas = false
    }
}
```

## Usage
``` js
const car2 = new EvCar('VW', 'e-Up');
console.log(car2);
// Expected output: 
// EvCar {brand: "VW", model: "e-Up", requireGas: false}

console.log(car2.type);
// Expected output: e-Up
console.log(car2.drive());
// Expected output: VW e-Up is driving...
```
## 출처
https://www.tabnine.com/academy/javascript/how-to-use-classes-in-javascript/
