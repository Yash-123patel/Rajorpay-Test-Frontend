import { useState, useEffect } from "react";

const Razorpay = () => {
  const [orderId, setOrderId] = useState("order_QCaOsivX7ewdgo");

  useEffect(() => {
    // Check if script already exists to prevent multiple loads
    if (!document.querySelector("script[src='https://checkout.razorpay.com/v1/checkout.js']")) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const openRazorpayCheckout = () => {
    if (!window.Razorpay) {
      console.error("Razorpay SDK not loaded. Please check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_nRkHAqGQmSucAb", // Replace with your Razorpay key
      order_id: orderId, 
      handler: (response) => {
        console.log("Order ID:", orderId);
        console.log("Payment ID:", response.razorpay_payment_id);
        console.log("Signature:", response.razorpay_signature);
      },
      prefill: { name: "Yash Patel", email: "yash@gmail.com", contact: "9876543210" },
      theme: { color: "#2563EB" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-4">Make a Payment</h2>
        <p className="text-center text-gray-600 mb-4">Order ID: <strong>{orderId}</strong></p>
        <button
          onClick={openRazorpayCheckout}
          className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
        >
          Pay with Razorpay
        </button>
      </div>
    </div>
  );
};

export default Razorpay;
