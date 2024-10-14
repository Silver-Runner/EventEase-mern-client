import { useEffect, useState } from 'react';
import PageTitle from '../../../../../components/page-title';
import EventForm from '../common/event-form';
import { useParams } from 'react-router-dom';
import { getEventById } from '../../../../../api-services/events-service';
import { message } from 'antd';
import Spinner from '../../../../../components/spinner';

const EditEventPage = () => {
  const [eventData, setEventData] = useState({}); // Initial state for event data
  const [loading, setLoading] = useState(false); // Loading state
  const params = useParams(); // Getting params from the URL

  // Function to fetch event data
  const getData = async () => {
    try {
      setLoading(true); // Set loading to true while fetching
      const response = await getEventById(params.id!); // Fetch the event
      console.log("Fetched event data:", response.data); // Log the fetched data
      setEventData(response.data); // Set the fetched data to state
    } catch (error) {
      message.error("Failed to fetch event"); // Show error message if fetch fails
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };
  
  useEffect(() => {
    getData(); // Call the fetch function when component mounts
  }, []);

  // Show spinner while loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  // Render the edit event page with the fetched data
  return (
    <div>
      <PageTitle title="Edit Event" /> {/* Adjusted title casing */}
      <div className="mt-5">
        <EventForm initialData={eventData} type='edit' /> {/* Pass initial data to the form */}
      </div>
    </div>
  );
};

export default EditEventPage;
