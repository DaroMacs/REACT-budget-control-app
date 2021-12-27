import React from 'react'
import { useState, useEffect } from 'react'
import CloseModal from '../img/cerrar.svg'
import Message from './Message'

const Modal = ({setModal, animateModal, setAnimateModal, saveExpense, editExpense, setEditExpense}) => {

    const [message, setMessage] = useState('')
    const [expenseName, setExpenseName] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [id, setId] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        if(Object.keys(editExpense).length > 0) {
            setExpenseName(editExpense.expenseName)
            setAmount(editExpense.amount)
            setCategory(editExpense.category)
            setId(editExpense.id)
            setDate(editExpense.date)
          }
    }, [])

    const hideModal = () => {
        setAnimateModal(false)
        setEditExpense({})
        setTimeout(() => {
            setModal(false)
        }, 300);
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if ([expenseName, amount, category].includes('')) {

            setMessage('All Fields Are Required');

            setTimeout(() => {
                setMessage('')
            }, 3000);
            return
        }
        setMessage('')
        saveExpense({expenseName, amount, category, id, date})
    }

    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img 
                    src={CloseModal} 
                    alt="close modal" 
                    onClick={() => hideModal()}    
                />
            </div>

            <form 
                onSubmit={handleSubmit}
                className={`formulario ${animateModal ? 'animar' : 'cerrar'}`}
            >
                <legend>{editExpense.expenseName ? 'Edit Expense' : 'New Expense'}</legend>

                {message && <Message type='error'>{message}</Message>}

                <div className='campo'>
                    <label htmlFor="name">Expense</label>

                    <input 
                        id='name'
                        type="text"
                        placeholder='Add the name of the expense'
                        value={expenseName}
                        onChange={e => setExpenseName(e.target.value)}
                     />
                </div>
                <div className='campo'>
                    <label htmlFor="amount">Amount</label>

                    <input 
                        id='amount'
                        type="number"
                        placeholder='Add the amount of the expense: i.e 100'
                        value={amount}
                        onChange={e => setAmount(Number(e.target.value))}
                     />
                </div>
                <div className='campo'>
                    <label htmlFor="category">Category</label>

                    <select 
                        id="category"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option value="">-- Select --</option>
                        <option value="savings">Savings</option>
                        <option value="food">Food</option>
                        <option value="home">Home</option>
                        <option value="miscelaneous">Miscelaneous</option>
                        <option value="health">Health</option>
                        <option value="subscriptions">Subscriptions</option>
                        <option value="others">Others</option>
                    </select>
                </div>
                <input 
                    type="submit"
                    value={editExpense.expenseName ? 'Save Changes' : 'Add Expense'}
                />
            </form>
        </div>
    )
}

export default Modal
