//Select Elements 
const balanceEl = document.querySelector(".balance .value");
const incomeTotalEl = document.querySelector(".income-total");
const outcomeTotalEl = document.querySelector(".outcome-total");
const incomeEl = document.querySelector("#income");
const expenseEl = document.querySelector("#expense");
const allEl = document.querySelector("#all");
const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#expense .list");
const allList = document.querySelector("#all .list");

// Dashboard Buttons
const expenseBtn = document.querySelector(".tab1");
const incomeBtn = document.querySelector(".tab2");
const allBtn = document.querySelector(".tab3");

// Input Buttons
const addExpense = document.querySelector(".add-expense");
const expenseTitle = document.getElementById("expense-title-input");
const expenseAmount = document.getElementById("expense-amount-input");

const addIncome = document.querySelector(".add-income");
const incomeTitle = document.getElementById("income-title-input");
const incomeAmount = document.getElementById("income-amount-input");

// Variables
let ENTRY_LIST = [];
let balance = 0, income = 0, outcome = 0;

const DELETE = "delete", EDIT = "edit";

//Event Listeners

expenseBtn.addEventListener("click", function (){
    active(expenseBtn);
    inactive([incomeBtn, allBtn]);
    show(expenseEl);
    hide([incomeEl, allEl]);

});
incomeBtn.addEventListener("click", function (){
    active(incomeBtn);
    inactive([expenseBtn, allBtn]);
    show(incomeEl);
    hide([expenseEl, allEl]);
});
allBtn.addEventListener("click", function (){
    active(allBtn);
    inactive([expenseBtn, incomeBtn]);
    show(allEl);
    hide([incomeEl, expenseEl]);

});

addIncome.addEventListener("click", function (){
    //if one of the inputs is empty => EXIT
    if(!incomeTitle.value || !incomeAmount.value ) return;
    //save the entry to ENTRY_LIST
    let income = {
        type:"income", 
        title: incomeTitle.value,
        amount: parseFloat(incomeAmount.value),
    }
    ENTRY_LIST.push (income);
    updateUI();
    clearInput([incomeTitle, incomeAmount]);

})

addExpense.addEventListener("click", function(){
    if (!expenseTitle.value || !expenseAmount.value) return;
    let expense = {
        type: "expense", 
        title: expenseTitle.value,
        amount: parseFloat(expenseAmount.value),
    }
    ENTRY_LIST.push(expense);
    updateUI();
    clearInput ([expenseTitle, expenseAmount]);
})

incomeList.addEventListener("click", deleteOrEdit);
expenseList.addEventListener("click", deleteOrEdit);
allList.addEventListener("click", deleteOrEdit);

//Helpers
function show(element){
    element.classList.remove("hide");
}
function hide(elementsArray){
    elementsArray.forEach(element => {
        element.classList.add("hide");
    });
}
function active(element){
    element.classList.add("active");
}

function inactive(elementsArray){
    elementsArray.forEach(element => {
        element.classList.remove("active");
    });
}
function clearInput(inputsArray){
    inputsArray.forEach(input => {
        input.value = "";
    });
}
function calculateTotal (type, list){
    let sum = 0;
    list.forEach(entry => {
        if (entry.type == type){
            sum += entry.amount;
        }
    });
    return sum;
}
function calculatedBalance(income, outcome){
    return income - outcome;
}
function clearElement(elements){
    elements.forEach(elements => {
        elements.innerHTML = "";
    })
}

//Showing list elements
function showEntry (list, type, title, amount, id){
    const entry = `<li id = "${id}" class = "${type}">
                        <div class = "entry'>${title}: $${amount}</div>
                        <div id = "edit"></div>
                        <div id = "delete"><d=/div>
                        </li>`
    const position = "afterbegin";
    list.insertAdjacentHTML(position, entry);
}
// Updating balance calculations
function updateUI(){
    income = calculateTotal("income", ENTRY_LIST);
    outcome = calculateTotal("expense", ENTRY_LIST);
    balance = Math.abs (calculatedBalance(income,outcome));

    //Sign of balance
    let sign = (income >= outcome) ? "$" : "-$";

    // Update UI
    balanceEl.innerHTML = `<small>${sign}</small>${balance}`;
    incomeTotalEl.innerHTML = `<small>${sign}</small>${income}`;
    outcomeTotalEl.innerHTML = `<small>${sign}</small>${outcome}`;

    clearElement([incomeList, expenseList, allList]);


    ENTRY_LIST.forEach(entry, index => {
        if (entry.type == "income"){
            showEntry (incomeList, entry.type, entry.title, entry.amount, index);
        }else if (entry.type == "expense"){
            showEntry(expenseList, entry.type, entry.title, entry.amount, index);
        }
        showEntry(allList, entry.type, entry.title, entry.amount, index);
    });
   
    updateChart (income, outcome);
    } 

// Delete or Edit

