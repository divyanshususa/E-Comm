import axios from "axios";
import React, { useEffect, useState } from "react";

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", long: "" },
    ispProvider: null,
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        long: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  // useEffect(() => {
  //   async function locate() {

  //     // const res = await axios.get("https://www.latlong.net/c/?lat=28.659780&long=77.481658")
  //     console.log(res)
  //   }
  //   locate()
  // }, [])
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        const ip = data.ip;
        axios.get(`http://localhost:5000/api/isp/get-isp/${ip}`).then((res) => setLocation(prev => ({ ...prev, ispProvider: res.data.isp }))).catch(err => console.log(err))
      })
      .catch(error => console.error('Error:', error));
  }, [])


  return location;
};

export default useGeoLocation;
