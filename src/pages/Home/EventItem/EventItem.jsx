import React from 'react';


const EventItem = ({item}) => {
const {title, press,description,photoUrl} = item;

  return (
    <tr>
    <td>
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="rounded h-32 w-32">
            <img
              src={photoUrl}
              alt="Event" />
          </div>
        </div>
      </div>
    </td>
    <div className='grid grid-cols-1'>
    <td className='text-red-500 text-xl '>{title}</td>
    <td className='text-lg'>{description}</td>
    <td className='text-lg text-green-600'>{press}</td>
    </div>
  </tr>
  );
};

export default EventItem;