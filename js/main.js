const REGEX = {
  CARDHOLDER: /^[a-zA-Z ]+$/g,
  CARD_NUMBER: /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
  EXP_DATE: /^\d{2}$/
}

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

const inputs = document.querySelectorAll('form .input-field')
inputs.forEach(input => {
  switch (input.name) {
    case 'cardholder':
      input.addEventListener('input', refreshCardHolder)
      break
    case 'card-number':
      input.addEventListener('input', refreshCardNumber)
      break
    case 'exp-month':
    case 'exp-year':
      input.addEventListener('input', event => {
        refreshExpDate(event, input)
      })
      break
    case 'card-cvc':
      input.addEventListener('input', refreshCVC)
  }
})
const invalid_inputs_p = document.querySelectorAll('form p.invalid-input')


const form = document.getElementById('form-payment')
form.addEventListener('submit', event => {
  event.preventDefault()
})
