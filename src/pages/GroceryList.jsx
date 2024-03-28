// GroceryList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GroceryItems from '../components/GroceryItems';
import "../styles/Grocery.css"

const GroceryList = () => {
  const [groceries, setGroceries] = useState([]);

  useEffect(() => {
    fetchGroceries();
  }, []);

  const fetchGroceries = async () => {
    try {
      const response = await axios.get('https://grocery-server-geqm.onrender.com/groceries');
      setGroceries(response.data);
    } catch (error) {
      console.error('Error fetching groceries:', error);
    }
  };

  const deleteGrocery = async (id) => {
    try {
      await axios.delete(`https://grocery-server-geqm.onrender.com/groceries/${id}`);
      fetchGroceries();
    } catch (error) {
      console.error('Error deleting grocery:', error);
    }
  };
  useEffect(()=>{
    fetchGroceries();
  },[deleteGrocery])

  return (
    <div>
      <h2>Grocery List</h2>
      <div className='grocery-items'>
        {groceries.map((grocery) => (
          // <li key={grocery.id}>
          <GroceryItems grocery={grocery} deleteGrocery={deleteGrocery} />
          // <div>
          //   <img src={grocery.image} alt={grocery.name} />
          //   <h3>{grocery.name}</h3>
          //   <p>Quantity: {grocery.qty}</p>
          //   <p>Price: ${grocery.price}</p>
          //   <p>Description: {grocery.description}</p>
          //   <button onClick={() => deleteGrocery(grocery.id)}>Delete</button>
          // </div>
          // </li>
        ))}
      </div>
    </div>
  );
};

export default GroceryList;
