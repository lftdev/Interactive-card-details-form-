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
