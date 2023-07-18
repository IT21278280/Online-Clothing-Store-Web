import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import '../css/product.css'

function ProductDetails() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
        const response = await fetch(`http://localhost:5050/products/get/${id}`);
        const data = await response.json();
        setProduct(data);
      }
  
      fetchData();
    }, []);


    const addToCart = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/cart/order/cartNew', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ product }),
        });
        console.log(response);
        navigate('/cart')
      } catch (error) {
        console.log(error);
      }
    };



  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <div className='row mt-5'>
        <div className='col-md-5 mb-5'>
      <img src={product.image} alt={product.name}/>
      </div>
      <div className='col-md-2'>
      <img src={product.image1} alt={product.name} className='sub-img'/>
      <img src={product.image2} alt={product.name} className='sub-img'/>
      <img src={product.image3} alt={product.name} className='sub-img'/>
      </div>
      <div className='col-md-4'>
      <h2 className='product-name mt-5'>{product.name}</h2>
      <p className='product-price fw-bold'>Rs. {product.price}.00</p>
      <hr></hr>
      <p className='product-des my-3'>{product.description}</p>
      <Link to="/addPayment">
      <button className='buy-btn-btn'>Buy</button>
      </Link>
      <button onClick={addToCart} className='addTo-btn-btn'>Add to cart</button>
      </div>
      </div>
    </div>
  );
}

export default ProductDetails;