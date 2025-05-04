import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "../components/CheckoutForm";
import { useNavigate } from "react-router";

const options = {
	mode: "payment",
	amount: 1099,
	currency: "usd",

	appearance: {
		/*...*/
	},
};

const Checkout = () => {
    //const navigate = useNavigate();
	const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
    // console.log(import.meta.env.VITE_STRIPE_PK); // Must NOT be undefined


	return (
		<div className="flex container mt-8">
			<Elements stripe={stripePromise} options={options}>
				<CheckoutForm />
			</Elements>
		</div>
	);
};

export default Checkout;