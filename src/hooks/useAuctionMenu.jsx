import { useEffect, useState } from "react";

const useAuctionMenu = () => {
  const [auctionMenu, setAuctionMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('http://localhost:3000/auction')
    .then(res =>res.json())
    .then(data => {
      setAuctionMenu(data);
      setLoading(false)
    });
  },[])
  return [auctionMenu, loading]

};

export default useAuctionMenu;