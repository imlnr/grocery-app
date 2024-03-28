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
  const [visible, setformVisible] = useState(false);
  // useEffect(() => {
  //   fetchGroceries();
  // }, [deleteGrocery])

  return (
    <>
      <div className={`grocery-main ${visible ? 'blur-background' : ''}`}>
        <h1>Grocery List</h1>
        <button onClick={(e) => setformVisible(!visible)} className='add-grocery'><span>+</span>Add Items</button>
        <div className='grocery-items'>
          {groceries.map((grocery) => (
            <GroceryItems grocery={grocery} deleteGrocery={deleteGrocery} />
          ))}
        </div>
      </div>
      {visible && <div className='add-form'>
        <form>
          <span onClick={(e) => setformVisible(false)}>X</span>
          <div>
            <input type="text" placeholder='Enter the Grocery Name' required />
          </div>
          <div>
            <input type="url" placeholder='Enter the image link' required />
          </div>
          <div>
            <input type="number" placeholder='Enter the Quantity' />
          </div>
          <div>
            <input type="text" placeholder='Enter the price' />
          </div>
          <div>
            <input type="text" placeholder='Description goes here...' />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>}
    </>
  );
};

export default GroceryList;
