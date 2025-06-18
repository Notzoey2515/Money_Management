function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
  }
  



// Initialize accounts (or load from localStorage)
let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

// DOM elements for managing accounts
const accountListEl = document.getElementById('account-list');
const accountNameInput = document.getElementById('account-name');
const addAccountBtn = document.getElementById('add-account-btn');

// Function to display accounts and their balances
function displayAccounts() {
    accountListEl.innerHTML = ''; // Clear the list first

    if (accounts.length === 0) {
        accountListEl.innerHTML = '<li>No accounts yet.</li>';
        return;
    }

    accounts.forEach((account, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${account.name} - Balance: $${account.balance.toFixed(2)}</span>
            <button class="edit-btn" onclick="editAccount(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteAccount(${index})">Delete</button>
        `;
        accountListEl.appendChild(li);
    });
}

// Function to add a new account
function addAccount() {
    const accountName = accountNameInput.value.trim();

    if (accountName) {
        const newAccount = {
            name: accountName,
            balance: 0.00 // New accounts start with a balance of 0.00
        };

        // Add the new account to the accounts array
        accounts.push(newAccount);

        // Save the updated accounts array to localStorage
        localStorage.setItem('accounts', JSON.stringify(accounts));

        // Clear the input field after adding the account
        accountNameInput.value = '';

        // Update the account list UI
        displayAccounts();
    } else {
        alert('Please enter an account name');
    }
}

// Add CSS dynamically to the document
const style = document.createElement('style');
style.innerHTML = `
 
/* Edit Button Styles */
button.edit-btn, button.delete-btn {
    padding: 10px 15px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

/* Container for buttons */
button.edit-btn, button.delete-btn {
    display: inline-block; /* Keep buttons inline */
    margin-left: 10px; /* Space between buttons */
}

/* Edit Button Styles */
button.edit-btn {
    background-color: #4CAF50; /* Green */
    color: white;
}

button.edit-btn:hover {
    background-color: #45a049; /* Darker green */
    transform: scale(1.05);
}

/* Delete Button Styles */
button.delete-btn {
    background-color: #f44336; /* Red */
    color: white;
}

button.delete-btn:hover {
    background-color: #e53935; /* Darker red */
    transform: scale(1.05);
}

/* Button Disabled Style */
button:disabled {
    background-color: #d3d3d3;
    color: #a0a0a0;
    cursor: not-allowed;
}

/* Ensure the container or parent element uses Flexbox */
.container {
    display: flex;
    justify-content: flex-end; /* Align buttons to the right */
    margin-top: 10px; /* Add space on top if needed */
}


`;
document.head.appendChild(style);

// Function to edit an account
function editAccount(index) {
    const newAccountName = prompt('Enter new account name:', accounts[index].name);
    const newBalance = parseFloat(prompt('Enter new balance:', accounts[index].balance));

    if (newAccountName && !isNaN(newBalance)) {
        accounts[index] = {
            name: newAccountName,
            balance: newBalance
        };

        // Save the updated accounts array to localStorage
        localStorage.setItem('accounts', JSON.stringify(accounts));

        // Update the account list UI
        displayAccounts();
    } else {
        alert('Invalid input. Please try again.');
    }
}

// Function to delete an account
function deleteAccount(index) {
    if (confirm('Are you sure you want to delete this account?')) {
        accounts.splice(index, 1); // Remove the account at the given index

        // Save the updated accounts array to localStorage
        localStorage.setItem('accounts', JSON.stringify(accounts));

        // Update the account list UI
        displayAccounts();
    }
}

// Event listener to trigger adding an account when the button is clicked
addAccountBtn.addEventListener('click', addAccount);

// Initialize the page with accounts from localStorage
displayAccounts();
function displayAccounts() {
    accountListEl.innerHTML = ''; // Clear the list first

    if (accounts.length === 0) {
        accountListEl.innerHTML = '<li>No accounts yet.</li>';
        updateTotalBalance(); // 👈 Add it here too for when the list is empty
        return;
    }

    accounts.forEach((account, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${account.name} - Balance: $${account.balance.toFixed(2)}</span>
            <button class="edit-btn" onclick="editAccount(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteAccount(${index})">Delete</button>
        `;
        accountListEl.appendChild(li);
    });

    updateTotalBalance(); // 👈 Place this at the end of the function
}
