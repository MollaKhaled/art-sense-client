import React, { useEffect, useState } from 'react';
import EventItem from '../EventItem/EventItem';
import { Helmet } from 'react-helmet-async';


const Event = () => {
  const [event, setEvent] = useState([])
  useEffect (() => {
    fetch('http://localhost:3000/event')
    .then(res =>res.json())
    .then(data => setEvent(data))

  }, []);
  return (
    <>
    <Helmet>
          <title>artsense | Event</title>
        </Helmet>
      <div>
        <div className="overflow-x-auto w-full">
    <table className="table w-full ">
      <tbody>
        
          {
            event.map(item =><EventItem
            key={item._id}
            item={item}

            ></EventItem>)
          }
       
      </tbody>
     
    </table>
  </div>
      </div>
    </>
  );
};

export default Event;