import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const BudgetControl = ({budget, expenses, setExpenses, setBudget, setIsValidBudget}) => {


        const [available, setAvailable] = useState(0)
        const [spent, setSpent] = useState(0)
        const [porcentage, setPorcentage] = useState(0)

        useEffect(() => {
            const totalSpent = expenses.reduce( (total, expense) => expense.amount + total, 0)

            const totalAvailable = budget - totalSpent

            //CALCULATE PORCENTAGE OF SPENT BUDGET

            const newPorcentage = (((budget - totalAvailable) / budget) * 100).toFixed(2)
            
            setAvailable(totalAvailable)
            setSpent(totalSpent)
            
            setTimeout(() => {
                setPorcentage(newPorcentage)
                
            }, 1000);

        }, [expenses])

    const formatCurrency = (amount) => {        //FUNCTION TO FORMAT CURRENCY    
        return amount.toLocaleString('en-US', { 
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const result = confirm('Do you want to reset the app?')

        if(result) {
            setBudget(0)
            setExpenses([])
            setIsValidBudget(false)
        } else {
            console.log('no');
        }
        
    }


    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    styles = {buildStyles({
                        pathColor: porcentage > 100 && '#dc2626',
                        trailColor: '#f5f5f5',
                        textColor: porcentage > 100 && '#dc2626'
                    })}
                    value={porcentage}
                    text = {`${porcentage}% spent`}
                ></CircularProgressbar>      
            </div>  
            <div className='contenido-presupuesto'>
                <button 
                    className='reset-app' 
                    type='button'
                    onClick={handleResetApp}
                    >
                    Reset App
                </button>
                <p>
                    <span>Budget: </span> {formatCurrency(budget)}
                </p>    
                <p className={`${available < 0 && 'negativo'}`}>
                    <span>Available: </span> {formatCurrency(available)}
                </p>    
                <p>
                    <span>Spend: </span> {formatCurrency(spent)}
                </p>    
            </div> 
        </div>
    )
}

export default BudgetControl
