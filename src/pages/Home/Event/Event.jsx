import React, { useEffect, useState } from 'react';
import EventItem from '../EventItem/EventItem';
import { Helmet } from 'react-helmet-async';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const Event = () => {
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetch('http://localhost:3000/event')
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setLoading(false); // Set loading to false after fetching data
      })
      .catch(() => setLoading(false)); // Handle errors gracefully
  }, []);

  return (
    <>
      <Helmet>
        <title>artsense | Event</title>
      </Helmet>
      <div>
        {loading ? (
          // Show spinner when loading
          <LoadingSpinner />
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <tbody>
                {event.map((item) => (
                  <EventItem key={item._id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Event;
