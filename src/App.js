
// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "./style/main.css";
// import axios from "axios";
// import ShoppingCart from "./components/ShoppingCart";
// import ProductList from "./components/ProductList";
// import CheckoutForm from "./components/CheckoutForm";
// import Navbar from "./components/Navbar";
// import Order from "./components/Order";
// import { useNavigate } from "react-router-dom";
// import { fetchProducts, fetchCart, addProductToCart, removeCart, handleCheckout } from './api'; // Import the functions

// const UserID = 4;



// function App() {
//   const [cartItems, setCartItems] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [cartItemID, setCArtItemID] = useState([]);
//   const [cartId, setCartId] = useState(null);
//   const [isCheckout, setIsCheckout] = useState(false);
//   const [cartsVisibilty, setCartVisible] = useState(false);


//   useEffect(() => {
//     loadProducts();
//     loadCart();

//   }, []);



//   const loadProducts = async () => {
//     try {
//       const productsData = await fetchProducts();
//       setProducts(productsData);
//     } catch (error) {
//       console.error("Error loading products:", error);
//     }
//   };

//   const loadCart = async () => {
//     try {
//       const cartData = await fetchCart();
//       setCartItems(cartData.cartItems); // Assuming API returns { cartId, userId, cartItems: [...] }
//       setCartId(cartData.cartId); // Store cartId
//       setCArtItemID(cartData.cartItems.map(item => item.cartItemID)); // Store cartItemIDs
//     } catch (error) {
//       console.error("Error loading cart:", error);
//     }
//   };

//   const handleAddProductToCart = async (product) => {
//     try {
//       await addProductToCart(product);
//       loadCart();
//     } catch (error) {
//       console.error("Error adding product to cart:", error);
//     }
//   };

//   const handleRemoveCart = async () => {
//     try {
//       await removeCart();
//       setCartItems([]); // Clear cart items
//       setCartId(null); // Clear cartId
//     } catch (error) {
//       console.error("Error removing cart:", error);
//     }
//   };

//   const handleCheckoutProcess = async (address, paymentStatus) => {
//     try {

//       await handleCheckout(address, paymentStatus);
//       alert("Order has been placed!");
//       setIsCheckout(false);
      

//       setCartItems([]); // Clear cart items after checkout
//       setCartId(null); // Clear cartId after checkout
//     } catch (error) {
//       console.error("Error during checkout:", error);
//       alert("Failed to place order. Please try again.");
//     }
//   };

  
// const RemoveItemFromCart = async (cartItemID) => {
//       try {
//         await axios.delete(`https://localhost:7274/api/Cart/remove-item-from-cart/${cartItemID}`);
//         setProducts(products.filter(product => product.cartItemID !== cartItemID));
//       loadCart();
//       } catch (error) {
//         console.error("Error deleting product from cart:", error);
//       }
//     };

  

  

//   return (
//     <Router>
//     <div className="App">
//       <Navbar cartItems={cartItems} setCartVisible={setCartVisible} />
//       <Routes>
//         <Route path="/checkout" element={<CheckoutForm onCheckout={handleCheckoutProcess} />} />
//         <Route path="/order-history" element={<Order UserID={UserID} />} />
//         <Route path="/" element={
//           <>
//             <ShoppingCart
//               visibilty={cartsVisibilty}
//               products={cartItems}
//               cartItems={cartItems}
//               allProducts={products}
//               onClose={() => setCartVisible(false)}
//               onRemoveCart={handleRemoveCart}
//               onCheckout={() => setIsCheckout(true)}
//               RemoveItemFromCart={RemoveItemFromCart}
//             />
//             <main>
//               <h2 className="title">Books</h2>
//               <ProductList products={products} addProductToCart={handleAddProductToCart} />
//             </main>
//           </>
//         } />
//       </Routes>
//     </div>
//   </Router>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./style/main.css";
import axios from "axios";
import ShoppingCart from "./components/ShoppingCart";
import ProductList from "./components/ProductList";
import CheckoutForm from "./components/CheckoutForm";
import Navbar from "./components/Navbar";
import Order from "./components/Order";
import SearchBar from "./components/Searchbar"; // Import the SearchBar component
import { fetchProducts, fetchCart, addProductToCart, removeCart, handleCheckout } from './api'; // Import the functions

const UserID = 4;

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItemID, setCartItemID] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [isCheckout, setIsCheckout] = useState(false);
  const [cartsVisibility, setCartVisible] = useState(false);

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  const loadProducts = async () => {
    try {
      const productsData = await fetchProducts();
      setProducts(productsData);
      setFilteredProducts(productsData); // Initialize filteredProducts with all products
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const loadCart = async () => {
    try {
      const cartData = await fetchCart();
      setCartItems(cartData.cartItems); // Assuming API returns { cartId, userId, cartItems: [...] }
      setCartId(cartData.cartId); // Store cartId
      setCartItemID(cartData.cartItems.map(item => item.cartItemID)); // Store cartItemIDs
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  const handleAddProductToCart = async (product) => {
    try {
      await addProductToCart(product);
      loadCart();
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleRemoveCart = async () => {
    try {
      await removeCart();
      setCartItems([]); // Clear cart items
      setCartId(null); // Clear cartId
    } catch (error) {
      console.error("Error removing cart:", error);
    }
  };

  const handleCheckoutProcess = async (address, paymentStatus) => {
    try {
      await handleCheckout(address, paymentStatus);
      alert("Order has been placed!");
      setIsCheckout(false);
      setCartItems([]); // Clear cart items after checkout
      setCartId(null); // Clear cartId after checkout
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const RemoveItemFromCart = async (cartItemID) => {
    try {
      await axios.delete(`https://localhost:7274/api/Cart/remove-item-from-cart/${cartItemID}`);
      setProducts(products.filter(product => product.cartItemID !== cartItemID));
      loadCart();
    } catch (error) {
      console.error("Error deleting product from cart:", error);
    }
  };

 
  const RedirectToHomePage = () => {
    setCartVisible(false);
  
  }
 
  

  return (
    <Router>
      <div className="App">
        <Navbar cartItems={cartItems} setCartVisible={setCartVisible} />
        <Routes>
          <Route path="/checkout" element={<CheckoutForm onCheckout={handleCheckoutProcess} />} />
          <Route path="/order-history" element={<Order UserID={UserID} />} />
          <Route path="/" element={
            <>
              <ShoppingCart
                visibilty={cartsVisibility}
                products={cartItems}
                cartItems={cartItems}
                allProducts={products}

                onClose={() => setCartVisible(false)}
                onRemoveCart={handleRemoveCart}
                onCheckout={() => setIsCheckout(true)}
                RemoveItemFromCart={RemoveItemFromCart}
                RedirectToHomePage={RedirectToHomePage} // Pass the function to ShoppingCart
              />
              <main>
                <h2 className="title">Books</h2>
                <ProductList products={filteredProducts} addProductToCart={handleAddProductToCart} /> {/* Use filteredProducts */}
              </main>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
