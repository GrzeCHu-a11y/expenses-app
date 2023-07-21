document.addEventListener('DOMContentLoaded', function() {
  displayExpenses();
});

let expenses = [
  {
    name: 'Restaurant Lunch',
    amount: 50,
    startDate: '2023-07-01',
    endDate: '2023-07-01',
    category: 'food'
  },
  {
    name: 'Fuel Refill',
    amount: 80,
    startDate: '2023-07-02',
    endDate: '2023-07-02',
    category: 'car'
  },
  {
    name: 'Furniture Purchase',
    amount: 500,
    startDate: '2023-07-01',
    endDate: '2023-07-05',
    category: 'home'
  },
  {
    name: 'Workplace Lunch',
    amount: 20,
    startDate: '2023-07-03',
    endDate: '2023-07-03',
    category: 'food'
  },
  {
    name: 'Car Maintenance',
    amount: 150,
    startDate: '2023-07-06',
    endDate: '2023-07-06',
    category: 'car'
  }
];

// Pagination vars
let currentPage = 1;
const expensesPerPage = 5;

// Form elements
const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseStartDateInput = document.getElementById('expense-start-date');
const expenseEndDateInput = document.getElementById('expense-end-date');
const expenseCategoryInput = document.getElementById('expense-category');

// Summary elements
const expensesTable = document.getElementById('expenses-table');
const totalExpensesElement = document.getElementById('total-expenses');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
const pageCounter = document.getElementById('page-counter');

// Event handler for adding an expense
expenseForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const expenseName = expenseNameInput.value;
  const expenseAmount = parseFloat(expenseAmountInput.value);
  const expenseStartDate = expenseStartDateInput.value;
  const expenseEndDate = expenseEndDateInput.value;
  const expenseCategory = expenseCategoryInput.value;
  
  if (!expenseName || !expenseAmount || !expenseStartDate || !expenseEndDate || !expenseCategory) {
    alert('Please fill in all fields.');
    return;
  }
  
  expenses.push({
    name: expenseName,
    amount: expenseAmount,
    startDate: expenseStartDate,
    endDate: expenseEndDate,
    category: expenseCategory
  });
  
  expenseNameInput.value = '';
  expenseAmountInput.value = '';
  expenseStartDateInput.value = '';
  expenseEndDateInput.value = '';
  expenseCategoryInput.value = '';
  
  displayExpenses();
});

// handler for previous page button
prevPageButton.addEventListener('click', function() {
  if (currentPage > 1) {
    currentPage--;
    displayExpenses();
  }
});

// handler for next page button
nextPageButton.addEventListener('click', function() {
  const totalPages = Math.ceil(expenses.length / expensesPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayExpenses();
  }
});

// Displaying expenses
function displayExpenses() {
  const startIndex = (currentPage - 1) * expensesPerPage;
  const endIndex = startIndex + expensesPerPage;
  const currentExpenses = expenses.slice(startIndex, endIndex);
  
  expensesTable.innerHTML = `
    <tr>
      <th>Name</th>
      <th>Amount</th>
      <th>Start Date</th>
      <th>End Date</th>
      <th>Category</th>
    </tr>
  `;
  
  let totalExpenses = 0;
  
  currentExpenses.forEach(expense => {
    const { name, amount, startDate, endDate, category } = expense;
    
    expensesTable.innerHTML += `
      <tr>
        <td>${name}</td>
        <td>${amount} zł</td>
        <td>${startDate}</td>
        <td>${endDate}</td>
        <td>${category}</td>
      </tr>
    `;
    
    totalExpenses += amount;
  });
  
  totalExpensesElement.textContent = `Total Expenses: ${totalExpenses} zł`;
  
  // Disable/enable page button
  prevPageButton.disabled = (currentPage === 1);
  
  const totalPages = Math.ceil(expenses.length / expensesPerPage);
  nextPageButton.disabled = (currentPage === totalPages);

  // Update page pagination Counter
  pageCounter.textContent = `Page ${currentPage} of ${totalPages}`;
}
