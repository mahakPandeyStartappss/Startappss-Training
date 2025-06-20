import React, { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { NavLink } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);

  

  useEffect(() => {
    let componentMounted = true;
  
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://api.escuelajs.co/api/v1/products");    //we have used fetch to get the data from the API
  
      if (componentMounted) {
        const data = await response.clone().json();
        setData(data);
        setFilter(data);
        setLoading(false);
      }
    };
  
    getProducts();
  
    // ✅ correct placement
    return () => {
      componentMounted = false;
    };
  }, []);

  {
    /** LOADING COMPONENT CODE HERE */
  }
  const Loading = () => {
    return (
      <>
        {Array(4).fill().map((_, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <SkeletonTheme baseColor="#E0E0E0" highlightColor="#F5F5F5">
              <Skeleton height={350} />
            </SkeletonTheme>
          </div>
        ))}
      </>
    );
  };


  // Function to filter products based on category
  const filterProduct = (category) => {
    const filtered = data.filter((product) => product.category.name === category);
    setFilter(filtered);
  };

  {
    /** SHOW PRODUCTS COMPOENET HERE */
  }
  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
        <button className="btn btn-outline-dark me-2" onClick={() => setFilter(data)}>All</button>
  <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("Clothes")}>Clothes</button>

  <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("Shoes")}>Footwares</button>
  <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("Furniture")}>Furniture</button>

  <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("Electronics")}>Electronic</button>
    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("Miscellaneous")}>Others</button>
        </div>
        {filter.map((product) => {
          return (
            <>
              <div className="col-md-3 mb-4">
                <div className="card h-100 text-center p-4" key={product.id} style={{ backgroundColor: "#FFF2EB" }}>
                  <img src={product.images} className="card-img-top" alt={product.title} />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text lead fw-bold">
                      ${product.price}
                    </p>
                    
                    <NavLink to={`/products/${product.id}`} className="btn btn-outline-dark " style={{ backgroundColor: "#FFD6BA" }}>
                     Buy Now
                    </NavLink>
                   
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row mb-5">
          <div className="col-12 display-6 fw-bolder text-center">
            <h1>Latest Products</h1>
            <hr />
          </div>
          <div className="row justify-content-center">
            {loading ? <Loading /> : <ShowProducts />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
