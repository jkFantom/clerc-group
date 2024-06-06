export const initRangeInputs = () => {
  const rangeInputs = document.querySelectorAll('input[type="range"]')

  function setupRangeInputValue(input) {
    const outputElement = input.closest('.field').querySelector('.field__value');

    outputElement.textContent = input.value + ' %';
    input.style.backgroundSize = input.value + '% 100%'
  }
  function handleInputChange(e) {
    const target = e.target;

    const min = target.min;
    const max = target.max;
    const val = target.value;
    const percentage = (val - min) * 100 / (max - min);

    setupRangeInputValue(target);

    target.style.backgroundSize = percentage + '% 100%';
  }

  rangeInputs.forEach(input => {
    setupRangeInputValue(input);
    input.addEventListener('input', handleInputChange)
  })
}
