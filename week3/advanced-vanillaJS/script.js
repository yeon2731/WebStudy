export default class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

export function pN(user) {
  console.log(user.age);
}
