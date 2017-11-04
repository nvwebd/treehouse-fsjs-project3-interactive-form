'use strict';
/*
  Self enclosing function that runs on index.js load - sets focus to name input field, sets credit card payment option as default, hides paypal and bitcoin containers
*/
(() => {
  document.getElementById('name').focus();
  document.getElementById('payment').options[1].setAttribute('selected', '');
  document.getElementById('paypal').classList.add('is-hidden');
  document.getElementById('bitcoin').classList.add('is-hidden');
})();

const savedSelectOptions = document.getElementById('color').options;

const browserChecker = () => {
  if (navigator.userAgent.search('MSIE') !== -1) {
    return 'msie';
  }
  else if (navigator.userAgent.search('Chrome') !== -1) {
    return 'chrome';
  }
  else if (navigator.userAgent.search('Firefox') !== -1) {
    return 'firefox';
  }
  else if (navigator.userAgent.search('Safari') !== -1) {
    return 'safari';
  }
  else if (navigator.userAgent.search('Opera') !== -1) {
    return 'opera';
  }
};

const browser = browserChecker();

const createJobRoleInput = () => {
  const input = document.createElement('INPUT');

  input.id = 'other-title';
  input.setAttribute('placeholder', 'Your Job Role');
  input.setAttribute('type', 'text');

  return input;
};

const appendChildElement = (parent, child) => {
  parent.appendChild(child);
};

const addClassToElement = (elementToAddClass, classToAdd) => elementToAddClass.classList.add(classToAdd);

const removeClassFromElement = (elementToRemoveClass, classToRemove) => elementToRemoveClass.classList.add(classToRemove);

const removeChildElement = (remove) => remove.remove();

const elementChecker = (parent, elementToCheck) => parent.contains(elementToCheck);

const attributeSetter = (elementToAddTheAttribute, attributeToSet) => elementToAddTheAttribute.setAttribute(attributeToSet, '');

const attributeRemover = (elementToRemoveTheAttribute, attributeToRemove) => elementToRemoveTheAttribute.removeAttribute(attributeToRemove);

const removeOption = (removeOption) => removeOption.remove();

const enableDisableColorOptions = (colorOptions, optionsToDisable) => {
  const lengthOfColorOptions = colorOptions.length;
  const hide = 'hidden';

  for(let i = 0; i < lengthOfColorOptions; i++) {
    if(colorOptions[i].value === optionsToDisable[0] || colorOptions[i].value === optionsToDisable[1] || colorOptions[i].value === optionsToDisable[2]) {
      if(browser === 'msie' || browser === 'safari') {
        removeOption(colorOptions[i]);
      } else {
        attributeSetter(colorOptions[i], hide);
      }
    } else {
      attributeRemover(colorOptions[i], hide);
    }
  }
};

const getOptionsToHide = (designType) => {
  if(designType === 'js puns') {
    return ['tomato', 'steelblue', 'dimgrey'];
  } else if (designType === 'heart js') {
    return ['cornflowerblue', 'darkslategrey', 'gold'];
  }
};

const toggleColorOptions = (colorOptions, designType) => {
  switch(designType) {
  case 'js puns':
    // enable "Cornflower Blue," "Dark Slate Grey," and "Gold."
    enableDisableColorOptions(colorOptions, getOptionsToHide(designType));
    break;
  case 'heart js':
    // enable "Tomato," "Steel Blue," and "Dim Grey."
    enableDisableColorOptions(colorOptions, getOptionsToHide(designType));
    break;
  default:
    // enable all color selections
    break;
  }
};

document.getElementById('title').addEventListener('input', (event) => {
  if(event.target.value === 'other') {
    appendChildElement(event.target.parentNode, createJobRoleInput(event.target.parentNode));
  } else {
    const otherInput = document.getElementById('other-title');
    if(elementChecker(event.target.parentNode, otherInput)) {
      otherInput.remove();
    }
  }
});

document.getElementById('design').addEventListener('input', (event) => {
  let colorSelectOptions = savedSelectOptions;
  const designType = event.target.value;

  // if(browser === 'msie' || browser === 'safari') {
  console.log('savedSelectOptions: ', savedSelectOptions);
  console.log('colorSelectOptions: ', colorSelectOptions);
  //   let colorSelectOptions = savedSelectOptions;
  // }

  switch(designType) {
  case 'js puns':
    toggleColorOptions(colorSelectOptions, designType);
    break;
  case 'heart js':
    toggleColorOptions(colorSelectOptions, designType);
    break;
  default:
    // show all options
    break;
  }
});

const getDateTimes = () => {};

const getPrices = (checkboxes, checkboxesLength) => {
  const priceExtracter = /\$(\d+)/;
  const priceArray = [];

  for(let i = 0; i < checkboxesLength - 1 ; i++) {
    priceArray.push(checkboxes[i].nextSibling.textContent.match(priceExtracter)[1]);
  }

  return priceArray;
};

const createTotalCount = () => {
  const legend = document.createElement('LEGEND');
  legend.id = 'total';

  return legend;
};

const updateTotal = (updateTotalCount) => {

};

const getCheckedActivities = (checkboxes, checkboxesLength) => {
  const checkedActivities = [];
  for(let i = 0; i < checkboxesLength; i++) {
    if(checkboxes.checked) {
      console.log('Checked: ', checkboxes[i]);
      checkedActivities.push(checkboxes[i]);
    }
  }
};

const getCheckboxes = (fieldSet, fieldSetLength) => {
  const checkboxes = [];

  for(let i = 0; i < fieldSetLength; i++) {
    if(fieldSet[i].children.length !== 0){
      if(fieldSet[i].children[0].type === 'checkbox') {
        checkboxes.push(fieldSet[i].children[0]);
      }
    }
  }

  return checkboxes;
};

document.getElementsByClassName('activities')[0].addEventListener('change', (event) => {
  const checkboxesLength = event.target.parentNode.parentNode.children.length;
  const checkBoxes = getCheckboxes(event.target.parentNode.parentNode.children, checkboxesLength);

  const checkedCheckboxes = getCheckedActivities(checkBoxes, checkboxesLength);

  const dateTimes = '';

  const prices = getPrices(checkBoxes, checkboxesLength);

  console.log(prices);

  // console.log('checkBoxes: ', checkBoxes);

  if(elementChecker(event.target.parentNode.parentNode, document.getElementById('total'))) {
    console.log('Remove total!');
    removeChildElement(document.getElementById('total'));
  }


});

const paymentOptionsSwitcher = (paymentOptions, optionContainer) => {
  for(let i = 0; i < paymentOptions.length; i++){
    if(paymentOptions[i].value === optionContainer) {
      removeClassFromElement(paymentOptions[i], 'is-hidden');
    } else {
      addClassToElement(paymentOptions[i], 'is-hidden');
    }
  }
};

document.getElementById('payment').addEventListener('change', (event) => {
  console.log(event.target);
  switch(event.target.value) {
  case 'credit card':
    paymentOptionsSwitcher();
    break;
  case 'paypal':

    break;
  case 'bitcoin':

    break;
  }
});
