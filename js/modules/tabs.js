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

export default tabs;