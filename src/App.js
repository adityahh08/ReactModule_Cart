

import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./style/main.css";
import ShoppingCart from "./components/ShoppingCart";
import ProductList from "./components/ProductList";
import CheckoutForm from "./components/CheckoutForm";
import Navbar from "./components/Navbar"; // Import the Navbar component
import Order from "./components/Order"; // Import the Order component

const UserID = 4;
function App() {
  
  const [cartsVisibilty, setCartVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartItemID, setCArtItemID] = useState([]);

  const [cartId, setCartId] = useState(null); // Store cartId
  const [isCheckout, setIsCheckout] = useState(false); // Track checkout state

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://localhost:7274/api/BookManagement");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get(`https://localhost:7274/api/Cart/get-cart-by-id/${UserID}`);
      console.log('Cart response:', response.data); // Debugging log
      setCartItems(response.data.cartItems); // Assuming API returns { cartId, userId, cartItems: [...] }
      setCartId(response.data.cartId); // Store cartId
      setCArtItemID(response.data.cartItems.map(item => item.cartItemID)); // Store cartItemIDs
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addProductToCart = async (product) => {
    console.log('Adding product to cart:', product); // Debugging log
    try {
      const response = await axios.post(`https://localhost:7274/api/Cart/add-item-to-cart/${UserID}`, {
        bookID: product.bookID,
        price: product.price,
        quantity: 1,
      });
      console.log('Add to cart response:', response.data); // Debugging log
      fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeCart = async () => {
    try {
      const response = await axios.delete(`https://localhost:7274/api/Cart/delete-cart-by-userid/${UserID}`);
      console.log('Remove cart response:', response.data); // Debugging log
      setCartItems([]); // Clear cart items
      setCartId(null); // Clear cartId
    } catch (error) {
      console.error("Error removing cart:", error);
    }
  };

  const handleCheckout = async (address, paymentStatus) => {
    try {
      const response = await axios.post(`https://localhost:7274/api/Cart/checkout/${UserID}?Address=${encodeURIComponent(address)}&Payment_Status=${encodeURIComponent(paymentStatus)}`);
      console.log('Checkout response:', response.data); // Debugging log
      alert("Order has been placed!");
      setIsCheckout(false);
      setCartItems([]); // Clear cart items after checkout
      setCartId(null); // Clear cartId after checkout
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const handleOrderPlaced = () => {
    setIsCheckout(false);
    setCartItems([]); // Clear cart items after checkout
    setCartId(null); // Clear cartId after checkout
  };

  return (
    <Router>
      <div className="App">
        <Navbar cartItems={cartItems} setCartVisible={setCartVisible} /> {/* Use the Navbar component */}
        <Routes>
        <Route path="/order-history" element={<Order UserID={UserID} />} />
          <Route path="/" element={
            isCheckout ? (
              <CheckoutForm onCheckout={handleCheckout} />
            ) : (
              <>
                <ShoppingCart
                  visibilty={cartsVisibilty}
                  products={cartItems}
                  cartItemID={cartItemID}
                  allProducts={products} // Pass allProducts to ShoppingCart
                  onClose={() => setCartVisible(false)}
                  onRemoveCart={removeCart} // Pass removeCart function
                  onCheckout={() => setIsCheckout(true)} // Show checkout form
                />
                <main>
                  <h2 className="title">Books</h2>
                  <ProductList products={products} addProductToCart={addProductToCart} />
                </main>
              </>
            )
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
