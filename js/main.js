//const CARD_NUMBER_REGEX = /(\d{4})(?=\d|$)/g
const REGEX = {
  CARDHOLDER: /^[a-zA-Z ]+$/g,
  CARD_NUMBER: /^\d{16}$/g,
  EXP_DATE: /^\d{2}$/
}

const card_number = document.querySelector('div.card-number')

const inputs = document.querySelectorAll('form .input-field')
const invalid_inputs_p = document.querySelectorAll('form p.invalid-input')
const form = document.getElementById('form-payment')

const validateInput = event => {
  const target = event.target
  let index
  switch (target.name) {
    case 'cardholder':
      index = 0
      if (target.value.match(REGEX.CARDHOLDER) == null)
        onWrongInput(target, index, 'Invalid name.')
      else onCorrectInput(target, index)
    break;
    case 'card-number':
      index = 1
      if (target.value.match(REGEX.CARD_NUMBER) == null)
        onWrongInput(target, index, 'The card number must have 16 digits.')
      else onCorrectInput(target, index)
    break;
    case 'exp-month':
    case 'exp-year':
      index = 2
      if (target.value.match(REGEX.EXP_DATE) == null)
        onWrongInput(target, index, 'The date format is not correct.')
      else onCorrectInput(target, index)
  }
}

const refreshGraphics = async () => {
  
}

inputs.forEach(input => {
  input.addEventListener('keyup', () => {
    refreshGraphics()
    validateInput()
  })
  input.addEventListener('blur', validateInput)
})

form.addEventListener('submit', event => {
  event.preventDefault()
})

function onWrongInput(target, index, msg) {
  target.classList.add('invalid-input')
  invalid_inputs_p[index].innerHTML = msg
}

function onCorrectInput(target, index) {
  target.classList.remove('invalid-input')
  invalid_inputs_p[index].innerHTML = ''
}
