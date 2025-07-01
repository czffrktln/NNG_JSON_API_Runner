const body = document.body;
const themeToggleButton = document.getElementById('theme-toggle');

body.classList.add('light');
themeToggleButton.textContent = 'Dark';

themeToggleButton.addEventListener('click', () => {
  const isDark = body.classList.contains('dark');

  if (isDark) {
    body.classList.replace('dark', 'light');
    themeToggleButton.textContent = 'Dark';
  } else {
    body.classList.replace('light', 'dark');
    themeToggleButton.textContent = 'Light';
  }
});

const alignToggleButton = document.getElementById('align-toggle');
const buttons = document.querySelectorAll('.button-row')
let isRight = false;
alignToggleButton.textContent = 'Right';
alignToggleButton.addEventListener('click', () => {
  isRight = !isRight;
  buttons.forEach((btnRow) => {
    btnRow.classList.toggle('right-align', isRight);
  })
  alignToggleButton.textContent = isRight ? 'Left' : 'Right'
});