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

export default modal;
export {openPopup, closePopup};