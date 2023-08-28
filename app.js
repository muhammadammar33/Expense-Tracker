const expenseForm = document.getElementById('expense-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

// Initialize expenses array from local storage or create an empty one
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to calculate and update the total expenses
function updateTotal() {
    const total = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
    totalAmount.textContent = `₨${total.toFixed(2)}`;
}

// Function to render expenses
function renderExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${expense.description}</span>
            <span>₨${expense.amount.toFixed(2)}</span>
            <button onclick="editExpense(${index})">Edit</button>
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(li);
    });
    updateTotal();
}

// Function to add an expense
function addExpense(description, amount) {
    expenses.push({ description, amount });
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
    descriptionInput.value = '';
    amountInput.value = '';
}

// Function to edit an expense
function editExpense(index) {
    const newDescription = prompt('Enter a new description:');
    const newAmount = parseFloat(prompt('Enter a new amount:'));
    if (newDescription && !isNaN(newAmount)) {
        expenses[index].description = newDescription;
        expenses[index].amount = newAmount;
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    }
}

// Function to delete an expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
}


expenseForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    if (description && !isNaN(amount)) {
        addExpense(description, amount);
    } else {
        alert('Please enter a valid description and amount.');
    }
});

// Initial rendering of expenses
renderExpenses();
