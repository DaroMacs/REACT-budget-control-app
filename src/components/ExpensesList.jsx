import React from 'react'
import Expense from './Expense'

const ExpensesList = ({expenses, setEditExpense, deleteExpense, filter, filteredExpenses}) => {
    return (
        <div className='listado-gastos contenedor'>
           

            { filter ? (
                <>
                 <h2>{filteredExpenses.length ? 'Expenses' : 'No expenses in this category' }</h2>
                {filteredExpenses.map(expense => (
                    <Expense 
                        key = {expense.id}
                        expense = {expense}
                        setEditExpense = {setEditExpense}
                        deleteExpense = {deleteExpense}
                    />
                ))}
                </>
            ) : (
                <>
                <h2>{expenses.length ? 'Expenses' : 'No Expenses' }</h2>
                {expenses.map(expense => (
                    <Expense 
                        key = {expense.id}
                        expense = {expense}
                        setEditExpense = {setEditExpense}
                        deleteExpense = {deleteExpense}
                    />
                ))}
                </>                
            ) }

           
        </div>
    )
}

export default ExpensesList
