const form = document.getElementById("form");
const operationName = form.querySelector(".operation__name");
const operationAmount = form.querySelector(".operation__amount");
//
const history = document.querySelector(".history");
const historyList = document.querySelector(".history__list");
//
const totalBalance = document.querySelector(".total__balance span");
const totalMoneyIncome=document.querySelector('.total__money-income span');
const totalMoneyExpenses=document.querySelector('.total__money-expenses span');

const createTemplate = (name, amounth) => {
  const checkVal = amounth > 0 ? "history__item-plus" : "history__item-minus";
  const sign = amounth > 0 ? "+" : "";
  return `
    <li class="history__item ${checkVal}">${name}
        <span class="history__money">${sign}${amounth} ₽</span>
        <button class="history_delete">x</button>
    </li>
    `;
};

const addNewRecord = (template) => {
  historyList.insertAdjacentHTML("beforeend", template);
  const historyDeleteArr = document.querySelectorAll(".history_delete");
  return historyDeleteArr;
};

function deleteRecord() {
  this.removeEventListener("click", deleteRecord);
  this.parentElement.remove();
}

const addDelBtntListener = (arr) => {
  for (let item of arr) {
    item.addEventListener("click", deleteRecord);
  }
};

const balance={
    totalMoneyIncome:0,
    totalMoneyExpenses:0,
    finalBalance(){
        return this.totalMoneyIncome-this.totalMoneyExpenses;
    }
};
const setTotalInfo = amounth => {
    if(amounth>0){
        balance.totalMoneyIncome+=parseInt(amounth);
    }else{
        balance.totalMoneyExpenses+=Math.abs(parseInt(amounth));
    }
    totalMoneyIncome.textContent=balance.totalMoneyIncome;
    totalMoneyExpenses.textContent=balance.totalMoneyExpenses;
    totalBalance.textContent=balance.finalBalance();
};

const getData = (event) => {
  event.preventDefault();
  const name = operationName.value;
  const amounth = operationAmount.value;
  const template = createTemplate(name, amounth);
  const cancelArr = addNewRecord(template);
  setTotalInfo(amounth);
  addDelBtntListener(cancelArr);
  operationName.value=operationAmount.value='';
};

form.addEventListener("submit", (event) => {
  getData(event);
});
