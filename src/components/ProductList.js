import React from "react";
import "./../style/ProductList.css";

function ProductList({ products, addProductToCart }) {
  return (
    <div className="products">
      {products.map((product) => (
        <div className="product" key={product.bookID}>
          <img className="product-image" src={product.imageURL} alt={product.title} />
          <div className="product-info">
            <h4 className="product-name">{product.title}</h4>
            <p className="product-author">Author: {product.author.authorName}</p>
            <p className="product-category">Category: {product.category.categoryName}</p>
            <span className="product-price">{product.price} Rs</span>
          </div>
          <div className="button">
            <button className="btnss" onClick={() => addProductToCart(product)}>
              Add to cart
            </button>

            
          </div>

          {/* <div className="buttons">
            <button className="btn">Detail</button>
            <button className="btn" onClick={() => addProductToCart(product)}>
              Add to cart
            </button>

            
          </div> */}
        </div>
      ))}
    </div>
  );
}

export default ProductList;
