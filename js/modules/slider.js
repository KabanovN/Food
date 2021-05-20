 // 6. Реализация слайдера
import {setZero} from './timer';

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
    total.textContent = setZero(slides.length);
    current.textContent = setZero(slideIndex);

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
            current.textContent = setZero(slideIndex);
        } else {
            offset += +(slideWidth.slice(0, slideWidth.length - 2));
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        current.textContent = setZero(slideIndex);

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

        current.textContent = setZero(slideIndex);

        setOpacity(dotsArr);
    });

    dotsArr.forEach(dot => {
        dot.addEventListener('click', (evt) => {
            const slideTo = evt.target.getAttribute('data-slide-to');

            offset = deleteNotDigits(slideWidth) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            slideIndex = slideTo;

            current.textContent = setZero(slideIndex);

            setOpacity(dotsArr);
        });
    });
}

export default slider;