// 2. Реализую таймер обратного отсчёта

// функция по добавлению "0" перед чиловым значением (если меньше 10)
function setZero(num) {
    if (num >= 0 && num < 10) {
        num = `0${num}`;
    }
    return num;
}

function timer(id, deadline) {


    // функция расчета остатка времени (дни, часы и т.д.)
    function getRemainingTime(endTime) {
        const total = Date.parse(endTime) - Date.parse(new Date());

        const days = Math.floor(total / (1000 * 60 * 60 * 24)),
            hours = Math.floor(total / (1000 * 60 * 60) % 24),
            minutes = Math.floor(total / (1000 * 60) % 60),
            seconds = Math.floor((total / 1000) % 60);

        return {
            'total': total,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    // функция отображения/установки счетчика остатка времени на странице
    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const timeObject = getRemainingTime(endTime);

            days.textContent = setZero(timeObject.days);
            hours.textContent = setZero(timeObject.hours);
            minutes.textContent = setZero(timeObject.minutes);
            seconds.textContent = setZero(timeObject.seconds);

            if (timeObject.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);
}

export default timer;
export {setZero};