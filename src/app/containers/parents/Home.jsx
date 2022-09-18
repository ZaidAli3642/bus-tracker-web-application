import { BiChat } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import { BsFilePerson } from "react-icons/bs";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiFillLinkedin,
  AiOutlineWhatsApp,
  AiOutlineTwitter,
} from "react-icons/ai";
import { FaRoute } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import useParentAuth from "../../context/auth/useParentAuth";
import CardHeaderDetails from "../../components/Parent/CardHeaderDetails";

const cardHeader = [
  { id: 1, Icon: BsFilePerson, heading: "Bus Attendence" },
  {
    id: 2,
    Icon: FaRoute,
    heading: "View Schedule Route",
  },
  {
    id: 3,
    Icon: IoLocationSharp,
    heading: "Real-Time Location",
  },
  { id: 4, Icon: BiChat, heading: "Real-Time Chat" },
];

const Home = () => {
  const navigate = useNavigate();
  const { parent } = useParentAuth();

  return (
    <>
      <div className="slider-container">
        <div className={`slider active`}>
          <img
            src={require("../../assets/1.webp")}
            className="slider-image"
            alt=""
          />
          <div className="slider-text">
            <div>
              <h1 className="heading">Right Bus</h1>
              <h1 className="heading">Right Stop</h1>
              <h1 className="heading">Right Time</h1>
            </div>
          </div>
        </div>
      </div>

      <section className="card-section">
        <section className="card">
          <div className="row card-header h-md-25 h-lg-25 h-sm-50 m-0">
            {cardHeader.map((cardDetails) => (
              <CardHeaderDetails cardDetails={cardDetails} />
            ))}
          </div>
          <div className="row h-100 m-0">
            <div className="col-md-6 col-sm-12 p-0 overflow-hidden">
              <img
                src={require("../../assets/2.jpg")}
                className="w-100 h-100 m-0 card-left-image"
                alt=""
              />
            </div>
            <div className="col-md-6 col-sm-12 position-relative overflow-hidden">
              <img
                src={require("../../assets/school-4.jpg")}
                className="w-100 h-100 m-0 card-right-image"
                alt=""
              />
              <div className="card-image-detail p-5 py-sm-3 ">
                <h1
                  className="card-image-heading"
                  data-aos="fade-right"
                  data-aos-delay="300"
                >
                  Parent App
                </h1>
                <h2
                  className="card-image-tagline"
                  data-aos="fade-right"
                  data-aos-delay="300"
                >
                  A Helping Hand For Parents
                </h2>
                <p
                  className="card-image-description"
                  data-aos="flip-right"
                  data-aos-delay="300"
                >
                  <b>Are you worried about your school going children?</b>
                  <p className="card-image-description">
                    We have the solution. Our parent app can make you feel safe
                    and happy. With our app, you can track the real-time where
                    abouts of your children, and many more.
                  </p>
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>

      <footer className="footer">
        <section className="first-footer-section">
          <div className="information" data-aos="fade-right">
            <h2>Bus Tracking App</h2>
            <p className="address">
              <br /> City Sahiwal
              <br /> District Sahiwal
            </p>
            <p>0404500415</p>
            <p>bustrackingsystem9@gmail.com</p>
          </div>

          <div className="authentication" data-aos="fade-left">
            {!parent && (
              <>
                <h4 className="mb-4">Login to get our services</h4>
                <button
                  className="button m-2"
                  onClick={() => navigate("/Login")}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </section>
        <section className="second-footer-section">
          <div>
            <span className="copyright-text">
              Copyright All Right Reserved 2022, Bus Tracking System
            </span>
          </div>
          <div className="footer-icons">
            <AiOutlineFacebook className="icon" />
            <AiOutlineInstagram className="icon" />
            <AiOutlineWhatsApp className="icon" />
            <AiOutlineTwitter className="icon" />
            <AiFillLinkedin className="icon" />
          </div>
        </section>
      </footer>
    </>
  );
};

export default Home;
