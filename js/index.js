(() => {
  document.getElementById('name').focus();
  
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
    empty: 'Please fill out your Credit card number.',
    between: 'Please enter a number that is between 13 and 16 digits long.',
    onlyDigits: 'Only digits are allowed for the Credit Card Number',
    errorId: 'credit-card-error'
  },
  zipcode: {
    empty: 'Please provide your zip code.',
    notEnough: 'Zip code should be 5 digits long.',
    onlyDigits: 'Only digits are allowed for the Zip code.',
    errorId: 'zipcode-error'
  },
  cvv: {
    empty: 'Please provide your CVV.',
    notValid: 'CVV not valid - CVV has 3 digits, check your card.',
    onlyDigits: 'Only digits are allowed for the CVV.',
    errorId: 'cvv-error'
  }
};

const buttonElement = document.getElementsByTagName('button')[0];

const disableElement = (elementToDisable) => {
  elementToDisable.disabled = true;
  elementToDisable.style.backgroundColor = 'lightgray';
  elementToDisable.style.cursor = 'initial';
};

const enableElement = (elementToEnable) => {
  elementToEnable.disabled = false;
  elementToEnable.style.backgroundColor = '#22627e';
  elementToEnable.style.cursor = 'pointer';
};

const submitBtnToggler = (elementToToggle, elementBoolean) => {
  if(elementBoolean) {
    disableElement(elementToToggle);
  } else {
    enableElement(elementToToggle);
  }
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

const elementHideToggler = (element, hide) =>
  hide ? element.classList.add('is-hidden') : element.classList.remove('is-hidden');

const emailValidator = (email) => {
  const mailRegExp = /\S+@\S+\.\S+/;
  return mailRegExp.test(email);
};

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

const themeSelector = (selectedTheme, colorOptions) => {
  selectedTheme === 'js puns'
    ? toggleShirtColors([true, true, true, false, false, false], colorOptions)
    : toggleShirtColors([false, false, false, true, true, true], colorOptions);
};

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

const checkboxChecker = (selected, allCheckboxes) => {
  switch (selected.name) {
    case 'js-frameworks':
      checkboxToggler([allCheckboxes[3], allCheckboxes[5]], selected.checked);
      break;
    case 'js-libs':
      checkboxToggler([allCheckboxes[4], allCheckboxes[6]], selected.checked);
      break;
    case 'express':
      checkboxToggler([allCheckboxes[1], allCheckboxes[5]], selected.checked);
      break;
    case 'node':
      checkboxToggler([allCheckboxes[2], allCheckboxes[6]], selected.checked);
      break;
    case 'build-tools':
      checkboxToggler([allCheckboxes[3], allCheckboxes[1]], selected.checked);
      break;
    case 'npm':
      checkboxToggler([allCheckboxes[4], allCheckboxes[2]], selected.checked);
      break;
    default:
      break;
  }
};

const activitiesActions = (amount, addOrSubstract, selectedCheckbox, checkboxes) => {
  updateTotal(amount, addOrSubstract);
  checkboxChecker(selectedCheckbox, checkboxes);
};

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

const errorCreator = (errorText, errorId) => {
  const div = document.createElement('DIV');
  div.id = errorId;
  div.style.color = 'red';
  div.style.marginBottom = '10px';
  
  const span = document.createElement('SPAN');
  span.textContent = errorText;
  
  div.appendChild(span);
  
  return div;
};

const insertError = (parentDiv, nodeToInsert, nodeToInsertAfter) => parentDiv.insertBefore(nodeToInsert, nodeToInsertAfter.nextSibling);

const removeError = errorContainer => errorContainer.remove();

const errorPainter = (elementToPaint, paint) => {
  if(paint) {
    elementToPaint.style.border = '2px solid red';
    elementToPaint.style.color = 'red';
  } else {
    elementToPaint.style.border = '0';
    elementToPaint.style.color = 'inherit';
  }
};

document.getElementById('name').addEventListener('blur', (event) => {
  if(event.target.value.length === 0) {
    if(event.target.nextSibling.id !== errors.name.errorId) {
      insertError(event.target.parentNode, errorCreator(errors.name.empty, errors.name.errorId), event.target);
      submitBtnToggler(buttonElement, true);
    }
  } else {
    removeError(event.target.nextSibling);
    submitBtnToggler(buttonElement, false);
  }
});

document.getElementById('mail').addEventListener('input', (event) => {
  const mailPassed = emailValidator(event.target.value);
  
  if(event.target.nextSibling.id === 'mail-error') {
    removeError(event.target.nextSibling);
  }
  
  if(event.target.value.length === 0 || !mailPassed) {
    if(event.target.nextSibling.id !== 'mail-failed-error') {
      insertError(event.target.parentNode, errorCreator(errors.email.notValid, 'mail-failed-error'), event.target);
      errorPainter(event.target, true);
      submitBtnToggler(buttonElement, true);
    }
  } else {
    if (event.target.nextSibling.id === 'mail-failed-error') {
      removeError(event.target.nextSibling);
    }
    errorPainter(event.target, false);
    submitBtnToggler(buttonElement, false);
  }
});

document.getElementById('mail').addEventListener('blur', (event) => {
  if (event.target.value.length === 0) {
    if(event.target.nextSibling.id !== 'mail-error') {
      insertError(event.target.parentNode, errorCreator(errors.email.empty, 'mail-error'), event.target);
      errorPainter(event.target, true);
      submitBtnToggler(buttonElement, true);
    }
  } else {
    if (event.target.nextSibling.id === 'mail-error') {
      removeError(event.target.nextSibling);
      submitBtnToggler(buttonElement, false);
    }
    errorPainter(event.target, false);
  }
});

document.getElementById('title').addEventListener('change', (event) => {
  const otherContainer = event.target.nextElementSibling;
  
  event.target.value === 'other'
    ? elementHideToggler(otherContainer, false)
    : elementHideToggler(otherContainer, true);
});



const paymentToggler = (payContainers, iValue) => {
  for (let i = 0; i < 3; i++) {
    if (iValue === i) {
      elementHideToggler(paymentContainers[i], false);
    } else {
      elementHideToggler(paymentContainers[i], true);
    }
  }
};

document.getElementById('other-title').addEventListener('blur', (event) => {
  if (event.target.value.length === 0) {
    if(event.target.nextSibling.id !== errors.otherTitle.errorId) {
      insertError(event.target.parentNode, errorCreator(errors.otherTitle.empty, errors.otherTitle.errorId), event.target);
      errorPainter(event.target, true);
      submitBtnToggler(buttonElement, true);
    }
  } else {
    if (event.target.nextSibling.id === errors.otherTitle.errorId) {
      removeError(event.target.nextSibling);
      submitBtnToggler(buttonElement, false);
    }
    errorPainter(event.target, false);
  }
});

document.getElementById('other-title').addEventListener('input', (event) => {
  if (event.target.value.length === 0) {
    if(event.target.nextSibling.id !== errors.otherTitle.errorId) {
      insertError(event.target.parentNode, errorCreator(errors.otherTitle.empty, errors.otherTitle.errorId), event.target);
      errorPainter(event.target, true);
    }
  } else {
    if (event.target.nextSibling.id === errors.otherTitle.errorId) {
      removeError(event.target.nextSibling);
    }
    errorPainter(event.target, false);
  }
});

document.getElementById('design').addEventListener('change', (event) => {
  elementHideToggler(document.getElementById('colors-js-puns'), event.target.value === 'Select Theme');
  
  if (event.target.value !== 'Select Theme') {
    themeSelector(event.target.value, document.getElementById('color').options);
  }
});

document.getElementsByClassName('activities')[0].addEventListener('change', (event) => {
  const checkedBox = event.target;
  const checked = event.target.checked;
  const amountValue = event.target.parentNode.textContent;
  const dolarIndex = amountValue.indexOf('$');
  
  activitiesActions (
    amountValue.substring(dolarIndex + 1,
      amountValue.length),
    checked,
    checkedBox,
    checkboxes
  );
});

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

const digitChecker = (inputValue) => /^\d+$/.test(inputValue);

const emptyCreditCardData = (blurredItem) => {

};

const ccNumChecker = (inputValue, element) => {
  console.log('Fire ccNumChecker');
  console.log('Value: ', inputValue);
  console.log('Element: ', element);
  
};

document.getElementById('credit-card').addEventListener('change', (event) => {
  const ccTargetId = event.target.id;
  console.log('Checking CC data: ', event.target);
  console.log('Event: ', event);
  
  
  switch (ccTargetId) {
    case 'cc-num':
      ccNumChecker(event.target.value, ccTargetId);
      break;
    case 'zip':
      
      break;
      
    case 'cvv':
      
      break;
      
    default:
      console.log('CC bluring element default: ', event.target.id);
      break;
  }
}, true);

document.getElementsByTagName('form')[0].addEventListener('submit', (event) => {
  console.log('Event submit: ', event);
}, true);
