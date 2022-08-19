import Detail from "./../components/Detail";
import { useLocation } from "react-router-dom";

const BusDetails = () => {
  const location = useLocation();

  const { busNo, licenseNo, image, routes, maintainance } = location.state;

  return (
    <>
      <h1>Bus Details</h1>
      <div className="items">
        <h4>Bus Information</h4>
        <div className="items-details">
          <div>
            <Detail label="Bus Number" detail={busNo} />
          </div>
          <div className="right-item">
            <Detail label="License Number" detail={licenseNo} />
          </div>
        </div>
        <div className="line"></div>

        <div className="items-details">
          <div className="input-container">
            <label className="label">License Picture</label>
            <img
              src={image ? image : require("../assets/zaid-saleem-image.jpg")}
              className="square-image"
              alt="license"
            />
          </div>
        </div>
        <div className="line"></div>
        <h3>Routes</h3>

        <div className="items-details" style={{ flexDirection: "column" }}>
          {routes.map((route) => (
            <div className="input-container" style={{ flexDirection: "row" }}>
              <Detail label="Latitude" detail={route.latitude} />
              <Detail
                label="Longitude"
                detail={route.longitude}
                margin="0 25px"
              />
            </div>
          ))}
        </div>
        <div className="line"></div>

        <div className="items-details">
          <Detail label="Maintainance" detail={maintainance} />
        </div>
      </div>
    </>
  );
};

export default BusDetails;
