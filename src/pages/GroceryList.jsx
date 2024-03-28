// GroceryList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GroceryItems from '../components/GroceryItems';
import "../styles/Grocery.css"

const GroceryList = () => {
  const [groceries, setGroceries] = useState([]);

  const deleteGrocery = async (id) => {
    try {
      await axios.delete(`https://grocery-server-geqm.onrender.com/groceries/${id}`);
      // fetchGroceries();
      setGroceries(prevGroceries => prevGroceries.filter(grocery => grocery.id !== id));
    } catch (error) {
      console.error('Error deleting grocery:', error);
    }
  };
  console.log("running");
  const fetchGroceries = async () => {
    try {
      const response = await axios.get('https://grocery-server-geqm.onrender.com/groceries');
      setGroceries(response.data);
    } catch (error) {
      console.error('Error fetching groceries:', error);
    }
  };
  useEffect(() => {
    fetchGroceries();
  }, []);

  // useEffect(() => {
  //   fetchGroceries();
  // }, [deleteGrocery])

  return (
    <div className='grocery-main'>
      <h1>Grocery List</h1>
      <button className='add-grocery'><span>+</span>Add Items</button>
      <div className='grocery-items'>
        {groceries.map((grocery) => (
          <GroceryItems grocery={grocery} deleteGrocery={deleteGrocery} />
        ))}
      </div>
    </div>
  );
};

export default GroceryList;
