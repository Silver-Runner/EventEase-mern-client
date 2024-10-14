import { useEffect, useState } from "react";
import { cancelBooking, getUserBookings } from "../../../../api-services/booking-service";
import PageTitle from "../../../../components/page-title"
import { BookingType } from "../../../../interfaces";
import { message, Popconfirm, Table } from "antd";
import { getDateTimeFormat } from "../../../../helpers/date-time-formats";
import usersGlobalStore, { UsersStoreType } from "../../../../store/users-store";

const UserBookingPage = () => {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentUser }: UsersStoreType = usersGlobalStore() as UsersStoreType;
  const getData = async () => {
    try {
      setLoading(true);
      const response = await getUserBookings();
      setBookings(response.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onCancelBooking = async (booking: BookingType) => {
    try {
      setLoading(true);
      const payload = {
        eventId: booking.event._id,
        ticketTypeName: booking.ticketType,
        ticketsCount: booking.ticketsCount,
        bookingId: booking._id,
        paymentId: booking.paymentId,
      };

      await cancelBooking(payload);
      message.success("Booking cancelled successfully");
      getData();
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  const columns = [
    {
      title: "Event Name",
      dataIndex: "event",
      key: "event",
      render: (event: any) => event.name,
    },
    {
      title: "Event Date & Time",
      dataIndex: "event",
      key: "event",
      render: (event: any) => getDateTimeFormat(`${event.date} ${event.time}`),
    },
    {
      title: "Ticket Type",
      dataIndex: "ticketType",
      key: "ticketType",
    },
    {
      title: "Ticket Count",
      dataIndex: "ticketsCount",
      key: "ticketsCount",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => status.toUpperCase(),
    },
    {
      title: "Booked On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => getDateTimeFormat(createdAt),
    },
    {
      title: "Action",
      key: "action",
      render: (record: BookingType) => {
        if (record.status === "booked") {
          return (
            <Popconfirm
              title="Are you sure you want to cancel this booking?"
              onConfirm={() => onCancelBooking(record)}
              okText="Yes"
              cancelText="No"
              placement='leftBottom'
            >
              <span className="text-gray-600 cursor-pointer text-sm underline">
                Cancel
              </span>
            </Popconfirm>
          );
        }
        return "";
      },
    },
  ];
  return (
    <div>
      <PageTitle title={`${currentUser?.name} your bookings`}/>
      <Table
        dataSource={bookings}
        columns={columns}
        loading={loading}
        rowKey="_id"
        pagination={false}
      />
    </div>
  )
}

export default UserBookingPage
