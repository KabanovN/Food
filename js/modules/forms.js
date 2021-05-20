// 5. Работа с формами (сервер)
import {openPopup, closePopup} from './modal';
import {postData} from '../services/services';

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

            postData('http://localhost:3000/requests', json)
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
        openPopup('.modal', popupTimerId);

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
            closePopup('.modal');
        }, 3000);
    }
}

export default forms;