export const initFileInputs = () => {
  const fileButtons = document.querySelectorAll('.input-file');

  fileButtons.forEach(btn => {;
    let fileInput = btn.querySelector('input[type="file"]');
    const fileName = btn.querySelector('.input-file__name');

    btn.addEventListener('click', () => {
      if (fileInput.value) {
        fileInput.value='';
        fileName.textContent = 'Прикрепить файл';
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.value) {
        fileName.textContent = fileInput.value.split('\\').pop();
      } else {
        fileName.textContent = 'Прикрепить файл';
      }
    });
  });
}
