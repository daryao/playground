var square = (x) => {
  var result = x*x;
  return result;
};

var square2 = x => x*x;
//one arg do not need parentheses

console.log(square(3));
console.log(square2(3));
console.log(this);
var user = {
  name: 'Egwene',
  sayHi: () => {
    console.log(arguments);
    console.log(`Hi. I'm ${this.name}`);
  },
  sayHiAlt () {
    console.log(arguments);
    console.log(`Hi. I'm ${this.name}`);
  }
};

user.sayHi();
user.sayHi(1,2,3);
user.sayHiAlt();
user.sayHiAlt(1,2,3);
