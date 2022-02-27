// Dashboard Buttons
const expenseBtn = document.querySelector(".tab1");
const incomeBtn = document.querySelector(".tab2");
const allBtn = document.querySelector(".tab3");
const expenseEl = document.querySelector("#expense");
const incomeEl = document.querySelector("#income");
const allEl = document.querySelector("#all");

// Input Buttons
const addExpense = document.querySelector(".add-expense");
const expenseTitle = document.getElementById("expense-title-input");
const expenseAmount = document.getElementById("expense-amount-input");

const addIncome = document.querySelector(".add-income");
const incomeTitle = document.getElementById("income-title-input");
const incomeAmount = document.getElementById("income-amount-input")

//Event Listeners

expenseBtn.addEventListener('click', function (){
    active(expenseBtn);
    inactive([incomeBtn, allBtn]);
    show(expenseEl);
    hide([incomeEl, allEl]);

});
incomeBtn.addEventListener('click', function (){
    active(incomeBtn);
    inactive([expenseBtn, allBtn]);
    show(incomeEl);
    hide([expenseEl, allEl]);
});
allBtn.addEventListener('click', function (){
    active(allBtn);
    inactive([expenseBtn, incomeBtn]);
    show(allEl);
    hide([incomeEl, expenseEl]);

});

addIncome.addEventListner('click', function (){
    if(!incomeTitle.value || !incomeAmount.value ) return;
    let income = {
        type:"income", 
        title: incomeTitle.value,
        amount: parseFloat(incomeAmount.value),
    }
    ENTRY_LIST.push (income);
    updateUI();
    clearInput([incomeTitle, incomeAmount]);

})

addExpense.addEventListener('click', function(){
    let expense = {
        type: "expense", 
        title: expenseTitle.value,
        amount: parseFloat(expenseAmount.value),
    }
    ENTRY_LIST.push(expense);
    updateUI();
    clearInput ([expenseTitle, expenseAmount]);
})

//Elements
function active(element){
    element.classList.add("active");
}
function show(element){
    element.classList.remove("hide");
}
function hide(elementsArray){
    elementsArray.forEach(element => {
        element.classList.add("hide");
    });
}
function inactive(elementsArray){
    elementsArray.forEach(element => {
        element.classList.remove("active");
    });
}