(async () => {
  const container = document.querySelector('.container');
  const spendingList = container.querySelector('.spending__list');
  const response = await fetch('./js/data.json');
  const data = await response.json();
  const amounts = data.map(item => item.amount);
  const max = Math.max(...amounts);
  const indexOfMax = data.indexOf(data.find(item => item.amount === max));

  data.forEach((spending, index) => {
    const spendingWithIndex = { ...spending, index }
    createSpendingElement(spendingWithIndex);
  });

  function createSpendingElement(spending){
    const { day, amount, index } = spending;
    
    const spendingElement = document.createElement('li');
    const spendingElementClasses = ['list__spending-item'];
    if(index === indexOfMax) spendingElementClasses.push('max');
    spendingElement.classList.add(...spendingElementClasses);

    const spendingElementText = document.createElement('p');
    spendingElementText.classList.add('spending-item__text');
    spendingElementText.textContent = day;

    const spendingElementAmount = document.createElement('div');
    spendingElementAmount.classList.add('spending-item__amount');
    spendingElementAmount.style = '--amount: ' + amount + '%';

    const spendingElementAmountText = document.createElement('p');
    spendingElementAmountText.classList.add('spending-item__value');
    spendingElementAmountText.textContent = `$${amount}`;

    spendingElement.appendChild(spendingElementAmountText);
    spendingElement.appendChild(spendingElementAmount);
    spendingElement.appendChild(spendingElementText);

    spendingList.appendChild(spendingElement);
  }
})();