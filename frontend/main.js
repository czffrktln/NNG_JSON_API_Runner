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

const input = document.getElementById('input');
const select = document.getElementById('api-select')
const sendButton = document.getElementById('send-button');
const output = document.getElementById('output');
sendButton.addEventListener('click', async () => {
  const inputValue = input.value;
  const selectedApi = select.value

  try {
    const response = await fetch(`http://localhost:3000/${selectedApi}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({input: inputValue})
      
    });

    if (response.ok) {
      const data = await response.json()
      console.log(data);
      output.textContent = JSON.stringify(data.result, null, 2)
    } else {
      const error = await response.json()
      console.log('Request failed:', response.status, error.error); 
    }
  }
  catch (err) {
    console.error(err);
  }
});