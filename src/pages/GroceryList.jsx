// GroceryList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GroceryItems from '../components/GroceryItems';
import "../styles/Grocery.css"

const GroceryList = () => {
  const [visible, setformVisible] = useState(false);
  const [groceries, setGroceries] = useState([]);
  const [name, setname] = useState('');
  const [imglink, setimglink] = useState('');
  const [quantity, setquantity] = useState(0);
  const [price, setprice] = useState(0);
  const [desc, setdesc] = useState('');

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
    
    const postGrocery = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post('https://grocery-server-geqm.onrender.com/groceries', {
          name: name,
          qty: quantity,
          price: price,
          description: desc,
          image: imglink
        })
        console.log(res);
        if (res.status===201) {
          setformVisible(false);
          setGroceries((prev)=>[...prev,res.data])
          // fetchGroceries();
        }
        console.log("added Successfully...");
      } catch (error) {
        console.error('Error', error);
      }
    }
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
        <form onSubmit={postGrocery}>
          <span onClick={(e) => setformVisible(false)}>X</span>
          <div>
            <input type="text" onChange={(e) => setname(e.target.value)} placeholder='Enter the Grocery Name' required />
          </div>
          <div>
            <input type="url" onChange={(e) => setimglink(e.target.value)} placeholder='Enter the image link' required />
          </div>
          <div>
            <input type="number" onChange={(e) => setquantity(e.target.value)} placeholder='Enter the Quantity' />
          </div>
          <div>
            <input type="text" onChange={(e) => setprice(e.target.value)} placeholder='Enter the price' />
          </div>
          <div>
            <input type="text" onChange={(e) => setdesc(e.target.value)} placeholder='Description goes here...' />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>}
    </>
  );
};

export default GroceryList;
