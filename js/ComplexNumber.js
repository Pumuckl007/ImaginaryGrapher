"use strict";
class Number{
  constructor(real, imaginary){
    this.real = real;
    this.imaginary = imaginary;
  }

  clone(){
    return new Number(this.real, this.imaginary);
  }

  conjugate(){
    return new Number(this.real, -this.imaginary);
  }

  add(number){
    let sum = this.clone();
    sum.real += number.real;
    sum.imaginary += number.imaginary;
    return sum;
  }

  sub(number){
    let difference = this.clone();
    difference.real -= number.real;
    difference.imaginary -= number.imaginary;
    return difference;
  }

  multiply(number){
    let real = this.real * number.real - this.imaginary * number.imaginary;
    let imaginary = this.real * number.imaginary + this.imaginary * number.real;
    return new Number(real, imaginary);
  }

  divide(number){
    let conjugate = number.conjugate();
    let numerator = this.multiply(conjugate);
    let denominator = number.multiply(conjugate);
    return new Number(numerator.real/denominator.real, numerator.imaginary/denominator.real);
  }

  abs(number){
    return Math.sqrt(Math.pow(this.real,2) + Math.pow(this.imaginary, 2));
  }

  ln(){
    let real = Math.log(this.abs());
    let imaginary = Math.atan2(this.imaginary, this.real);
    return new Number(real, imaginary);
  }

  pow(number){
    if(this.imaginary != 0){
      let ln = this.ln();
      let power = number.multiply(ln);
      return new Number(Math.E, 0).pow(power);
    } else{
      let scalar = new Number(Math.pow(this.real, number.real), 0);
      let angle = (this.real === Math.E) ? number.imaginary : number.imaginary*Math.log(this.real);
      let imaginary = new Number(Math.cos(angle), Math.sin(angle));
      return scalar.multiply(imaginary);
    }
  }

  toString(){
    return this.real + (this.imaginary > 0 ? " + " : " - ") + Math.abs(this.imaginary) + "i";
  }
}
