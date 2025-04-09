



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./style/main.css";
// import { GiShoppingBag } from "react-icons/gi";
// import ShoppingCart from "./components/ShoppingCart";
// import ProductList from "./components/ProductList";
// import CheckoutForm from "./components/CheckoutForm";

// const USER_ID = 1; // Replace with dynamic user ID if available

// function App() {
//   const UserID = 4;
//   const [cartsVisibilty, setCartVisible] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [cartId, setCartId] = useState(null); // Store cartId
//   const [isCheckout, setIsCheckout] = useState(false); // Track checkout state

//   useEffect(() => {
//     fetchProducts();
//     fetchCart();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get("https://localhost:7274/api/BookManagement");
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const fetchCart = async () => {
//     try {
//       const response = await axios.get(`https://localhost:7274/api/Cart/get-cart-by-id/${UserID}`);
//       console.log('Cart response:', response.data); // Debugging log
//       setCartItems(response.data.cartItems); // Assuming API returns { cartId, userId, cartItems: [...] }
//       setCartId(response.data.cartId); // Store cartId
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     }
//   };

//   const addProductToCart = async (product) => {
//     console.log('Adding product to cart:', product); // Debugging log
//     try {
//       const response = await axios.post(`https://localhost:7274/api/Cart/add-item-to-cart/${UserID}`, {
//         bookID: product.bookID,
//         price: product.price,
//         quantity: 1,
//       });
//       console.log('Add to cart response:', response.data); // Debugging log
//       fetchCart();
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   const removeCart = async () => {
//     try {
//       const response = await axios.delete(`https://localhost:7274/api/Cart/delete-cart-by-userid/${UserID}`);
//       console.log('Remove cart response:', response.data); // Debugging log
//       setCartItems([]); // Clear cart items
//       setCartId(null); // Clear cartId
//     } catch (error) {
//       console.error("Error removing cart:", error);
//     }
//   };

//   const handleCheckout = async (address, paymentStatus) => {
// 	try {
// 	  const response = await axios.post(`https://localhost:7274/api/Cart/checkout/${UserID}?Address=${encodeURIComponent(address)}&Payment_Status=${encodeURIComponent(paymentStatus)}`);
// 	  console.log('Checkout response:', response.data); // Debugging log
// 	  alert("Order has been placed!");
// 	  setIsCheckout(false);
// 	  setCartItems([]); // Clear cart items after checkout
// 	  setCartId(null); // Clear cartId after checkout
// 	} catch (error) {
// 	  console.error("Error during checkout:", error);
// 	  alert("Failed to place order. Please try again.");
// 	}
//   };
  
  

//   const handleOrderPlaced = () => {
//     setIsCheckout(false);
//     setCartItems([]); // Clear cart items after checkout
//     setCartId(null); // Clear cartId after checkout
//   };

//   return (
//     <div className="App">
//       {isCheckout ? (
//         <CheckoutForm onCheckout={handleOrderPlaced} />
//       ) : (
//         <>
//           <ShoppingCart
//             visibilty={cartsVisibilty}
//             products={cartItems}
//             allProducts={products} // Pass allProducts to ShoppingCart
//             onClose={() => setCartVisible(false)}
//             onRemoveCart={removeCart} // Pass removeCart function
//             onCheckout={handleCheckout} // Pass handleCheckout function
//           />
//           <div className="navbar">
//             <h3 className="logo">BookStore</h3>
//             <button
//               className="btn shopping-cart-btn"
//               onClick={() => setCartVisible(true)}
//             >
//               <GiShoppingBag size={24} />
//               {cartItems.length > 0 && (
//                 <span className="product-count">
//                   {cartItems.length}
//                 </span>
//               )}
//             </button>
//           </div>
//           <main>
//             <h2 className="title">Products</h2>
//             <ProductList products={products} addProductToCart={addProductToCart} />
//           </main>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;




import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/main.css";
import { GiShoppingBag } from "react-icons/gi";
import ShoppingCart from "./components/ShoppingCart";
import ProductList from "./components/ProductList";
import CheckoutForm from "./components/CheckoutForm";

const USER_ID = 1; // Replace with dynamic user ID if available

function App() {
  const UserID = 4;
  const [cartsVisibilty, setCartVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
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
    <div className="App">
      {isCheckout ? (
        <CheckoutForm onCheckout={handleCheckout} />
      ) : (
        <>
          <ShoppingCart
            visibilty={cartsVisibilty}
            products={cartItems}
            allProducts={products} // Pass allProducts to ShoppingCart
            onClose={() => setCartVisible(false)}
            onRemoveCart={removeCart} // Pass removeCart function
            onCheckout={() => setIsCheckout(true)} // Show checkout form
          />
          <div className="navbar">
            <h3 className="logo">BookStore</h3>
            <button
              className="btn shopping-cart-btn"
              onClick={() => setCartVisible(true)}
            >
              <GiShoppingBag size={24} />
              {cartItems.length > 0 && (
                <span className="product-count">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
          <main>
            <h2 className="title">Products</h2>
            <ProductList products={products} addProductToCart={addProductToCart} />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
