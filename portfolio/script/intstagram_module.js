const block = document.querySelector(".instagram");
const firstInstagramData = [
  {id: 1,text: "nature", src: "./img/ball-ball-shaped-blur-color-235615.jpg"},
  {id: 2,text: "nature",src: "./img/abandoned-forest-industry-nature-34950.jpg"},
  {id: 3, text: "nature",src: "./img/abstract-art-artistic-autumn-459301.jpg"},
  { id: 4, text: "nature", src: "./img/close-up-photography-of-leaves-with-droplets-807598.jpg"}
];
const secondInstagramData = [
  {id: 5,text: "nature",src: "./img/cold-dark-eerie-environment-414144.jpg"},
  {id: 6, text: "nature", src: "./img/flora-flowers-grass-nature-268261.jpg" },
  {id: 7, text: "nature", src: "./img/gray-bridge-and-trees-814499.jpg" },
  {id: 8, text: "nature", src: "./img/nature-red-forest-leaves-33109.jpg" }
];
const createHtml = instagramData => {
  const { text, src } = instagramData;
  return `
    <div class="insta-item">
    <div class="front">
    <i class="fa fa-3x fa-instagram" aria-hidden="true"></i>
    </div>
    <div class="back">
    <img src="${src}" alt="${text}">
    </div></div>
        `;
};
const firstTemplates = firstInstagramData.map(elem => {
  return createHtml(elem);
});
const secondTemplates = secondInstagramData.map(elem => {
  return createHtml(elem);
});
const firstHtml = firstTemplates.join(" ");
const secondHtml = secondTemplates.join(" ");
const createRow = htmlItem => {
  return `
    <div class="insta-row">
        ${htmlItem}
    </div>
    `;
};
block.insertAdjacentHTML("beforeend", createRow(firstHtml));
block.insertAdjacentHTML("beforeend", createRow(secondHtml));
