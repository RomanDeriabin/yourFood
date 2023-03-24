function timer() {

  const deadLine = '2023-03-18';

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(t/(1000 * 60 * 60 * 24));
    const hours = Math.floor((t / (1000 * 60 * 60) % 24 ));
    const minutes = Math.floor((t / 1000 / 60) % 60 );
    const seconds = Math.floor((t / 1000) % 60 );

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds,
    }
  }

  function setZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setTimer(timerBlock, endtime) {
    const timer = document.querySelector(timerBlock);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    const timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = setZero(t.days);
      hours.innerHTML = setZero(t.hours);
      minutes.innerHTML = setZero(t.minutes);
      seconds.innerHTML = setZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setTimer('.timer', deadLine);
}
export default timer;