import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/Checkout";
import { useStateContext } from '../context/StateContext';
import getStripe from '../lib/getStripe';

export default function App() {
    const [clientSecret, setClientSecret] = useState("");
    const { cartItems } = useStateContext();

    const stripe = getStripe();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/api/stripe-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cartItems),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
        externalPaymentMethodTypes: ['external_scalapay']
    };

    return (
        <div className="App">
            {clientSecret && (
                <Elements options={options} stripe={stripe}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
}