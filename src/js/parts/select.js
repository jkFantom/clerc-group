export const initSelects = () => {
  document.querySelectorAll('.dropdown').forEach(dropDownWrapper => {
    const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
    const dropDownList = dropDownWrapper.querySelector('.dropdown__body');
    const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
    const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');

    dropDownBtn.addEventListener('click', function (e) {
      dropDownList.classList.toggle('dropdown__body_visible');
      this.classList.add('dropdown__button_active');
    });

    dropDownListItems.forEach(function (listItem) {
      listItem.addEventListener('click', function (e) {
        e.stopPropagation();
        dropDownBtn.innerText = this.innerText;
        dropDownBtn.focus();
        dropDownInput.value = this.dataset.value;
        dropDownList.classList.remove('dropdown__body_visible');
        dropDownBtn.classList.remove('dropdown__button_active');
      });
    });

    document.addEventListener('click', function (e) {
      if (e.target !== dropDownBtn) {
        dropDownBtn.classList.remove('dropdown__button_active');
        dropDownList.classList.remove('dropdown__body_visible');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' || e.key === 'Escape') {
        dropDownBtn.classList.remove('dropdown__button_active');
        dropDownList.classList.remove('dropdown__body_visible');
      }
    });
  });
}
