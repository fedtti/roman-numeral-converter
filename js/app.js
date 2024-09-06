const number = document.getElementById('number');
const convertButton = document.getElementById('convert-btn');
const output = document.getElementById('output');
const reference = [
  ['M', 1000],
  ['CM', 900],
  ['D', 500],
  ['CD', 400],
  ['C', 100],
  ['XC', 90],
  ['L', 50],
  ['XL', 40],
  ['X', 10],
  ['IX', 9],
  ['V', 5],
  ['IV', 4],
  ['I', 1]
];

/**
 * Validate the input to be converted.
 * @param {string} string - The input value.
 * @param {number} integer - The integer to be converted.
 * @returns {boolean}
 */
const validate = (string, integer) => {
  let error = '';
  const regex = /[e.]/g;

  if (!string || string.match(regex)) {
    error = 'Please, enter a valid number.';
  } else if (integer < 1) {
    error = 'Please, enter a number greater than or equal to 1.';
  } else if (integer > 3999) {
    error = 'Please, enter a number lower than or equal to 3999.'
  } else {
    return true;
  }

  output.innerHTML = `<span class="error">${error}</span>`;

  return false;
};

/**
 * Convert a decimal number into a Roman numeral.
 * @param {number} integer - The integer to be converted.
 * @returns {string}
 */
const convertDecimalToNumeral = integer => {
  const result = [];

  reference.forEach(array => {
    while (integer >= array[1]) {
      result.push(array[0]);
      integer -= array[1];
    }
  });

  return result.join('');
};

/**
 * Update the UI with either an error message or the converted numeral.
 */
const update = () => {
  const string = number.value;
  const integer = parseInt(string, 10);

  output.innerHTML = '';

  if (!!validate(string, integer)) {
    output.innerText = convertDecimalToNumeral(integer);
  }
};

number.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    update();
  }
});

convertButton.addEventListener('click', update, false);
