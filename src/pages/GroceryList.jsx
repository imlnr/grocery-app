// GroceryList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GroceryList = () => {
  const [groceries, setGroceries] = useState([]);

  useEffect(() => {
    fetchGroceries();
  }, []);

  const fetchGroceries = async () => {
    try {
      const response = await axios.get('http://localhost:3000/groceries');
      setGroceries(response.data);
    } catch (error) {
      console.error('Error fetching groceries:', error);
    }
  };

  const deleteGrocery = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/groceries/${id}`);
      fetchGroceries(); // Refresh the grocery list after deletion
    } catch (error) {
      console.error('Error deleting grocery:', error);
    }
  };

  return (
    <div>
      <h2>Grocery List</h2>
      <ul>
        {groceries.map((grocery) => (
          <li key={grocery.id}>
            <div>
              <img src={grocery.image} alt={grocery.name} />
              <h3>{grocery.name}</h3>
              <p>Quantity: {grocery.qty}</p>
              <p>Price: ${grocery.price}</p>
              <p>Description: {grocery.description}</p>
              <button onClick={() => deleteGrocery(grocery.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroceryList;
