const mobileMenu = document.getElementById("btn-menu");
const sendBtnElement = document.getElementById("send-button");

$(".slaider").slick({
  arrows: false,
  dots: true,
  slidesToScroll: 1
});
$(document).ready(function() {
  $(".animated-move").on("click", "a", function(event) {
    event.preventDefault();
    var id = $(this).attr("href"),
      top = $(id).offset().top - 100;
    $("body,html").animate({ scrollTop: top }, 1000);
  });
});

class UserData {
  constructor(name, email, title, comment) {
    this.name = name;
    this.email = email;
    this.title = title;
    this.comment = comment;
  }
}

const checkDataValue = arrDataField => {
  const checkArrvalue = Array.from(arrDataField);
  const check = checkArrvalue.some(element => {
    if (element.value == "" || element.value == null) {
      return true;
    } else {
      return false;
    }
  });
  return check;
};

sendBtnElement.addEventListener("click", () => {
  const data = document.querySelectorAll(".priority-data");
  const nameVal = data[0].value;
  const emailVal = data[1].value;
  const titleVal = data[2].value;
  const commentVal = data[3].value;
  const regex = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
  const checkVal = checkDataValue(data);
  if (checkVal == true) {
    swal("Ошибка", "Не все поля были заполнены", "error");
  } else {
    if (regex.test(emailVal) === true) {
      const newUserData = new UserData(nameVal, emailVal, titleVal, commentVal);
      swal("Успех", "спасибо за то, что вы с нами", "success");
    } else {
      swal("Ошибка", "Поля заполнены не корректно", "error");
    }
  }
});

document.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  const links = document.querySelectorAll(".header ul a");
  const img = document.querySelector(".logo img");
  const bars = document.getElementById("bars");
  if (pageYOffset >= 800) {
    img.src = "./img/logo-black-version.png";
    bars.style.color = "black";
    header.classList.add("header-scroll");
    if (screen.width > 765) {
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("link");
        links[i].classList.add("link-scroll");
      }
    }
  }
  if (pageYOffset < 800) {
    img.src = "./img/logo.png";
    bars.style.color = "white";
    header.classList.remove("header-scroll");
    for (let i = 0; i < links.length; i++) {
      links[i].classList.remove("link-scroll");
      links[i].classList.add("link");
    }
  }
});

mobileMenu.addEventListener("click", () => {
  const list = document.querySelector(".list-menu");
  list.classList.toggle("mobile-list-menu");
});
