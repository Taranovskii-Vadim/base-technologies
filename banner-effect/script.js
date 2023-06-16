const dot = document.querySelector(".dot");
const sec = document.querySelector(".sec");

const onClickListener = (e) => {
  dot.classList.toggle("active");
  sec.classList.toggle("active");
};

const mouseMoveListener = (e) => {
  dot.style.left = e.pageX + "px";
  dot.style.top = e.pageY + "px";
};

document.addEventListener("mousemove", mouseMoveListener);
document.addEventListener("click", onClickListener);
