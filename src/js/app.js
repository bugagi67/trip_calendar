import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Russian } from "flatpickr/dist/l10n/ru.js"
import moment from "moment";

document.addEventListener("DOMContentLoaded", () => {
  const departureInput = document.querySelector("#departure");
  const returnInput = document.querySelector("#return");
  const increaseBtn = document.querySelectorAll(".increase");
  const decreaseBtn = document.querySelectorAll(".decrease");
  const checkboxDate = document.querySelector('.checkbox');

  let departureDate = null;

  flatpickr(departureInput, {
    locale: Russian,
    dateFormat: "d.m.Y",
    minDate: "today",
    defaultDate: "today",
    onChange: (selectedDates) => {
      departureDate = selectedDates[0];
      if (returnInput._flatpickr) {
        returnInput._flatpickr.set("minDate", departureDate);
      }
    },
  });

  flatpickr(returnInput, {
    locale: Russian,
    dateFormat: "d.m.Y",
    minDate: "today",
    onChange: (selectedDates) => {
      const returnDate = selectedDates[0];
      if (departureDate && returnDate <= departureDate) {
        alert("Дата возвращения должна быть позже даты отправления!");
        returnInput.value = "";
      }
    },
  });

  const updateValue = (input, increment) => {
    const min = parseInt(input.min) || 0;
    let currentValue = parseInt(input.value) || 0;

    currentValue += increment;

    if (currentValue < min) currentValue = min;

    input.value = currentValue;
  };

  checkboxDate.addEventListener("change", () => {
    if (checkboxDate.checked) {
      returnInput.disabled = false;
    } else {
      returnInput.disabled = true;
    }
  });

  increaseBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      const input = e.target.closest(".passengers").querySelector("input");
      updateValue(input, 1);
    });
  });

  decreaseBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      const input = e.target.closest(".passengers").querySelector("input");
      updateValue(input, -1);
    });
  });


  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      from: `${document.querySelector("#from").value} => ${document.querySelector("#to").value}`,
      to: `${document.querySelector("#to").value} => ${document.querySelector("#from").value}`,
      adults: document.querySelector(".adults").value,
      children: document.querySelector(".children").value,
      infants: document.querySelector(".infants").value,
      departure: departureInput.value,
      return: returnInput.value,
    };

    if (!data.from || !data.to || !data.departure) {
      alert("Пожалуйста, заполните обязательные поля.");
      return;
    }

    if (
      data.return &&
      moment(data.return, "DD.MM.YYYY").isSameOrBefore(
        moment(data.departure, "DD.MM.YYYY"),
      )
    ) {
      alert("Дата возвращения должна быть позже даты отправления.");
      return;
    }

    console.log(data);
  });
});
