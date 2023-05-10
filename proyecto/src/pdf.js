const btn = document.querySelector('#btn-show-pdf');

btn.addEventListener('click', () => {
  fetch('/api/pdf')
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      window.open(url);
    })
    .catch(error => console.error(error));
});