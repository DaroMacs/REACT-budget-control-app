import React from 'react'
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { formatDate } from '../helpers'

import SavingsIcon from '../img/icono_ahorro.svg'
import HomeIcon from '../img/icono_casa.svg'
import FoodIcon from '../img/icono_comida.svg'
import ExpensesIcon from '../img/icono_gastos.svg'
import LeisureIcon from '../img/icono_ocio.svg'
import HealthIcon from '../img/icono_salud.svg'
import SubscriptionsIcon from '../img/icono_suscripciones.svg'

const dictionaryIcons = {
    savings: SavingsIcon, 
    home: HomeIcon,  
    food: FoodIcon,  
    others: ExpensesIcon, 
    miscelaneous: LeisureIcon,  
    health: HealthIcon,  
    subscriptions: SubscriptionsIcon
}

const Expense = ({expense, setEditExpense, deleteExpense}) => {
     
    const {category, expenseName, amount, id, date} = expense

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setEditExpense(expense)}>
                Edit
            </SwipeAction>
        </LeadingActions> 
    )
    
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={() => deleteExpense(id)}
                destructive={true}
            >
                Delete
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions = {leadingActions()}
                trailingActions = {trailingActions()}
            >
                <div className='gasto sombra'>
                    <div className="contenido-gasto">
                        <img src={dictionaryIcons[category]}/>
                        <div className="descripcion-gasto">
                            <p className="categoria">{category}</p>
                            <p className="nombre-gasto">{expenseName}</p>
                            <p className="fecha-gasto">Added on: <span>{formatDate(date)}</span></p>
                        </div>                
                    </div>
                    <p className="cantidad-gasto">${amount}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Expense
