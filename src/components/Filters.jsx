import React from 'react'
import { useState, useEffect } from 'react'

const Filters = ({filter, setFilter}) => {



    return (
        <div className='filtros sombra contenedor'>
            <form>
                <div className="campo">
                    <label htmlFor="filter-select">Filter Expenses</label>
                    <select value={filter} 
                            onChange={(e) => setFilter(e.target.value)}
                            id="filter-selected">
                        <option value="">-- All Categories --</option>
                        <option value="savings">Savings</option>
                        <option value="food">Food</option>
                        <option value="home">Home</option>
                        <option value="miscelaneous">Miscelaneous</option>
                        <option value="health">Health</option>
                        <option value="subscriptions">Subscriptions</option>
                        <option value="others">Others</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default Filters
