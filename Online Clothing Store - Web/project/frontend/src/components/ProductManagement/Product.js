import React, { useEffect, useState } from 'react';
import '../../css/product.css';
import { Link } from 'react-router-dom';
import axios from 'axios'



export default function Product() {
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState("All Price");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;  

  const [clickCount, setClickCount] = useState(0); 

  const handleAddToCart = async (id) => {
    try {
      console.log("ID is", id)
      await axios.post('http://localhost:5050/product-button/add-to-cart', { id });
      
      setClickCount(clickCount + 1);
    } catch (err) {
      console.error(err);
      console.log("Error In ID")
    }
  };
  

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:5050/products/getProducts');
      const data = await response.json();
      setProducts(data);
    } 
    fetchData();

  }, []);

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
    setCurrentPage(1)
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
    setCurrentPage(1)
    };

  const filterByPriceRange = () => {
    if (priceRange === 'All Price') {
      return products;
    } else if (priceRange === '1000-3000') {
      return products.filter((product) => product.price >= 1000 && product.price <= 3000);
    } else if (priceRange === '3000-5000') {
      return products.filter((product) => product.price >= 3000 && product.price <= 5000);
    } else if (priceRange === '5000-7000') {
        return products.filter((product) => product.price >= 5000 && product.price <= 7000);
    }else if (priceRange === '7000-10000') {
        return products.filter((product) => product.price >= 7000 && product.price <= 10000);
    }
};

    const filterByCategory = () => {
        if (category === 'All') {
            return products;
        } else if (category === 'Women') {
            return products.filter((product)=>product.category === "Women's");
        } else if (category === 'Men') {
              return products.filter((product) => product.category === "Men's");
        }else if (category === 'Kids') {
              return products.filter((product) => product.category === "Kids");

        }
    };
    
    const filteredProducts = () => {
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      return filterByCategory()
        .filter((product) => filterByPriceRange().includes(product))
        .slice(startIndex, endIndex);
    };
    
    

  return (
    <div className="container main-container">
        <div className="col-md-4 filter">
            <div className=''>
            <h6 className="sort-product mb-5">Sort by Price Range</h6>
            <div className="form-check form-check-inline mb-2">
                <input className="form-check-input" type="radio" name="priceRange" id="allPrice" value="All Price" onChange={() => handlePriceRangeChange('All Price')} checked={priceRange === 'All Price'} />
                <label className="form-check-label" htmlFor="allPrice">All Price</label>
            </div>
            <div className="form-check form-check-inline mb-2">
                <input className="form-check-input" type="radio" name="priceRange" id="1000-3000" value="1000-3000" onChange={() => handlePriceRangeChange('1000-3000')} checked={priceRange === '1000-3000'} />
                <label className="form-check-label" htmlFor="1000-3000">$1000 - $3000</label>
            </div>
            <div className="form-check form-check-inline mb-2">
                <input className="form-check-input" type="radio" name="priceRange" id="3000-5000" value="3000-5000" onChange={() => handlePriceRangeChange('3000-5000')} checked={priceRange === '3000-5000'} />
                <label className="form-check-label" htmlFor="3000-5000">$3000-5000</label>
            </div>
            <div className="form-check form-check-inline mb-2">
                <input className="form-check-input" type="radio" name="priceRange" id="1000-3000" value="1000-3000" onChange={() => handlePriceRangeChange('5000-7000')} checked={priceRange === '5000-7000'} />
                <label className="form-check-label" htmlFor="5000-7000">$5000 - $7000</label>
            </div>
            <div className="form-check form-check-inline mb-2">
                <input className="form-check-input" type="radio" name="priceRange" id="1000-3000" value="1000-3000" onChange={() => handlePriceRangeChange('7000-10000')} checked={priceRange === '7000-10000'} />
                <label className="form-check-label" htmlFor="7000-10000">$7000 - $10000</label>
            </div>
            </div>
            <h6 className="sort-product my-5">Sort by Category</h6>
            <div className="form-check form-check-inline mb-2 d-flex">
                <input className="form-check-input" type="radio" name="category" id="all" value="All" onChange={() => handleCategoryChange('All')} checked={category === 'All'} />
                <label className="form-check-label" htmlFor="all">All</label>
            </div>
            <div className="form-check form-check-inline mb-2">
                <input className="form-check-input" type="radio" name="category" id="women" value="Women" onChange={() => handleCategoryChange('Women')} />
                <label className="form-check-label" htmlFor="all">Women</label>
            </div>
            <div className="form-check form-check-inline mb-2 d-flex">
            <input className="form-check-input" type="radio" name="category" id="men" value="Men" onChange={() => handleCategoryChange('Men')} />
                <label className="form-check-label" htmlFor="all">Men</label>
            </div>
            <div className="form-check form-check-inline mb-2">
                <input className="form-check-input" type="radio" name="category" id="kids" value="kids" onChange={() => handleCategoryChange('Kids')}  /> 
                <label className="form-check-label" htmlFor="all">Kids</label>
            </div>
        </div>
      <div className="row justify-content-end">
        <div className="col-md-8">
          <h2 className="text-center product-main-header">Product List</h2>
          <h6 className="product-view-name mb-4">Viewing {filteredProducts().length} of {products.length} products</h6>
            <div className='row'>
            {filteredProducts().map(product => (
              <div className='col-md-3 image-container mt-4' key={product.id}>
              <img src={product.image} alt={product.name} className='product-image-container' />
              <h6 className='product-header'>{product.name}</h6>
              {/*<h7 className='product-description'>{product.description}</h7>*/}
              <h6 className='product-price'>Rs {product.price}</h6>
              
              <Link to={`/product/${product._id}`}><button className='text-white product-btn' onClick={() => handleAddToCart(product._id)}>Add to Cart</button></Link>
             </div>
            ))}
            <div className="pagination p-3 d-flex align-items-center justify-content-center">
  <button className='previous-btn border-0' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
  <span className="mx-3">{currentPage}</span>
  <button className='next-btn border-0' onClick={() => setCurrentPage(currentPage + 1)} disabled={filteredProducts().length < productsPerPage}>Next</button>
</div>
            </div>
            </div>
            </div>
</div>
)
}