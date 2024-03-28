import React from 'react'
import "../styles/Grocery.css"
const GroceryItems = ({ grocery, deleteGrocery }) => {

    return (
        <div className='items'>
            {/* <div className="imges"> */}
                <img src={grocery.image} alt={grocery.name} />
            {/* </div> */}
            <h3>{grocery.name}</h3>
            <p>Quantity: {grocery.qty}</p>
            <p>Price: ${grocery.price}</p>
            <p>Description: {grocery.description}</p>
            <button onClick={() => deleteGrocery(grocery.id)}>Delete</button>
        </div>
    )
}

export default GroceryItems