import { useEffect, useState } from 'react';

function Test4() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:5000/products/get/64400d538a0c5284c812c7e5');
      const data = await response.json();
      setProduct(data);
    }

    fetchData();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Product Details</h1>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      {/* Display other details of the product */}
    </div>
  );
}

export default Test4;