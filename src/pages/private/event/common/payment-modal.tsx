import { Button, message, Modal } from "antd";
import { EventType } from "../../../../interfaces";
import { PaymentElement ,AddressElement,useStripe,useElements} from "@stripe/react-stripe-js";
import { useState } from "react";
import { createBooking } from "../../../../api-services/booking-service";
import { useNavigate } from "react-router-dom";

const PaymentModal = ({
  showPaymentModal,
  setShowPaymentModal,
  selectedTicketType,
  selectedTicketCount,
  totalAmount,
  event
}:{
  showPaymentModal: any;
  setShowPaymentModal: any;
  selectedTicketType: string;
  selectedTicketCount: number;
  totalAmount: number;
  event: EventType;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handlesubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      if(!stripe || !elements){
        return;
      }
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://example.com/order/123/complete",
        },
        redirect: 'if_required'
      });
      if(result.error){
        message.error(result.error.message)
      }else{
        message.success("Payment successful");
        const bookingPayload = {
          event: event._id,
          ticketType: selectedTicketType,
          ticketsCount: selectedTicketCount,
          totalAmount,
          paymentId: result.paymentIntent.id,
          status: "booked",
        };
        await createBooking(bookingPayload);
        message.success("Booking successful");
        navigate("/profile/bookings");
        setShowPaymentModal(false);
      }
    } catch (error:any) {
      message.error(error.message);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div>
      <Modal 
      open={showPaymentModal}
      onCancel={() => setShowPaymentModal(false)}
      title="Make Payment"
      centered
      footer={null}>
        <form onSubmit={handlesubmit}>
          <PaymentElement/>
          <AddressElement
          options={
            {
              mode: 'shipping',
              allowedCountries: ['us']
            }
          }/>
          <div className="mt-7 flex justify-end gap-6">
              <Button
              onClick={() => setShowPaymentModal(false)}
              disabled={loading}
              >Cancel</Button>
              <Button type="primary" htmlType='submit' loading={loading}>Pay</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default PaymentModal
