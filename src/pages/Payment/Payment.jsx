import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useParams } from 'react-router-dom';


const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_publishable_key)
const Payment = () => {
    const {id}= useParams()
    
    return (
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm id={id} />
                </Elements>
            </div>
    );
};

export default Payment;