'use strict';
const DATA = {
  whichSite: ["landing", "multiPage", "onlineStore"],
  price: [4000, 8000, 26000],
  desktopTemplates: [50, 40, 30],
  adapt: 20,
  mobileTemplates: 15,
  editable: 10,
  metrikaYandex: [500, 1000, 2000],
  analyticsGoogle: [850, 1350, 3000],
  sendOrder: 500,
  deadLine: [
    [2, 7],
    [3, 10],
    [7, 14]
  ],
  deadLinePercent: [20, 17, 15]
};

const arrTitles = ["день", "дня", "дней"];
const startButton = document.querySelector(".start-button");
const firstScreen = document.querySelector(".first-screen");
const mainForm = document.querySelector(".main-form");
const formCalculate = document.querySelector(".form-calculate");
const endButton = document.querySelector(".end-button");
const totalElem = document.querySelector(".total");
const fastRange = document.querySelector(".fast-range");
const totalPriceSum = document.querySelector(".total_price__sum");
const typeSite = document.querySelector(".type-site");
const maxDeadLine = document.querySelector(".max-deadline");
const adapt = document.querySelector("#adapt");
const mobileTemplates = document.getElementById("mobileTemplates");
const rangeDeadline = document.querySelector(".range-deadline");
const deadlineValue = document.querySelector(".deadline-value");
const calcDescription = document.querySelector(".calc-description");
const editable = document.getElementById("editable");
const metrikaYandex = document.getElementById("metrikaYandex");
const analyticsGoogle = document.getElementById("analyticsGoogle");
const sendOrder = document.getElementById("sendOrder");
const cardHead = document.querySelector(".card-head");
const totalPrice = document.querySelector(".total_price");
const inputArr = document.querySelectorAll(".switcher .calc-handler");
const checkboxLabel = document.querySelectorAll(".switcher .checkbox-label");
const firstFieldSet = document.querySelector(".first-fieldset");

mobileTemplates.disabled = true;

const declOfNum = (n, titles, from) =>
  n +
  " " +
  titles[
    from
      ? n % 10 === 1 && n % 100 !== 11
        ? 1
        : 2
      : n % 10 === 1 && n % 100 !== 11
      ? 0
      : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
      ? 1
      : 2
  ];

const showElem = elem => (elem.style.display = "block");

const hideElem = elem => (elem.style.display = "none");

const dopOptionString = (yandex,google,order) => {
  let str = "";
  if (yandex||google||order) {
    str += "Подключим";
    if (yandex) {
      str += " Яндекс Метрику";
      if (google && order) {
        str += ", Гугл Аналитику и отправку заявок на почту.";
        return str;
      }
      if (google || order) {
        str += " и";
      }
    }
    if (google) {
      str += " Гугл Аналитику";
      if (order) {
        str += " и";
      }
    }
    if (order) {
      str += " отправку заявок на почту";
    }
    str += " .";
  }
  return str;
};

const renderTextContent = (total, site, maxDay, minDay) => {
  totalPriceSum.textContent = total;
  typeSite.textContent = site;
  maxDeadLine.textContent = declOfNum(maxDay, arrTitles);
  rangeDeadline.min = minDay;
  rangeDeadline.max = maxDay;
  deadlineValue.textContent = declOfNum(rangeDeadline.value, arrTitles, true);
  calcDescription.textContent = `
    Сделаем ${site} ${
    adapt.checked ? ", адаптированный под мобильные устройства и планшеты" : ""
  }.
        ${
          editable.checked
            ? `Установим панель админстратора,
        чтобы вы могли самостоятельно менять содержание на сайте без разработчика.`
            : ""
        }
        ${dopOptionString(metrikaYandex.checked,analyticsGoogle.checked,sendOrder.checked)}
    `;
};

const priceCalculation = (element = {}) => {
  const {
    whichSite,
    price,
    desktopTemplates,
    deadLine,
    deadLinePercent
  } = DATA;
  let result = 0;
  let index = 0;
  let options = [];
  let site = "";
  let maxDeadLineDay = deadLine[index][1];
  let minDeadLineDay = deadLine[index][0];
  let overPercent = 0;
  if (element.name === "whichSite") {
    for (const item of formCalculate.elements) {
      if (item.type === "checkbox") {
        item.checked = false;
      }
    }
    hideElem(fastRange);
  }
  for (const item of formCalculate.elements) {
    if (item.name === "whichSite" && item.checked) {
      index = whichSite.indexOf(item.value);
      maxDeadLineDay = deadLine[index][1];
      minDeadLineDay = deadLine[index][0];
      site = item.dataset.site;
    } else if (item.classList.contains("calc-handler") && item.checked) {
      options.push(item.value);
    } else if (item.classList.contains("want-faster") && item.checked) {
      const overDay = maxDeadLineDay - rangeDeadline.value;
      overPercent = overDay * (deadLinePercent[index] / 100);
    }
  }
  result += price[index];
  options.forEach(key => {
    if (typeof DATA[key] === "number") {
      if (key === "sendOrder") {
        result += DATA[key];
      } else {
        result += (price[index] * DATA[key]) / 100;
      }
    } else {
      if (key === "desktopTemplates") {
        result += (price[index] * desktopTemplates[index]) / 100;
      } else {
        result += DATA[key][index];
      }
    }
  });

  result += result * overPercent;
  renderTextContent(result, site, maxDeadLineDay, minDeadLineDay);
};

const handlerCallBackForm = event => {
  const target = event.target;
  for (let i = 0; i < inputArr.length; i++) {
    if (inputArr[i].checked) {
      checkboxLabel[i].textContent = "Да";
    } else {
      if (checkboxLabel[1].textContent == "Нет") {
        checkboxLabel[2].textContent = "Нет";
      }
      checkboxLabel[i].textContent = "Нет";
    }
  }
  if (adapt.checked) {
    mobileTemplates.disabled = false;
  } else {
    mobileTemplates.disabled = true;
    mobileTemplates.checked = false;
  }
  if (target.classList.contains("want-faster")) {
    target.checked ? showElem(fastRange) : hideElem(fastRange);
    priceCalculation(target);
  }
  if (target.classList.contains("calc-handler")) {
    priceCalculation(target);
  }
};

const moveBackTotal = () => {
  if (
    document.documentElement.getBoundingClientRect().bottom >
    document.documentElement.clientHeight + 200
  ) {
    totalPrice.classList.remove("totalPriceBottom");
    firstFieldSet.after(totalPrice);
    window.addEventListener("scroll", moveBackTotal);
    window.removeEventListener("scroll", moveTotal);
  }
};
const moveTotal = () => {
  if (
    document.documentElement.getBoundingClientRect().bottom <
    document.documentElement.clientHeight + 200
  ) {
    totalPrice.classList.add("totalPriceBottom");
    endButton.before(totalPrice);
    window.removeEventListener("scroll", moveTotal);
    window.addEventListener("scroll", moveBackTotal);
  }
};

startButton.addEventListener("click", () => {
  showElem(mainForm);
  hideElem(firstScreen);
  window.addEventListener("scroll", moveTotal);
});

endButton.addEventListener("click", () => {
  for (let count of formCalculate.elements) {
    if (count.tagName === "FIELDSET") {
      hideElem(count);
    }
  }
  cardHead.textContent = "Заявка на разработку сайта";
  hideElem(totalPrice);
  showElem(totalElem);
});

formCalculate.addEventListener("change", handlerCallBackForm);
priceCalculation();
/*

defer// используется если скрипты подключены в head
console.dir()//выводит элемент как объект соответсвенно можно глянуть все свойства

*/
