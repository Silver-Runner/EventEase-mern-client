import { useEffect, useState } from "react";
import userGlobalStore, { UsersStoreType } from "../../../store/users-store";
import Spinner from "../../../components/spinner";
import { message } from "antd";
import { getEvents } from "../../../api-services/events-service";
import Filters from "./common/filters";
import EventCard from "./common/event-card";
import { EventType } from "../../../interfaces";

const Homepage = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [filters, setFilters] = useState({
    searchText: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const {currentUser}:UsersStoreType = userGlobalStore() as UsersStoreType;

  const getData = async (filtersObj: any) => {
    try {
      setLoading(true);
      const response = await getEvents(filtersObj);
      setEvents(response.data);
    } catch (error) {
      message.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData({ searchText: "", date: "" });
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Spinner/>
      </div>
    );
  }

  return <div>
    <p className="text-gray-600 text-xl font-bold">
        Welcome, {currentUser?.name}!!!
      </p>

      <Filters filters={filters} setFilters={setFilters} onFilter={getData} />

      <div className="flex flex-col gap-7 mt-7">
        {events.map((event: any) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
  </div>;
};

export default Homepage;
