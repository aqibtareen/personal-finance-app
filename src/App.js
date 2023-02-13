import React, { useState } from "react";
import "./App.css";

function ExpenseTracker() {
  // state to store expenses
  const [expenses, setExpenses] = useState([
    { id: 1, charge: "Rent", amount: 1600 },
    { id: 2, charge: "Car Payment", amount: 400 },
    { id: 3, charge: "Credit Card Bill", amount: 1200 },
  ]);

  // state to store a single expense for adding and editing
  const [singleExpense, setSingleExpense] = useState({
    charge: "",
    amount: "",
  });

  // state to keep track of whether adding or editing an expense
  const [edit, setEdit] = useState(false);
  // state to store the id of the expense being edited
  const [id, setId] = useState(0);

  // function to handle changes to the input fields
  const handleChange = (e) => {
    setSingleExpense({ ...singleExpense, [e.target.name]: e.target.value });
  };

  // function to handle the submission of a new expense or an edited expense
  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      let tempExpenses = expenses.map((item) => {
        return item.id === id
          ? { ...item, charge: singleExpense.charge, amount: singleExpense.amount }
          : item;
      });
      setExpenses(tempExpenses);
      setEdit(false);
      setSingleExpense({ charge: "", amount: "" });
    } else {
      setExpenses([...expenses, { ...singleExpense, id: expenses.length + 1 }]);
      setSingleExpense({ charge: "", amount: "" });
    }
  };

  // function to delete an expense
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpenses);
  };

  // function to set the state for editing an expense
  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    setSingleExpense({ charge: expense.charge, amount: expense.amount });
    setEdit(true);
    setId(id);
  };

  return (
    <>
      <h1>Professional Expense Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Charge"
          name="charge"
          value={singleExpense.charge}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Amount"
          name="amount"
          value={singleExpense.amount}
          onChange={handleChange}
        />
        <button type="submit">{edit ? "Edit" : "Add Expense"}</button>
      </form>
      <ul>
  {expenses.map((expense) => (
    <li className="expense-container" key={expense.id}>
      <p>
        {expense.charge} <span>- ${expense.amount}</span>
      </p>
      <div>
        <button onClick={() => handleEdit(expense.id)}>Edit</button>
        <button onClick={() => handleDelete(expense.id)}>Delete</button>
      </div>
    </li>
  ))}
</ul>
<div className="footer">Expense Tracker - Made By Aqib Tareen</div>
</>
);
}

export default ExpenseTracker;