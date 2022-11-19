import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '280px',
  position: 'left-top',
  distance: '200px',
  opacity: 1,
});

const refs = {
  btn: document.querySelector('button[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.btn.disabled = true;
let selectedDate;
const currentDate = new Date();
console.log(currentDate);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < currentDate) {
      Notiflix.Notify.warning(`Please choose a date in the future`);
    } else {
      refs.btn.disabled = false;
      selectedDate = new Date(refs.input.value);
      console.log(selectedDate);
      selectedDate = selectedDate.getTime() - currentDate.getTime();
    }
  },
};

flatpickr('#datetime-picker', options);

function startTimer() {
  let intervalId = setInterval(() => {
    const showDate = convertMs(selectedDate);
    refs.days.textContent = addLeadingZero(showDate.days);
    refs.hours.textContent = addLeadingZero(showDate.hours);
    refs.minutes.textContent = addLeadingZero(showDate.minutes);
    refs.seconds.textContent = addLeadingZero(showDate.seconds);

    selectedDate -= 1000;
    if (selectedDate < 0) {
      clearInterval(intervalId);
      refs.btn.disabled = true;
    }
  }, 1000);
}

refs.btn.addEventListener('click', () => {
  startTimer();
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
