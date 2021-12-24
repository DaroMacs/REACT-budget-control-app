import { useState, useEffect  } from 'react'
import Header from './components/Header'
import { createID } from './helpers'
import NewBudgetSpendIcon from './img/nuevo-gasto.svg'
import Modal from './components/Modal'
import ExpensesList from './components/ExpensesList'
import Filters from './components/Filters'
 
function App() {

  const [budget, setBudget] = useState(Number(localStorage.getItem('budget') ?? 0))
  const [isValidBudget, setIsValidBudget] = useState(false)

  const [modal, setModal] = useState(false)
  const [animateModal, setAnimateModal] = useState(false)

  const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem('expenses')) ?? [])

  const [editExpense, setEditExpense] = useState({})

  const [filter, setFilter] = useState('')
  const [filteredExpenses, setFilteredExpenses] = useState([])

  useEffect(() => {
    if(Object.keys(editExpense).length > 0) {
      setModal(true)
            
      setTimeout(() => {
        setAnimateModal(true)
    }, 150);
    }
  }, [editExpense])

  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0)
  }, [budget])

  useEffect(() => {
    if(filter) {
      const filteredExpenses = expenses.filter(expense => expense.category === filter)
      setFilteredExpenses(filteredExpenses)
      console.log(filteredExpenses);
    }
  }, [filter])

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem('budget')) ?? 0;

    if(budgetLS > 0) {
      setIsValidBudget(true)
    }

  }, [])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? [])

  }, [expenses])

  const handleNewBudget = () => {
    setModal(true)
    setEditExpense({})

    setTimeout(() => {
      setAnimateModal(true)
  }, 150);
  }

  const saveExpense = (expense) => {
    if(expense.id) {
      //UPDATE
      const updatedExpenses = expenses.map(expenseState => expenseState.id === expense.id ? expense : expenseState )
      setExpenses(updatedExpenses)
      setEditExpense({})
    } else {
      //NEW EXPENSE
      expense.id = createID()
      expense.date = Date.now()
      setExpenses([...expenses, expense])
    }
    

    setAnimateModal(false)
        
    setTimeout(() => {
        setModal(false)
    }, 300);
  }

  const deleteExpense = (id) => {
      const updatedExpenses = expenses.filter(expense => expense.id !== id)
      setExpenses(updatedExpenses)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
        expenses = {expenses}
        setExpenses = {setExpenses}
        budget = {budget}
        setBudget = {setBudget}
        isValidBudget = {isValidBudget}
        setIsValidBudget = {setIsValidBudget}
      />
      {isValidBudget && (
        <>
            <main>
              <Filters 
                filter = {filter}
                setFilter = {setFilter}              
              />
              <ExpensesList
                expenses = {expenses}
                setEditExpense = {setEditExpense}
                deleteExpense = {deleteExpense}
                filter = {filter}
                filteredExpenses = {filteredExpenses}              
              />
            </main>

            <div className="nuevo-gasto">
            <img 
            src={NewBudgetSpendIcon} 
            alt="IconSpend" 
            onClick={handleNewBudget}
            />
            </div>
        </>
      )}

      {modal && <Modal 
                  setModal = {setModal}
                  animateModal = {animateModal}
                  setAnimateModal = {setAnimateModal}
                  saveExpense = {saveExpense}
                  editExpense = {editExpense}
                  setEditExpense = {setEditExpense}
                /> }
    </div>
  )
}

export default App
