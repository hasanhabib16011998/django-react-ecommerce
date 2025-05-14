import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomeScreen() {
    const [products,setProducts] = useState([]);

    useEffect(()=>{
        async function fetchProducts(){
            const data = await axios.get('http://127.0.0.1:8000/api/products/');
            setProducts(data);
        };
        fetchProducts();
    })


  return (
    <h1>Products</h1>
  )
}

export default HomeScreen