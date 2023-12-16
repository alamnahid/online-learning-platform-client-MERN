import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import axios from "axios";

const CheckOutForm = ({price, classData, refetch}) => {
    // console.log(price)
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure()

    
    useEffect(()=>{
      
     if(price>0){
        axiosSecure.post('/create-payment-intent', {price: price})
        .then(res=>{
          // console.log(res.data.clientSecret)
          setClientSecret(res.data.clientSecret)
        })
     }
      
    }, [axiosSecure, price])



    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(!stripe || !elements){
            return;
        }
        const card = elements.getElement(CardElement)

        if(card === null){
            return;
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if(error){
            console.log('payment error', error)
            setError(error.message)
        }
        else{
            // console.log('payment method', paymentMethod)
            setError('')
        }

        // confirm payment
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || 'anonymous',
              name: user?.displayName || 'anonymous'
            }

          }
        })
        if(confirmError){
          console.log('confirm error')
        }
        else{
          // console.log('payment intent', paymentIntent)
          if(paymentIntent.status==='succeeded'){
            // console.log('transaction id', paymentIntent.id);
            setTransactionId(paymentIntent.id)

            // now save the payment in the database
            const payment = {
              email: user.email,
              name: user.displayName,
              price: price,
              transactionId: paymentIntent.id,
              date: new Date(),
              title: classData.title,
              status: 'pending',
              instructoremail: classData.email,
              instrctorname: classData.name,
              classdescription: classData.description,
              instructorimage: classData.image,
              courseId: classData._id

            }
           const res = await axiosSecure.post('/payments', payment)
           const updateRes = await axios.patch(`http://localhost:5000/addclasses/adminroute/approved/${classData?._id}`);
          //  console.log(updateRes.data)
          //  console.log(res.data)
           Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment Successfull",
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/dashboard/enroll-classes')
        

          }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement className="border-2 border-orange-600 h-14 pt-4 p-4"
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
       <p className="text-red-700">{error}</p>
      {
        transactionId && <p className="text-green-500 text-lg">Your transaction ID: {transactionId}</p>
      }
     <div className=" text-center">
     <button className="w-[200px] lg:w-[400px] h-[2rem] lg:h-[4rem] btn btn-neutral mt-12 text-xl" type="submit" disabled={!stripe}>
        Pay
      </button>
     </div>
     


        </form>
    );
};

export default CheckOutForm;