const clock = document.querySelector("h2#clock");

function getClock() {
  const date = new Date();
  clock.innerText = `${date.getHours()}:${date.getMinutes()}:${String(
    date.getSeconds()
  ).padStart(2, "0")}`;
}

getClock();
setInterval(getClock, 1000);
