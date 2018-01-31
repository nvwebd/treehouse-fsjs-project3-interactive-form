/**
 * [Self executing function that sets name-field to focus, disables html5 validation,
 *  adds placeholders, prepares total count element, selects credit Card
 *  as the default payment, and hides t-shirts
 *  ]
 * @param  {[]} ( [function has no input parameters]
 * @return {[]}   [function produces no return value]
 */
(() => {
  document.getElementById('name').focus();

  document.getElementsByTagName('form')[0].setAttribute('novalidate', '');

  /**
   * [addTotalContainer Function adds the "Total container" where the price is displayed]
   * return function returns the total div
   */
  const addTotalContainer = () => {
    const totalDiv = document.createElement('DIV');
    totalDiv.id = 'total-div';
    totalDiv.classList.add('is-hidden');

    const totalText = document.createElement('P');
    totalText.textContent = 'Total: ';

    const totalAmountSpan = document.createElement('SPAN');
    totalAmountSpan.id = 'amount';
    totalAmountSpan.textContent = '0';

    const totalDolarSign = document.createElement('SPAN');
    totalDolarSign.id = 'dolar-sign';
    totalDolarSign.textContent = '$';

    totalText.appendChild(totalDolarSign);
    totalText.appendChild(totalAmountSpan);
    totalDiv.appendChild(totalText);

    return totalDiv;
  };
  
  document.getElementById('other-title').classList.add('is-hidden');

  const otherSibling = document.getElementById('title');

  document.getElementById('payment').options[1].setAttribute('selected', '');

  document.getElementById('credit-card').nextElementSibling.id = 'paypal';
  document.getElementById('credit-card').nextElementSibling.nextElementSibling.id = 'bitcoin';

  document.getElementById('name').setAttribute('placeholder', 'Your Name');
  document.getElementById('mail').setAttribute('placeholder', 'email@example.com');

  document.getElementById('cc-num').setAttribute('placeholder', '4293019564738124');
  document.getElementById('zip').setAttribute('placeholder', '55567');
  document.getElementById('cvv').setAttribute('placeholder', '674');

  document.getElementsByClassName('activities')[0].appendChild(addTotalContainer());

  document.getElementById('colors-js-puns').classList.add('is-hidden');
})();

/**
 * [errors is a object for all the error messages ]
 * @type {Object}
 */
const errors = {
  name: {
    empty: 'Please provide your name - don\'t be a stranger ;)',
    errorId: 'name-error'
  },
  email: {
    empty: 'Please provide an email - we just need it to send you the ticket',
    notValid: 'Please provide a valid E-Mail address - example: we.love@code.com',
    errorId: 'email-error'
  },
  otherTitle: {
    empty: 'Please provide your Job Title.',
    errorId: 'other-title-error'
  },
  checkboxes: {
    empty: 'Please select at least one activity.',
    errorId: 'checkboxes-error'
  },
  creditcard: {
    between: 'Please enter a number that is between 13 and 16 digits long.',
    onlyDigits: 'Only digits are allowed for the Credit Card Number',
    errorId: 'credit-card-error'
  },
  zipcode: {
    notEnough: 'Zip code should be 5 digits long.',
    onlyDigits: 'Only digits are allowed for the Zip code.',
    errorId: 'zipcode-error'
  },
  cvv: {
    notValid: 'CVV not valid - CVV has 3 digits, check your card.',
    onlyDigits: 'Only digits are allowed for the CVV.',
    errorId: 'cvv-error'
  }
};

/**
 * [addEventListeners function which let's you bind more than 1 eventListener to a element]
 * @param {[DOMElement]}   element [element to which the listeners should be bound to]
 * @param {[Event]}   events  [Events which have to be appended to the element]
 * @param {Function} fn      [event function that handles the fired events ]
 */
const addEventListeners = (element, events, fn) => {
  events.forEach(el => element.addEventListener(el, fn, true));
};

const paymentCredit = document.getElementById('credit-card');
const paymentPaypal = paymentCredit.nextElementSibling;
const paymentBitcoin = paymentPaypal.nextElementSibling;

const paymentContainers = [paymentCredit, paymentPaypal, paymentBitcoin];

paymentPaypal.classList.add('is-hidden');
paymentBitcoin.classList.add('is-hidden');

const totalDiv = document.getElementById('total-div');
const totalAmount = document.getElementById('amount');

const checkboxes = document.querySelectorAll('input[type=checkbox]');

/**
 * [elementHideToggler function that either hides or show the inputed DOM element]
 * @param  {[DOMElement]} element [element to toggle]
 * @param  {[Boolean]} hide    [boolean weather the element has to hidden or shown]
 * @return {[NULL]}         [function has no return value - DOM Element is directly modified]
 */
const elementHideToggler = (element, hide) =>
  hide ? element.classList.add('is-hidden') : element.classList.remove('is-hidden');

/**
 * [emailValidator function that validates the email structure - example: we.love@code.com]
 * @param  {[String]} email [email string value to be validated]
 * @return {[Boolean]}       [boolean value - true(email passed)/false(email failed)]
 */
const emailValidator = (email) => {
  const mailRegExp = /\S+@\S+\.\S+/;
  return mailRegExp.test(email);
};

/**
 * [toggleShirtColors toggling function for the shirt colors]
 * @param  {[Boolean]} toggleArray       [array of booleans to show which options to toggle]
 * @param  {[DOMElement]} colorOptionsArray [select element options]
 * @return {[NULL]}                   [function has no return value]
 */
const toggleShirtColors = (toggleArray, colorOptionsArray) => {
  let firstSelected = false;

  if (!firstSelected) {
    toggleArray.map((value, index) => {
      if (value && !firstSelected) {
        firstSelected = true;
        colorOptionsArray.selectedIndex = index;
      }
      value
        ? colorOptionsArray[index].classList.remove('is-hidden')
        : colorOptionsArray[index].classList.add('is-hidden');
    });
  }
};

/**
 * [themeSelector function that reads and selects the theme from the select]
 * @param  {[String]} selectedTheme [string representation of which theme was selected]
 * @param  {[Array<DOMElement>]} colorOptions  [array of options]
 * @return {[NULL]}               [function has no return value]
 */
const themeSelector = (selectedTheme, colorOptions) => {
  selectedTheme === 'js puns'
    ? toggleShirtColors([true, true, true, false, false, false], colorOptions)
    : toggleShirtColors([false, false, false, true, true, true], colorOptions);
};

/**
 * [checkboxToggler Function which actually toggles the ]
 * @param  {[Array]} toggleCheckboxes [array which checkboxes are to be checked]
 * @param  {[Number]} checked          [number - selectedIndex]
 * @return {[NULL]}                  [function has no return value]
 */
const checkboxToggler = (toggleCheckboxes, checked) => {
  for (let i = 0; i < toggleCheckboxes.length; i++) {
    if (checked) {
      toggleCheckboxes[i].setAttribute('disabled', '');
      toggleCheckboxes[i].parentNode.style.color = '#184f68';
    } else {
      toggleCheckboxes[i].removeAttribute('disabled');
      toggleCheckboxes[i].parentNode.removeAttribute('style');
    }
  }
};

/**
 * [paymentToggler function toggles one of the payment options and hides others]
 * @param  {[Array<DOMElement>]} payContainers [array of DOMElements to be toggled]
 * @param  {[Number]} iValue        [number value which payment should be shown]
 * @return {[NULL]}               [function has no return value]
 */
const paymentToggler = (payContainers, iValue) => {
  for (let i = 0; i < 3; i++) {
    if (iValue === i) {
      elementHideToggler(paymentContainers[i], false);
    } else {
      elementHideToggler(paymentContainers[i], true);
    }
  }
};

/**
 * [checkboxChecker function checks which checkbox was checked]
 * @param  {[DOMElement]} selected      [element which was selected]
 * @param  {[Array<DOMElement>]} allCheckboxes [array of all checkboxes]
 * @return {[NULL]}               [description]
 */
const checkboxChecker = (selected, allCheckboxes) => {
  switch (selected.name) {
  case 'js-frameworks':
    checkboxToggler([allCheckboxes[3]], selected.checked);
    break;
  case 'js-libs':
    checkboxToggler([allCheckboxes[4]], selected.checked);
    break;
  case 'express':
    checkboxToggler([allCheckboxes[1]], selected.checked);
    break;
  case 'node':
    checkboxToggler([allCheckboxes[2]], selected.checked);
    break;
  default:
    break;
  }
};

/**
 * [activitiesActions function that tracks changes in the activities fieldset]
 * @param  {[Number]} amount           [price value for a selected checkbox]
 * @param  {[Boolean]} addOrSubstract   [if checkbox was checked or not]
 * @param  {[DOMElement]} selectedCheckbox [which checkbox was selected]
 * @param  {[Array<DOMElement>]} checkboxes       [array of all checkboxes]
 * @return {[NULL]}                  [function has no return value]
 */
const activitiesActions = (amount, addOrSubstract, selectedCheckbox, checkboxes) => {
  updateTotal(amount, addOrSubstract);
  checkboxChecker(selectedCheckbox, checkboxes);
};

/**
 * [updateTotal function that updates the "total value" element]
 * @param  {[Number]} amount         [amount for a selected checkbox / course]
 * @param  {[Boolean]} addOrSubstract [boolean if the total amount has to be added or substracted]
 * @return {[NULL]}                [function has no return value]
 */
const updateTotal = (amount, addOrSubstract) => {
  const amountNumber = parseInt(amount, 10);
  let newTotal;

  if (addOrSubstract) {
    newTotal = parseInt(totalAmount.textContent, 10) + amountNumber;
  } else {
    newTotal = parseInt(totalAmount.textContent, 10) - amountNumber;
  }

  totalAmount.textContent = newTotal;
  newTotal === 0 ? totalDiv.classList.add('is-hidden') : totalDiv.classList.remove('is-hidden');
};

/**
 * [errorCreator function creates an error div based on the parameters]
 * @param  {[String]} errorText [error text]
 * @param  {[String]} errorId   [error ID or "id" for the error element]
 * @return {[DOMElement]}           [returns a DOMElement div - the error div]
 */
const errorCreator = (errorText, errorId) => {
  const div = document.createElement('DIV');
  div.id = errorId;
  div.style.color = 'red';
  div.style.marginBottom = '10px';
  div.style.display = 'block';

  const error = document.createElement('SPAN');
  error.textContent = errorText;

  div.appendChild(error);

  return div;
};

/**
 * [insertError function inserts the generated error element after a selected element]
 * @param  {[DOMElement]} parentDiv         [parent div / referrence element]
 * @param  {[DOMElement]} nodeToInsert      [element Node to insert]
 * @param  {[DOMElement]} nodeToInsertAfter [after which element the div should be inserted]
 * @return {[NULL]}                   [function has no return value]
 */
const insertError = (parentDiv, nodeToInsert, nodeToInsertAfter) => parentDiv.insertBefore(nodeToInsert, nodeToInsertAfter.nextSibling);

/**
 * [removeError function removes an DOMElement - the error div]
 * @param  {[DOMElement]} errorContainer [which element to remove]
 * @return {[NULL]}                [function has no return value]
 */
const removeError = errorContainer => errorContainer.remove();

/**
 * [errorPainter function paints the element with an error RED :)]
 * @param  {[DOMElement]} elementToPaint [element that has to be painted]
 * @param  {[Boolean]} paint          [boolean if the element should be painted or cleared]
 * @return {[NULL]}                [function has no return value]
 */
const errorPainter = (elementToPaint, paint) => {
  if(paint) {
    elementToPaint.style.border = '2px solid red';
    elementToPaint.style.color = 'red';
  } else {
    elementToPaint.style.border = '0';
    elementToPaint.style.color = 'inherit';
  }
};

/**
 * [onlyDigitsInInput function tests if the input has only digits]
 * @param  {[Any]} inputValue [value to be checked]
 * @return {[Boolean]}            [returns true = only numbers / false = characters present]
 */
const onlyDigitsInInput = (inputValue) => /^\d+$/.test(inputValue);

/**
 * [nameFieldNotEmpty function checkes if the name field is not empty and appends an error if so]
 * @param  {[String]} nameFieldValue [value of the input field]
 * @param  {[DOMElement]} element        [name field div]
 * @return {[Boolean]}                [true if name field isn't empty and false if it's not]
 */
const nameFieldNotEmpty = (nameFieldValue, element) => {
  if(nameFieldValue.length === 0) {
    if (element.nextElementSibling && !element.nextElementSibling.id.includes('error')) {
      insertError(element.parentNode, errorCreator(errors.name.empty, errors.name.errorId), element);
      errorPainter(element, true);
    }
    return false;
  } else {
    if (element.nextSibling.id === 'name-error') {
      removeError(element.nextSibling);
      errorPainter(element, false);
    }
  }
  return true;
};

/**
 * [emailInputFn function that reacts to every input value in the email field]
 * @param  {[String]} inputValue [input value of the email field]
 * @param  {[DOMElement]} element    [referrence to the email input field]
 * @return {[NULL]}            [function has no return value]
 */
const emailInputFn = (inputValue, element) => {
  const mailValidated = emailValidator(inputValue);

  if(element.nextElementSibling.id === 'email-error') {
    removeError(element.nextElementSibling);
  }

  if(inputValue.length === 0 || !mailValidated) {
    if(element.nextElementSibling.id !== 'email-error') {
      insertError(element.parentNode, errorCreator(errors.email.notValid, errors.email.errorId), element);
      errorPainter(element, true);
    }
  } else {
    if (element.nextElementSibling.id === 'email-error') {
      removeError(element.nextElementSibling);
    }
    errorPainter(element, false);
  }
};

/**
 * [emailBlurFn function checks if email field is empty when blurred]
 * @param  {[String]} inputValue [value of email input field]
 * @param  {[DOMElement]} element    [referrence to email field]
 * @return {[NULL]}            [function has no return value]
 */
const emailBlurFn = (inputValue, element) => {
  if(inputValue.length === 0) {
    if (element.nextElementSibling && element.nextElementSibling.id.includes('error')) {
      removeError(element.nextSibling);
    }

    insertError(element.parentNode, errorCreator(errors.email.empty, errors.email.errorId), element);
    errorPainter(event.target, true);
  }
};

/**
 * [emailRealTimeChecker main event listener function to check which event was fired]
 * @param  {[Event]} event [event triggered]
 * @return {[NULL]}       [function has no return value]
 */
const emailRealTimeChecker = (event) => {
  if(event.type === 'input') {
    emailInputFn(event.target.value, event.target);
  } else if(event.type === 'blur') {
    emailBlurFn(event.target.value, event.target);
  }
};

/**
 * [emptyMailChecker function is fired on submit to check if the email value is empty]
 * @param  {[String]} value   [value of the email field]
 * @param  {[DOMElement]} element [email field referrence]
 * @return {[Boolean]}         [true = email is not empty / false = email is empty]
 */
const emptyMailChecker = (value, element) => {
  if(value.length === 0) {
    if (element.nextElementSibling && !element.nextElementSibling.id.includes('error')) {
      insertError(element.parentNode, errorCreator(errors.email.empty, errors.email.errorId), element);
      errorPainter(element, true);
    }
    return false;
  }
  return true;
};

/**
 * [atLeastOneCheckboxChecked function checks if at least one checkbox was checked]
 * @param  {[Array<DOMElement>]} checkboxes [all checkboxes]
 * @param  {[DOMElement]} element    [fieldset activities referrence]
 * @return {[Boolean]}            [true = at least one checkbox is checked / false = no checkbox is checked]
 */
const atLeastOneCheckboxChecked = (checkboxes, element) => {
  let checkedCheckboxesCounter = 0;

  for(let i = 0; i < checkboxes.length; i++) {
    if(checkboxes[i].checked) {
      checkedCheckboxesCounter++;
    }
  }

  if(checkedCheckboxesCounter === 0) {
    if(element.nextElementSibling && !element.nextElementSibling.id.includes('error')) {
      insertError(element.parentNode, errorCreator(errors.checkboxes.empty, errors.checkboxes.errorId), element);
    }
    return false;
  } else {
    if (element.nextSibling.id === 'checkboxes-error') {
      removeError(element.nextSibling);
    }
    return true;
  }
};

/**
 * [creditCardChecker function checks if credit card data complies]
 * @param  {[String]} value   [value of the credit card input]
 * @param  {[DOMElement]} element [credit card field referrence]
 * @return {[Boolean]}         [true = value complies / false = value doesn't comply]
 */
const creditCardChecker = (value, element) => {
  if(element.nextSibling !== null && element.nextSibling.id === 'credit-card-error') {
    removeError(element.nextSibling);
    errorPainter(element, false);
  }

  if(value === null || value.length < 13 || value.length > 16) {
    insertError(element.parentNode, errorCreator(errors.creditcard.between, errors.creditcard.errorId), element);
    errorPainter(element, true);
    return false;
  } else {
    if(onlyDigitsInInput(value)) {
      return true;
    } else {
      insertError(element.parentNode, errorCreator(errors.creditcard.onlyDigits, errors.creditcard.errorId), element);
      errorPainter(element, true);
      return false;
    }
  }

};

/**
 * [zipChecker check if zipcode data complies]
 * @param  {[String]} value   [value of the zipcode input]
 * @param  {[DOMElement]} element [zipcode field referrence]
 * @return {[Boolean]}         [true = value complies / false = value doesn't comply]
 */
const zipChecker = (value, element) => {
  if(element.nextSibling !== null && element.nextSibling.id === 'zipcode-error') {
    removeError(element.nextSibling);
    errorPainter(element, false);
  }

  if(value === null || value.length !== 5) {
    insertError(element.parentNode, errorCreator(errors.zipcode.notEnough, errors.zipcode.errorId), element);
    errorPainter(element, true);
    return false;
  } else {
    if(onlyDigitsInInput(value)) {
      return true;
    } else {
      insertError(element.parentNode, errorCreator(errors.zipcode.onlyDigits, errors.zipcode.errorId), element);
      errorPainter(element, true);
      return false;
    }
  }
};

/**
 * [cvvChecker function checks if cvv field complies with the tests]
 * @param  {[String]} value   [value of cvv field input]
 * @param  {[DOMElement]} element [cvv field referrence]
 * @return {[Boolean]}         [true = input complies / false = doesn't comply]
 */
const cvvChecker = (value, element) => {
  if(element.nextSibling !== null && element.nextSibling.id === 'cvv-error') {
    removeError(element.nextSibling);
    errorPainter(element, false);
  }

  if(value === null || value.length !== 3) {
    insertError(element.parentNode, errorCreator(errors.cvv.notValid, errors.cvv.errorId), element);
    errorPainter(element, true);
    return false;
  } else {
    if(onlyDigitsInInput(value)) {
      return true;
    } else {
      insertError(element.parentNode, errorCreator(errors.cvv.notValid, errors.cvv.errorId), element);
      errorPainter(element, true);
      return false;
    }
  }
};

/**
 * [creditCardDataPassed function checks if credit card was selected and check the inputs]
 * @param  {[Number]} selectedIndex [which payment option was selected]
 * @param  {[Any]} ccValue       [credit card value]
 * @param  {[DOMElement]} ccElement     [credit card element referrence]
 * @param  {[Any]} zipValue      [zip input value]
 * @param  {[DOMElement]} zipElement    [zipcode element referrence]
 * @param  {[Any]} cvvValue      [cvv input value]
 * @param  {[DOMElement]} cvvElement    [cvv element referrence]
 * @return {[Boolean]}               [description]
 */
const creditCardDataPassed = (selectedIndex, ccValue, ccElement, zipValue, zipElement, cvvValue, cvvElement) => {
  if(selectedIndex === 1) {
    const creditCardField = creditCardChecker(ccValue, ccElement);
    const zipField = zipChecker(zipValue, zipElement);
    const cvvField = cvvChecker(cvvValue, cvvElement);

    return creditCardField && zipField && cvvField;
  } else {
    return true;
  }
};

/**
 * [event listener that hides or show other job title element]
 * @type {[Change]}
 */
document.getElementById('title').addEventListener('change', (event) => {
  const otherContainer = event.target.nextElementSibling;

  event.target.value === 'other'
    ? elementHideToggler(otherContainer, false)
    : elementHideToggler(otherContainer, true);
});

/**
 * [event listener whuch checks which theme was selected]
 * @type {[Change]}
 */
document.getElementById('design').addEventListener('change', (event) => {
  elementHideToggler(document.getElementById('colors-js-puns'), event.target.value === 'Select Theme');

  if (event.target.value !== 'Select Theme') {
    themeSelector(event.target.value, document.getElementById('color').options);
  }
});

/**
 * [event listener that checks changes to activities checkboxes]
 * @type {[Change]}
 */
document.getElementsByClassName('activities')[0].addEventListener('change', (event) => {
  const checkedBox = event.target;
  const checked = event.target.checked;
  const amountValue = event.target.parentNode.textContent;
  const dolarIndex = amountValue.indexOf('$');

  activitiesActions (
    amountValue.substring(dolarIndex + 1, amountValue.length),
    checked,
    checkedBox,
    checkboxes
  );
});

/**
 * [event listener listens to changes on select for payment options]
 * @type {[Change]}
 */
document.getElementById('payment').addEventListener('change', (event) => {
  const selectedPayment = event.target.value;

  switch (selectedPayment) {
  case 'credit card':
    paymentToggler(paymentContainers, 0);
    break;
  case 'paypal':
    paymentToggler(paymentContainers, 1);
    break;
  case 'bitcoin':
    paymentToggler(paymentContainers, 2);
    break;
  default:
    for (let i = 0; i < 3; i++) {
      elementHideToggler(paymentContainers[i], true);
    }
  }
});

/**
 * [event listener for submit event]
 * @type {[Submit]}
 */
document.getElementsByTagName('form')[0].addEventListener('submit', (event) => {
  const nameField = nameFieldNotEmpty(event.target[1].value, event.target[1]);
  const checkboxesField = atLeastOneCheckboxChecked(event.target[9].elements, event.target[9]);
  const emailField = emptyMailChecker(event.target[2].value, event.target[2]);
  const creditCardField = creditCardDataPassed( event.target[18].selectedIndex,
    event.target[19].value, event.target[19],
    event.target[20].value, event.target[20],
    event.target[21].value, event.target[21]);

  if( !nameField || !checkboxesField || !emailField || !creditCardField) {
    event.preventDefault();
  }
}, true);

/**
 * binding input and blur events to the mail input
 */
addEventListeners(document.getElementById('mail'), ['input', 'blur'], emailRealTimeChecker);
