const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

// CSS background-image로 설정하여 cover 속성이 제대로 작동하도록 함
document.body.style.backgroundImage = `url('img/${chosenImage}')`;
