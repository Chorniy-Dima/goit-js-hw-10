import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("input#datetime-picker");
const button = document.querySelector("button");
const days = document.querySelector("[data-days]");
const hours = document.querySelector("[data-hours]");
const minutes = document.querySelector("[data-minutes]");
const seconds = document.querySelector("[data-seconds]");

button.disabled = true;
let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      if (userSelectedDate <= new Date()) {
          iziToast.error({
            title: 'Error',
              message: 'Illegal operation',
              backgroundColor: "#ef4040",
              position: "topRight",
              titleColor: "#fff",
              messageColor: "#fff",
              iconColor: "#fff",
              progressBarColor: "#b51b1b"
          });
          button.disabled = true;
          return;
        } else {
          button.disabled = false;
      }
  },
};

flatpickr(input, options);

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

let timer = null;

button.addEventListener("click", () => {
    button.disabled = true;
    input.disabled = true;

    timer = setInterval(() => {
        const n = new Date();
        const rest = userSelectedDate - n;

        if (rest <= 0) {
            clearInterval(timer);
            input.disabled = false;
            button.disabled = true;
            days.textContent = '00';
            hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';
            return;
        }

        const remainingTime = convertMs(rest);
        days.textContent = addLeadingZero(remainingTime.days);
        hours.textContent = addLeadingZero(remainingTime.hours);
        minutes.textContent = addLeadingZero(remainingTime.minutes);
        seconds.textContent = addLeadingZero(remainingTime.seconds);
    }, 1000)
});
