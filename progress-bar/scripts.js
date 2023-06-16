"use sctrict";
class ProgressBar {
  constructor(option = {}) {
    const {
      start = 10,
      end = 100,
      background = "green",
      height = 20,
      textColor = "white",
      border = `1px solid black`
    } = option;

    this.start = start;
    this.end = end;
    this.background = background;
    this.height = height;
    this.textColor = textColor;
    this.border = border;
  }

  init(selector) {
    document.querySelector(`${selector}`).append(this.createProgressBar());
  }
  createProgressBar() {
    const progressBar = document.createElement("div");
    const bar = this.createBar();
    progressBar.append(bar);
    progressBar.style.width = "100%";
    progressBar.style.border = this.border;
    this.animateBar(bar);
    return progressBar;
  }
  createBar() {
    const bar = document.createElement("div");
    bar.style.cssText = `
      text-align:center;
      background-color:${this.background};
      height:${this.height}px;
      line=height:${this.height}px;
      color:${this.textColor};
      `;
    this.stateProgress(bar);
    return bar;
  }
  stateProgress(elem) {
    elem.style.width = `${this.start}%`;
    elem.textContent = `${this.start}%`;
  }
  animateBar(bar) {
    const animate = () => {
      if (this.start < this.end) {
        this.start+=0.5;
        this.stateProgress(bar);
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }
}
class RoundedProgressBar extends ProgressBar {
  constructor(option = {}) {
    super(option);
    const {rounded}=option;
    this.rounded=rounded;
  }
  createProgressBar() {
    const progressBar = super.createProgressBar();
    this.roundedBar(progressBar);
    return progressBar;
  }
  roundedBar(elem){
    elem.style.borderRadius=this.rounded;
    elem.style.overflow='hidden';
  }
}
