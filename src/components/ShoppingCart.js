


import { AiFillCloseCircle } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import "./../style/ShoppingCart.css"

function ShoppingCart({
  visibilty,
  products,
  allProducts, 
  onClose,
  onRemoveCart,
  onCheckout, 
}) {
  const getProductDetails = (bookID) => {
    return allProducts.find(product => product.bookID === bookID) || {};
  };

  return (
    <div className="modal" style={{ display: visibilty ? "block" : "none" }}>
      <div className="shoppingCart">
        <div className="header">
          <h2>Shopping cart</h2>
          <button className="btn close-btn" onClick={onClose}>
            <AiFillCloseCircle size={20} />
          </button>
          <button className="btn remove-cart-btn" onClick={onRemoveCart}>
            <RiDeleteBin6Line size={20} />
          </button>
        </div>
        <div className="cart-products">
          {products.length === 0 && (
            <span className="empty-text">Your basket is currently empty</span>
          )}

          {products.map((product) => {
            const details = getProductDetails(product.bookID);
            return (
              <div className="cart-product" key={product.cartItemID}>
              <img
                src={details.imageURL}
                alt={details.title}
                className="product-image"
              />
              <div className="product-info">
                <h3>{details.title || `Book # ${product.bookID}`}</h3>
                <span className="product-price">{product.totalAmount} Rs</span>
              </div>
            </div>
            
            );
          })}

          {products.length > 0 && (
            <button className="btn checkout-btn" onClick={onCheckout}>
              Proceed to checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;





