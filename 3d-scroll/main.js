// 3d scroll

const zSpacing = -1000;
let lastPosition = zSpacing / 5;
const frameNodes = document.getElementsByClassName("frame");
const frames = Array.from(frameNodes);
const zValues = [];

window.onscroll = () => {
  const top = document.documentElement.scrollTop;
  const delta = lastPosition - top;

  lastPosition = top;

  frames.forEach((item, index) => {
    zValues.push(index * zSpacing + zSpacing);
    zValues[index] += delta * -5.5;

    const frame = frameNodes[index];
    const transform = `translateZ(${zValues[index]}px)`;
    const opacity = zValues[index] < Math.abs(zSpacing) / 1.8 ? 1 : 0;
    frame.setAttribute("style", `transform:${transform}; opacity:${opacity}`);
  });
};

window.scrollTo(0, 1);

// audio

const button = document.querySelector(".soundButton");
const audio = document.querySelector(".audio");

button.addEventListener("click", (e) => {
  button.classList.toggle("paused");

  audio.paused ? audio.play() : audio.pause();
});

window.onfocus = () => {
  button.classList.contains("paused") ? audio.pause() : audio.play();
};

window.onblur = () => {
  audio.pause();
};
