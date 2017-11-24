(() => {
  document.getElementById('name').focus();
  
  const addTotalContainer = () => {
    console.log('Appending Total Container');
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
})();

const paymentCredit = document.getElementById('credit-card');
const paymentPaypal = paymentCredit.nextElementSibling;
const paymentBitcoin = paymentPaypal.nextElementSibling;

const paymentContainers = [paymentCredit, paymentPaypal, paymentBitcoin];

paymentPaypal.classList.add('is-hidden');
paymentBitcoin.classList.add('is-hidden');

const totalDiv = document.getElementById('total-div');
const totalAmount = document.getElementById('amount');

const extractActivities = () => {
  const checkboxes = document.querySelectorAll('input[type=checkbox]');
  const activitiesArray = [];
  
  for (let i = 0; i < checkboxes.length; i++) {
    const textnode = checkboxes[i].parentNode.textContent;
    const activityObject = {};
    const delimiterIndex = checkboxes[i].parentNode.textContent.indexOf('—');
    activityObject.text = textnode.slice(0, delimiterIndex);
    console.log(activityObject.text);
  }
};

const activities = extractActivities();

const insertError = (parentDiv, nodeToInsert, nodeToInsertAfter) => parentDiv.insertBefore(nodeToInsert, nodeToInsertAfter.nextSibling);

const removeError = errorContainer => errorContainer.remove();

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

const errorPainter = (elementToPaint, paint) => {
  if(paint) {
    elementToPaint.style.border = '2px solid red';
    elementToPaint.style.color = 'red';
  } else {
    elementToPaint.style.border = '0';
    elementToPaint.style.color = 'inherit';
  }
};

const elementHideToggler = (element, hide) =>
  hide ? element.classList.add('is-hidden') : element.classList.remove('is-hidden');

const emailValidator = (email) => {
  const mailRegExp = /\S+@\S+\.\S+/;
  return mailRegExp.test(email);
};

document.getElementById('mail').addEventListener('input', (event) => {
  const mailPassed = emailValidator(event.target.value);
  
  if(event.target.value.length === 0 || !mailPassed) {
    if(event.target.nextSibling.id !== 'mail-error') {
      insertError(event.target.parentNode, errorCreator('Please provide an valid email.', 'mail-error'), event.target);
      errorPainter(event.target, true);
    }
  } else {
    removeError(event.target.nextSibling);
    errorPainter(event.target, false);
  }
});

document.getElementById('title').addEventListener('change', (event) => {
  const otherContainer = event.target.nextElementSibling;
  
  event.target.value === 'other'
    ? elementHideToggler(otherContainer, false)
    : elementHideToggler(otherContainer, true);
});

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

const checkboxToggler = (selected, allCheckboxes) => {
  console.log('SELECTED: ', selected.name);
  console.log('ALL CHECKBOXES: ', allCheckboxes);
  
  switch (selected.name) {
    case 'js-frameworks':
      allCheckboxes[3].setAttribute('disabled', '');
      break;
    case 'js-libs':
      break;
    case 'express':
      break;
    case 'node':
      break;
    case 'build-tools':
      break;
    case 'npm':
      break;
    default:
      break;
  }
};

const activitiesActions = (amount, addOrSubstract, selectedCheckbox, checkboxes) => {
  updateTotal(amount, addOrSubstract);
  checkboxToggler(selectedCheckbox, checkboxes);
};

document.getElementsByClassName('activities')[0].addEventListener('change', (event) => {
  const checkedBox = event.target;
  const checked = event.target.checked;
  const amountValue = event.target.parentNode.textContent;
  const dollarIndex = amountValue.indexOf('$');
  const checkboxes = document.querySelectorAll('input[type=checkbox]');
  
  activitiesActions (
    amountValue.substring(dollarIndex + 1,
    amountValue.length),
    checked,
    checkedBox,
    checkboxes
  );
});


const paymentShowContainer = (options, containers) => {
  const optionLength = options.length;
  const selectedOptionIndex = options.selectedIndex;
  
  for (let i = 0; i < optionLength; i++) {
    
  }
};

document.getElementById('payment').addEventListener('change', (event) => {
  const selectedPayment = event.target.value;
  
  switch (selectedPayment) {
    case 'credit card':
      for (let i = 0; i < 3; i++) {
        if (i === 0) {
          elementHideToggler(paymentContainers[i], false);
        } else {
          elementHideToggler(paymentContainers[i], true);
        }
      }
      break;
    case 'paypal':
      for (let i = 0; i < 3; i++) {
        if (i === 1) {
          elementHideToggler(paymentContainers[i], false);
        } else {
          elementHideToggler(paymentContainers[i], true);
        }
      }
      break;
    case 'bitcoin':
      for (let i = 0; i < 3; i++) {
        if (i === 2) {
          elementHideToggler(paymentContainers[i], false);
        } else {
          elementHideToggler(paymentContainers[i], true);
        }
      }
      break;
    default:
      for (let i = 0; i < 3; i++) {
        elementHideToggler(paymentContainers[i], true);
      }
  }
  for (let i = 0; i < paymentContainers.length; i++) {
  }
  
  paymentShowContainer(selectedPayment, paymentContainers);
});
