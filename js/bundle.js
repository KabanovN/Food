/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// 7. Калькулятор

function calc() {
    const calcResult = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
    }

    // функция приведения классов активности в соответствии с данными localStorage

    const initLocalSettings = (selector, activeClass) => {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }

            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    };

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    // функция расчета суточной нормы калорий
    const calcTotal = () => {
        if (!sex || !height || !weight || !age || !ratio) {
            calcResult.textContent = '____';
            return;
        }

        if (sex === 'female') {
            calcResult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            calcResult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    };

    calcTotal();

    // функция для получения значений пола и кф физической активности для расчета totalCalc
    const getStaticInfo = (selector, activeClass) => {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(element => {
                    element.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
    };

    getStaticInfo('#gender div', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

    // функция для получения динамических данных из input
    const getDynamicInfo = selector => {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    };

    getDynamicInfo('#height');
    getDynamicInfo('#weight');
    getDynamicInfo('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
// 4. Создание шаблона карточки меню с помощью классов


function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 74;
            this.changeToRUB();
        }

        changeToRUB() {
            this.price = this.price * this.transfer;
        }

        renderCard() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
            </div>
          `;
            this.parent.append(element);
        }
    }

    // создания динамических карточек с данными из сервера с помощью класса выше


    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResourses)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').renderCard();
            });
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
// 5. Работа с формами (сервер)



function forms(formSelector, popupTimerId) {
    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/forms/spinner.svg',
        success: 'Спасибо! Ожидайте звонка',
        failture: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });



    function bindPostData(form) {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;  
      `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            // const obj = {};
            // formData.forEach(function (value, key) {
            //   obj[key] = value;
            // });
            // ниже более элегантный способ отработки закомментированного кода

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksPopup(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksPopup(message.failture);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    // функция отображения попап при отправке данных на сервер
    function showThanksPopup(message) {
        const prevPopupDialog = document.querySelector('.modal__dialog');

        prevPopupDialog.classList.add('hidden');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openPopup)('.modal', popupTimerId);

        const thanksPopup = document.createElement('div');
        thanksPopup.classList.add('modal__dialog');
        thanksPopup.innerHTML = `
      <div class="modal__content">
          <div data-close class="modal__close">&times;</div>
          <div class="modal__title">${message}</div>
      </div>
    `;
        document.querySelector('.modal').append(thanksPopup);

        setTimeout(() => {
            thanksPopup.remove();
            prevPopupDialog.classList.remove('hidden');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closePopup)('.modal');
        }, 3000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openPopup": () => (/* binding */ openPopup),
/* harmony export */   "closePopup": () => (/* binding */ closePopup)
/* harmony export */ });
// 3. Вызов модального окна

function openPopup(popupSelector, popupTimerId) {
    const popup = document.querySelector(popupSelector);

    popup.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    if (popupTimerId) {
        clearInterval(popupTimerId);
    }
}

function closePopup(popupSelector) {
    const popup = document.querySelector(popupSelector);

    popup.classList.add('hidden');
    document.body.style.overflow = '';
}

function modal(triggerSelector, popupSelector, popupTimerId) {
    const openPopapBtn = document.querySelectorAll(triggerSelector),
          popup = document.querySelector(popupSelector);

    openPopapBtn.forEach(btn => {
        btn.addEventListener('click', () => openPopup(popupSelector, popupTimerId));
    });

    // обработчики закрытия модального окна 

    document.addEventListener('keydown', (evt) => {
        if (evt.code === 'Escape' && !(popup.classList.contains('hidden'))) {
            closePopup(popupSelector, popupTimerId);
        }
    });

    popup.addEventListener('click', (evt) => {
        if (evt.target === popup || evt.target.className === 'modal__close') {
            closePopup(popupSelector, popupTimerId);
        }
    });

    // открытие при долистывании страницы до конца
    function showPopupByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openPopup(popupSelector, popupTimerId);
            window.removeEventListener('scroll', showPopupByScroll);
        }
    }

    window.addEventListener('scroll', showPopupByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");
 // 6. Реализация слайдера


function slider({container, slide, prevArrow, nextArrow, totalCounter, currentCounter, wrapper, field}) {
    const slider = document.querySelector(container),
        slides = slider.querySelectorAll(slide),
        prev = slider.querySelector(prevArrow),
        next = slider.querySelector(nextArrow),
        current = slider.querySelector(currentCounter),
        total = slider.querySelector(totalCounter),
        slidesWrapper = slider.querySelector(wrapper),
        slidesField = slidesWrapper.querySelector(field),
        slideWidth = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

     // создание динамических элементов (точек) переключения слайдов (навигатор слайдов)
    slider.style.position = 'relative';

    const dotsList = document.createElement('ol'),
        dotsArr = []; // создаём массив для привязки к точкам

    dotsList.classList.add('offer___carousel-indicators');
    dotsList.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
        `;
    slidesWrapper.append(dotsList);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if (i === 0) {
            dot.style.opacity = 1;
        }

        dotsList.append(dot);
        dotsArr.push(dot);
    }

    const setOpacity = (array) => {
        array.forEach(elem => elem.style.opacity = 0.5);
        array[slideIndex - 1].style.opacity = 1;
    };

    const deleteNotDigits = str => +str.replace(/\D/g, '');

     //  продолжение работы с функциональностью слайдера - задаем начальную нумерацию и настройки
    total.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.setZero)(slides.length);
    current.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.setZero)(slideIndex);

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = slideWidth;
    });

     // кнопка переключения вперед и назад
    next.addEventListener('click', () => {
        if (offset === deleteNotDigits(slideWidth) * (slides.length - 1)) {
            offset = 0;
            current.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.setZero)(slideIndex);
        } else {
            offset += +(slideWidth.slice(0, slideWidth.length - 2));
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        current.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.setZero)(slideIndex);

        setOpacity(dotsArr);
    });

    prev.addEventListener('click', () => {
        if (offset === 0) {
            offset = deleteNotDigits(slideWidth) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(slideWidth);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        current.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.setZero)(slideIndex);

        setOpacity(dotsArr);
    });

    dotsArr.forEach(dot => {
        dot.addEventListener('click', (evt) => {
            const slideTo = evt.target.getAttribute('data-slide-to');

            offset = deleteNotDigits(slideWidth) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            slideIndex = slideTo;

            current.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.setZero)(slideIndex);

            setOpacity(dotsArr);
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// 1. Реализую Табы на странице (картинка + описание диеты)

function tabs(tabsParentSelector, tabsSelector, tabContentSelector, activeClass) {
    const tabsParent = document.querySelector(tabsParentSelector),
        tabs = document.querySelectorAll(tabsSelector),
        tabContent = document.querySelectorAll(tabContentSelector);

    // функция скрытия контента
    const hideTabContent = () => {
        tabContent.forEach(item => {
            item.classList.add('hidden');
            item.classList.remove('fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    };

    // функция отображения контента 
    const showTabContent = (i = 0) => {
        tabContent[i].classList.remove('hidden');
        tabContent[i].classList.add('fade');
        tabs[i].classList.add(activeClass);
    };

    hideTabContent();
    showTabContent();

    // обработчик события клика по элементу (вид питания)
    tabsParent.addEventListener('click', evt => {
        const target = evt.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (item === target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "setZero": () => (/* binding */ setZero)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResourses": () => (/* binding */ getResourses)
/* harmony export */ });
    // функция отправки данных на сервер
    const postData = async (url, data) => {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return result.json();
    };

    // функция получения ответа с сервера
    const getResourses = async (url) => {
        const result = await fetch(url);

        if (!result.ok) {
            throw new Error(`Could not fetch ${url}, status ${result.status}`);
        }

        return await result.json();
    };

    
    

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");









window.addEventListener('DOMContentLoaded', () => {
  const popupTimerId = setInterval(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openPopup)('.popup', popupTimerId), 50000);

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)('[data-modal]', '.modal', popupTimerId);
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__.default)('.timer', '2021-12-31');
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__.default)();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__.default)('form', popupTimerId);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__.default)({
    container:'.offer__slider',
    slide: '.offer__slide',
    prevArrow: '.offer__slider-prev',
    nextArrow:'.offer__slider-next',
    totalCounter: '#total',
    currentCounter: '#current', 
    wrapper: '.offer__slider-wrapper', 
    field: '.offer__slider-inner'
  });
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map