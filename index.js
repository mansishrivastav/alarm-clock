const timerDisplay = document.getElementById("timer-display");
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const meridian = document.getElementById("meridian");
const activeAlarms = document.getElementById("active-alarms");
const displayMessage = document.getElementById("display-message");

let alarmArray = [];
const alarmSound = new Audio("alarm.mp3");

const setAlarm = () => {
  const selectedTime = new Date();
  selectedTime.setHours(
    meridian.value === "AM" ? Number(hour.value) : Number(hour.value) + 12,
    Number(minute.value),
    0,
    0
  );
  const currentTime = new Date();
  const timeDifference = selectedTime - currentTime;
  console.log(timeDifference);
  if (timeDifference > 0) {
    const newAlarm = {
      time: selectedTime,
      id: Math.random().toString(36).substr(2, 9),
    };
    alarmArray.push(newAlarm);
    const alarmElement = document.createElement("h2");
    alarmElement.textContent = `Alarm set for ${hour.value} : ${minute.value} ${meridian.value}`;
    alarmElement.setAttribute("data-alarm-id", "newAlarm.id");
    activeAlarms.appendChild(alarmElement);
    displayMessage.innerHTML = `Alarm set for  ${hour.value} : ${minute.value} ${meridian.value}
    `;
  } else {
    displayMessage.innerText = "Select a valid time";
  }
};

const updateTimerDisplay = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");
  timerDisplay.innerText = `${hours}:${minutes}:${seconds}`;
};
const clearAlarm = () => {
  alarmArray = [];
  activeAlarms.innerHTML = "";
  alarmSound.pause();
  alarmSound.currentTime = 0;
  displayMessage.innerHTML = "";
};
const checkAlarms = () => {
  const currentTime = new Date();
  for (const alarm of alarmArray) {
    const timeDifference = alarm.time - currentTime;
    if (timeDifference <= 0 && timeDifference >= -1000) {
      alarmSound.play();
      const alarmElement = activeAlarms.querySelector(
        `[data-alarm-id="${alarm.id}"]`
      );
      console.log("Playing alarm sound");
      if (alarmElement) {
        activeAlarms.removeChild(alarmElement);
      }
    }
  }
};
setInterval(() => {
  updateTimerDisplay();
  checkAlarms();
}, 1000);
