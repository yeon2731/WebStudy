// Promise Syntax
let p = new Promise((resolve, reject) => {
  let a = 1 + 1;
  if (a == 2) {
    resolve("Success");
  } else {
    reject("Failed");
  }
});

p.then((message) => {
  console.log("This is in the then " + message);
}).catch((message) => {
  console.log("This is in the catch" + message);
});

// Callback?

// Callback 대신 promise
userLeft = true;
userWatchingCatMeme = true;

function watchTutorialPromise() {
  return new Promise((resolve, reject) => {
    if (userLeft) {
      reject({
        name: "User Left",
        message: "sad",
      });
    } else if (userWatchingCatMeme) {
      reject({
        name: "User Watching Cat Meme",
        message: "sad22",
      });
    } else {
      resolve("Subscribe");
    }
  });
}

watchTutorialPromise()
  .then((message) => {
    console.log("Success: " + message);
  })
  .catch((error) => {
    console.log(error.name + " " + error.message);
  });

// Promise Syntax 2
const action1 = new Promise((resolve, reject) => {
  resolve("Action 1");
});
const action2 = new Promise((resolve, reject) => {
  resolve("Action 2");
});
const action3 = new Promise((resolve, reject) => {
  resolve("Action 3");
});

Promise.all([action1, action2, action3]).then((messages) => {
  console.log(messages);
});
