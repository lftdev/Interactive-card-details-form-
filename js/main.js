// REFRESH GRAPHICS
const cardholder_text = document.querySelector('span.cardholder')
const card_number_text = document.querySelector('div.card-number')
const card_exp_text = document.querySelector('span.card-exp')
const card_cvc_text = document.querySelector('span.card-cvc')

const refreshCardHolder = event => cardholder_text.innerHTML = event.target.value
const refreshCardNumber = event => {
  const value = event.target.value
  if (value.length <= 16)
    card_number_text.innerHTML = value.replace(/(\d{4})/g, '$1 ')
}
const refreshExpDate = (event, input) => {
  const target = event.target
  const text = card_exp_text.innerHTML
  let value = target.value
  let length = value.length
  if ((length != 2) && (length != 0))
    value = value.replace(/^(\d).*$/, '0$1')
  else if (length == 0)
    value = '00'
  if (input.name === 'exp-month')
    card_exp_text.innerHTML = text.replace(/(\d{2}\/)/, value + '/')
  else
    card_exp_text.innerHTML = text.replace(/(\/\d{2})/, '/' + value)
}

const refreshCVC = event => {
  const value = event.target.value
  if (value.length <= 4)
    card_cvc_text.innerHTML = value
}
// /REFRESH GRAPHICS
// VALIDATE USER INPUT
const REGEX = {
  CARDHOLDER: /^[a-zA-Z]+( [a-zA-Z]+)+?$/,
  CARD_NUMBER: /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
  EXP_MM: /^[0-1][1-9]$/,
  EXP_YY: /^[2-3][3-9]$/,
  CVC: /^\d{3,4}$/
}
const VALID_INPUTS = {
  CARDHOLDER: null,
  CARD_NUMBER: null,
  EXP_MM: null,
  EXP_YY: null,
  CVC: null
}
const invalid_inputs_p = document.querySelectorAll('form p')
const validateCardholder = (event, input) => {
  const target = event.target
  const value = target.value
  const p_index = 0
  if (value.match(REGEX.CARDHOLDER)) {
    VALID_INPUTS.CARDHOLDER = value
    input.classList.remove('invalid-input')
    invalid_inputs_p[p_index].classList.remove('invalid-input')
  }
  else {
    input.classList.add('invalid-input')
    invalid_inputs_p[p_index].classList.add('invalid-input')
  }
}
const validateCardNumber = (event, input) => {
  const target = event.target
  const value = target.value
  const p_index = 1
  if (value.match(REGEX.CARD_NUMBER)) {
    VALID_INPUTS.CARD_NUMBER = parseInt(value)
    input.classList.remove('invalid-input')
    invalid_inputs_p[p_index].classList.remove('invalid-input')
  }
  else {
    input.classList.add('invalid-input')
    invalid_inputs_p[p_index].classList.add('invalid-input')
  }
}
const validateExpMM = (event, input) => {
  const target = event.target
  // Get the first two digits only.
  const value = parseInt(target.value)
  const p_index = 2
  if (isNaN(value)) {
    input.classList.add('invalid-input')
    invalid_inputs_p[p_index].classList.add('invalid-input')
  }
  else if ((value <= new Date().getMonth() + 1) || (value > 12)) {
    input.classList.add('invalid-input')
    invalid_inputs_p[p_index].classList.add('invalid-input')
  }
  else {
    VALID_INPUTS.EXP_MM = value - 1
    input.classList.remove('invalid-input')
    invalid_inputs_p[p_index].classList.remove('invalid-input')
  }
}
const validateExpYY = (event, input) => {
  const target = event.target
  // Get the first two digits only.
  const value = parseInt(target.value)
  const p_index = 2
  const this_year = new Date().getFullYear() - 2000
  if (isNaN(value)) {
    input.classList.add('invalid-input')
    invalid_inputs_p[p_index].classList.add('invalid-input')
  }
  else if ((value < this_year) || (value > (this_year + 6))) {
    input.classList.add('invalid-input')
    invalid_inputs_p[p_index].classList.add('invalid-input')
  }
  else {
    VALID_INPUTS.EXP_YY = value + 2000
    input.classList.remove('invalid-input')
    invalid_inputs_p[p_index].classList.remove('invalid-input')
  }
  
}
const validateCVC = (event, input) => {
  const target = event.target
  const value = target.value
  const p_index = 3
  if (value.match(REGEX.CVC)) {
    VALID_INPUTS.CVC = value
    input.classList.remove('invalid-input')
    invalid_inputs_p[p_index].classList.remove('invalid-input')
  }
  else {
    input.classList.add('invalid-input')
    invalid_inputs_p[p_index].classList.add('invalid-input')
  }
}
// /VALIDATE USER INPUT
const inputs = document.querySelectorAll('form .input-field')
inputs.forEach(input => {
  switch (input.name) {
    case 'cardholder':
      input.addEventListener('input', refreshCardHolder)
      input.addEventListener('blur', event => {
        validateCardholder(event, input)
      })
      break
    case 'card-number':
      input.addEventListener('input', refreshCardNumber)
      input.addEventListener('blur', event => {
        validateCardNumber(event, input)
      })
      break
    case 'exp-month':
      input.addEventListener('input', event => {
        refreshExpDate(event, input)
      })
      input.addEventListener('blur', event => {
        validateExpMM(event, input)
      })
      break
    case 'exp-year':
      input.addEventListener('input', event => {
        refreshExpDate(event, input)
      })
      input.addEventListener('blur', event => {
        validateExpYY(event, input)
      })
      break
    case 'card-cvc':
      input.addEventListener('input', refreshCVC)
      input.addEventListener('blur', event => {
        validateCVC(event, input)
      })
  }
})
const form = document.getElementById('form-payment')
form.addEventListener('submit', event => {
  event.preventDefault()
})
