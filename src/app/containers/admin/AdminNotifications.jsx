import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import useAuth from "../../context/auth/useAuth";
import { getDrivers } from "../../firebase/firebaseCalls/chat";
import { database } from "../../firebase/firebaseConfig";
import { format } from "timeago.js";

function AdminNotifications() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const getInstituteDrivers = async () => {
    const drivers = await getDrivers(user);

    setDrivers(drivers);
  };

  const getAlerts = async () => {
    const alertCollection = collection(database, "alert");

    const q = query(
      alertCollection,
      where("institute", "==", user.institute),
      orderBy("created_at", "desc")
    );
    const alertSnapshot = await getDocs(q);
    const alerts = alertSnapshot.docs.map((alert) => ({
      id: alert.id,
      ...alert.data(),
    }));

    setAlerts(alerts);
  };

  useEffect(() => {
    getInstituteDrivers();

    getAlerts();
  }, []);

  if (alerts.length === 0) return <h1>No Notifications Yet</h1>;

  return (
    <>
      <h1>Notifications</h1>

      <div className="notification-container">
        <div className="items">
          {alerts.map((alert) => {
            let image = require("../../assets/profile-avatar.jpg");
            drivers.forEach((driver) => {
              if (driver.busNo === alert.busNo) image = driver.image;
            });
            return (
              <div className="notification">
                <div className="d-flex">
                  <img src={image} className="profile-image" />
                  <div className="notification-details">
                    <span>{alert.title}</span>
                    <p>{alert.description}</p>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-end">
                  <span>BY Bus No {alert.busNo}</span>
                  <span>{format(alert.created_at.toDate())}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AdminNotifications;
