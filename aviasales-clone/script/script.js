"use strict";
const formSearchElement = document.querySelector(".form-search");
const citiesFromElement = formSearchElement.querySelector(
  ".input__cities-from"
);
const citiesToElement = formSearchElement.querySelector(".input__cities-to");
const citiesFromUlElement = formSearchElement.querySelector(
  ".dropdown__cities-from"
);
const citiesToUlElement = formSearchElement.querySelector(
  ".dropdown__cities-to"
);
const findButtonElement = formSearchElement.querySelector(".button__search");
const inputDateDepartElement = formSearchElement.querySelector(
  ".input__date-depart"
);

const cheapestTicketElement = document.getElementById("cheapest-ticket");
const otherCheapTicket = document.getElementById("other-cheap-tickets");

const citiesApi = "json/cities.json";
const proxi = "https://cors-anywhere.herokuapp.com/";

const calendarApi = "http://min-prices.aviasales.ru/calendar_preload";
const apiKey = "c4092a0d1e900a2bc1fd15afe4ca4274";

let cities = [];
const maxCount=10;
const getData = (url, callback) => {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("readystatechange", () => {
    if (request.readyState !== 4) {
      return;
    }
    if (request.status === 200) {
      callback(request.response);
    } else {
      console.error(request.status);
    }
  });

  request.send();
};

const showCity = (input, dropdown) => {
  dropdown.textContent = "";
  if (input.value != "") {
    const filteredArr = cities.filter(item => {
      return item.name.toLowerCase().startsWith(input.value.toLowerCase());
    });
    let li;
    filteredArr.forEach(element => {
      li = document.createElement("li");
      li.classList.add("dropdown__city");
      li.innerHTML = element.name;
      dropdown.append(li);
    });
  }
};

const quickChoose = (event, cityField, cityUl) => {
  const target = event.target;
  if (target.tagName.toLowerCase() === "li") {
    cityField.value = target.innerHTML;
    cityUl.textContent = "";
  }
};

const getNameCity=(code)=>{
  const objCity=cities.find((item)=>{return item.code===code});
  return objCity.name;
};


const getChanges=(num)=>{
  if(num){
    return (num===1) ? 'С одной пересадкой' : 'С двумя пересадками';
  }else{
    return 'без пересадок'
  }
};

const getDate=(date)=>{
  return new Date(date).toLocaleString('ru',{
    year:'numeric',
    month:'long',
    day:'numeric',
    hour:'2-digit',
    minute:'2-digit'
  });
};

const createCard = cheapTicket => {
  const ticket = document.createElement("article");
  ticket.classList.add("ticket");
  let deep = "";
  if (cheapTicket) {
    deep = `
      <h3 class="agent">${cheapTicket.gate}</h3>
      <div class="ticket__wrapper">
        <div class="left-side">
          <a href="https://www.aviasales.ru/search/SVX2905KGD1" class="button button__buy">Купить
            за ${cheapTicket.value}₽</a>
        </div>
        <div class="right-side">
          <div class="block-left">
            <div class="city__from">Вылет из города
              <span class="city__name">${getNameCity(cheapTicket.origin)}</span>
            </div>
            <div class="date">${getDate(cheapTicket.depart_date)}</div>
          </div>
          <div class="block-right">
            <div class="changes">${getChanges(cheapTicket.number_of_changes)}</div>
            <div class="city__to">Город назначения:
              <span class="city__name">${getNameCity(cheapTicket.destination)}</span>
            </div>
          </div>
        </div>
      </div>
      `;
  } else {
    deep = `<h3>К сожалению на текущую дату билетов нет!</h3>`;
  }
  ticket.insertAdjacentHTML("afterbegin", deep);
  return ticket;
};

const renderCheapDay = cheapTicket => {
  cheapestTicketElement.style.display='block';
  cheapestTicketElement.innerHTML='<h2>Самый дешевый билет на выбранную дату</h2>';
 
  cheapestTicketElement.append(createCard(cheapTicket[0]));
};

const renderCheapYear = cheapTickets => {
  cheapestTicketElement.style.display='block';
  otherCheapTicket.innerHTML='<h2>Самые дешевые билеты на другие даты</h2>';
  cheapTickets.sort((a, b) => {
    if (a.value > b.value) {
      return 1;
    }
    if (a.value < b.value) {
      return -1;
    }
    if (a === b) {
      return 0;
    }
  });

  for(let i=0;i<cheapTickets.length && i<maxCount;i++){
    const ticket = createCard(cheapTickets[i]);
    otherCheapTicket.append(ticket);
  }
};

const renderCheap = (data, date) => {
  const cheapTicket = JSON.parse(data).best_prices;

  const cheapTicketDay = cheapTicket.filter(item => {
    return item.depart_date === date;
  });

  renderCheapDay(cheapTicketDay);
  renderCheapYear(cheapTicket);
};

formSearchElement.addEventListener("submit", event => {
  event.preventDefault();
  
  const cityFrom = cities.find(item => {
    return citiesFromElement.value === item.name;
  });
  const citiesTo = cities.find(item => {
    return citiesToElement.value === item.name;
  });
  const formData = {
    from: cityFrom,
    to: citiesTo,
    data: inputDateDepartElement.value
  };
  if (formData.from && formData.to) {
    const requestData = `?depart_data=${formData.when}&origin=${formData.from.code}&destination=${formData.to.code}&one_way=true&token=${apiKey}`;
    getData(calendarApi + requestData, response => {
      renderCheap(response, formData.data);
    });
  } else {
    alert("Введите корректное название города");
  }
});

citiesFromElement.addEventListener("input", () => {
  showCity(citiesFromElement, citiesFromUlElement);
});

citiesToElement.addEventListener("input", () => {
  showCity(citiesToElement, citiesToUlElement);
});

citiesFromUlElement.addEventListener("click", event => {
  quickChoose(event, citiesFromElement, citiesFromUlElement);
});
citiesToUlElement.addEventListener("click", event => {
  quickChoose(event, citiesToElement, citiesToUlElement);
});

getData(citiesApi, data => {
  cities = JSON.parse(data).filter(item => {
    return item.name;
  });
});
