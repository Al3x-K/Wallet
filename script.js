const incomeSection = document.querySelector('.income-area');
const expenseSection = document.querySelector('.expenses-area');
const availableMoeny = document.querySelector('.available-money');
const addTransactionPanel = document.querySelector('.add-transaction-panel');

const nameInput = document.querySelector('#name');
const amountInput = document.querySelector('#amount');
const categorySelect = document.querySelector('#category');

const addTransactionBtn = document.querySelector('.add-transaction');
const saveBtn = document.querySelector('.save');
const cancelBtn = document.querySelector('.cancel');
const deleteBtn = document.querySelector('.delete');
const deleteAllBtn = document.querySelector('.delete-all');

const lightModeBtn = document.querySelector('.light');
const darkModeBtn = document.querySelector('.dark');

let root = document.documentElement;
let id = 0;
let categoryIcon;
let selecedCategory;
let moneyArray = [0];

const showPanel = () => 
{   
    addTransactionPanel.style.display = 'flex';
}

const hidePanel = () =>
{
    addTransactionPanel.style.display = 'none';
    clearInputs();
}

const checkForm = () => 
{
    if(nameInput.value !== '' && amountInput.value !== '' && categorySelect.value !== 'none')
    {
        createNewTransaction();
    }
    else
    {
        alert('Please fill in all fields!');
    }
}

const clearInputs = () =>
{
    nameInput.value = '';
    amountInput.value = '';
    categorySelect.selectedIndex = 0;
}

const createNewTransaction = () =>
{
    const newTransaction = document.createElement('div');
    newTransaction.classList.add('transaction');
    newTransaction.setAttribute('id', id);  

    checkCategory(selecedCategory); //  Check the selected category and set the icon accordingly
    //  Create the transaction element
    newTransaction.innerHTML = `
        <p class="transaction-name">${categoryIcon} ${nameInput.value}</p>
        <p class="transaction-amount">${amountInput.value}EUR
        <button class="delete" onclick="deleteTransaction(${id})"><i class="fas fa-times"></i></button>
        </p>
    `
    amountInput.value > 0 ? incomeSection.appendChild(newTransaction) && newTransaction.classList.add("income"): expenseSection.appendChild(newTransaction) && newTransaction.classList.add("expense"); // / Add the transaction to the appropriate section
    
    moneyArray.push(parseFloat(amountInput.value));
    countMoney(moneyArray); // Update the available money display

    hidePanel();
    id++;
    clearInputs();
}

const selectCategory = () =>
{
    selecedCategory = categorySelect.options[categorySelect.selectedIndex].text; // Get the selected category text
}

const checkCategory = transaction =>
{
    switch(transaction)
    {
        case '[ + ] Income':
            categoryIcon = '<i class="fas fa-money-bill-wave"></i>';
            break;
        case '[ - ] Food':
            categoryIcon = '<i class="fas fa-hamburger"></i>';
            break;
        case '[ - ] Shopping':
            categoryIcon = '<i class="fas fa-shopping-cart"></i>';
            break;
        case '[ - ] Entertainment':
            categoryIcon = '<i class="fas fa-film"></i>';
            break;
        case '[ - ] Transport':
            categoryIcon = '<i class="fas fa-bus"></i>';
            break;
        case 'Other':
            categoryIcon = '<i class="fas fa-star"></i>';
            break;
    }
}

const countMoney = money =>
{
    const newMoney = money.reduce((acc, curr) => acc + curr, 0); // Sum up all the values in the array
    availableMoeny.innerHTML = `${newMoney} EUR`; // Update the available money display
}

const deleteTransaction = transactionId =>
{
    const transactionToDelete = document.getElementById(transactionId); // Get the transaction element by its ID
    const transactionAmount = parseFloat(transactionToDelete.childNodes[3].innerText); // Get the transaction amount from the element

    const indexOfTransaction = moneyArray.indexOf(transactionAmount);
    moneyArray.splice(indexOfTransaction, 1); 

    transactionToDelete.classList.contains('income') ? incomeSection.removeChild(transactionToDelete) : expenseSection.removeChild(transactionToDelete); 
    countMoney(moneyArray);
}

const deleteAllTransactions = () =>
{
    incomeSection.innerHTML = '<h3>Income</h3>';
    expenseSection.innerHTML = '<h3>Expenses</h3>';
    availableMoeny.textContent = '0 EUR';
    moneyArray = [0]; 
}

const changeStyleToLight = () =>
{
    root.style.setProperty('--first-color', '#F9F9F9');
    root.style.setProperty('--second-color', '#14161F');
    root.style.setProperty('--border-color', 'rgba(0,0,0,0.2)');
}

const changeStyleToDark = () =>
{
    root.style.setProperty('--first-color', '#14161F');
    root.style.setProperty('--second-color', '#F9F9F9');
    root.style.setProperty('--border-color', 'rgba(255,255,255,0.2)');
}

addTransactionBtn.addEventListener('click', showPanel);
cancelBtn.addEventListener('click', hidePanel);
saveBtn.addEventListener('click', checkForm);
deleteAllBtn.addEventListener('click', deleteAllTransactions);
lightModeBtn.addEventListener('click', changeStyleToLight);
darkModeBtn.addEventListener('click', changeStyleToDark);
