import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useCreateOrderMutation } from "../../../redux/features/order/orderApi";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import { styles } from "../../styles/style";
import { toast } from "sonner";

type Props = {
  setOpen: any;
  data: any;
  refetch: any;
};

const CheckOutForm = ({ setOpen, data, refetch }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>("");
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery({ skip: loadUser ? false : true });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      await createOrder({ courseId: data._id, payment_info: paymentIntent });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (orderData) {
      setLoadUser(true);
      setOpen(false);
      refetch();
      toast.success("Payment Successfull")
      // redirect(/course/${data._id});
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [orderData, error]);
  return (
    <form id="payment-form" onSubmit={handleSubmit} className="text-xs">
      <LinkAuthenticationElement
        id="link-authentication-element"
        className="text-xs"
      />
      <PaymentElement id="payment-element" className="text-xs" />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="float-right"
      >
        <span
          id="button-text"
          className={`${styles.button} mt-5 text-sm font-thin text-white h-[35px] items-center`}
        >
          {isLoading ? "Paying..." : "Pay now"}
        </span>
      </button>
      {message && (
        <div
          id="payment-message"
          className="text-[red] font-Poppins pt-2 text-xs"
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckOutForm;
