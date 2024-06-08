import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../../components/LoadingPage";

const CheckoutForm = ({ id }) => {
    const navigate = useNavigate()
    const [clientSecret, setClientSecret] = useState('')
    const [error, setError] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const [transactionId, setTransactionId] = useState('')
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const axiosSecure = useAxiosSecure()
    const { data = [], isPending } = useQuery({
        queryKey: ['classDetails', { id }],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes?id=${id}`)
            return res.data
        }
    })

    if (isPending) {
        <LoadingPage />
    }


    const aClass = data.length > 0 ? data[0] : {};



    const totalPrice = parseFloat(aClass?.price);
    console.log(totalPrice)
    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('payment error', error)
            setError(error.message)
        }
        else {
            console.log('payment-method', paymentMethod)
            setError('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm-error', confirmError)
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transactionId', paymentIntent.id)
                setTransactionId(paymentIntent.id)

                const payment = {
                    email: user?.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    classId: id,
                    date: new Date(),
                }

                const res = await axiosSecure.post('/payment', payment)
                console.log('payment-saved', res.data)
                if (res.data?.paymentResult?.insertedId) {
                    Swal({
                        position: "top-end",
                        icon: "success",
                        title: "Payment Successful!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setLoading(false)

                    navigate('/dashboard/myEnrolledClass')
                }
            }
        }
    }

    return (
        <div className="flex items-center justify-center p-24">
            <form className="min-w-[700px]" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                    {loading ? <span className="loading loading-spinner loading-sm p-0 m-0 text-white "></span> : 'PAY'}
                </button>
                <p className="text-red-400">{error}</p>
                {
                    transactionId && <p className="text-green-400">Transaction ID : {transactionId}</p>
                }
            </form>
        </div>
    );
};

export default CheckoutForm;