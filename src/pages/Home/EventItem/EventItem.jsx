const EventItem = ({ item }) => {
  const { title, press, description, photoUrl } = item;

  return (
    <tr>
      {/* Photo column */}
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="rounded h-32 w-32">
              <img src={photoUrl} alt="Event" />
            </div>
          </div>
        </div>
      </td>

      {/* Title, Description, and Press columns */}
      <td colSpan={3}>
        <div className="grid grid-cols-1">
          <div className="text-red-500 text-xl">{title}</div>
          <div className="text-lg">{description}</div>
          <div className="text-lg text-green-600">{press}</div>
        </div>
      </td>
    </tr>
  );
};

export default EventItem;
