import { useEffect, useState } from "react";
import Slider from "../../components/Parent/Slider";
import ScrollReveal from "scrollreveal";
import { BiConfused } from "react-icons/bi";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiFillLinkedin,
  AiOutlineWhatsApp,
  AiOutlineTwitter,
} from "react-icons/ai";
import CardHeaderDetails from "../../components/Parent/CardHeaderDetails";

const cardHeader = [
  { id: 1, Icon: BiConfused, heading: "Heading", tagline: "tagline" },
  { id: 2, Icon: BiConfused, heading: "Heading", tagline: "tagline" },
  { id: 3, Icon: BiConfused, heading: "Heading", tagline: "tagline" },
  { id: 4, Icon: BiConfused, heading: "Heading", tagline: "tagline" },
];

const Home = () => {
  const [slider, setSlider] = useState([
    { image: require("../../assets/student-1.jpg") },
    { image: require("../../assets/student-4.jpg") },
    { image: require("../../assets/school-4.jpg") },
  ]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = slider.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, slider]);

  useEffect(() => {
    const slider = setInterval(() => setIndex(index + 1), 5000);
    return () => clearInterval(slider);
  }, [index]);

  return (
    <>
      <div className="slider-container">
        {slider.map((slide, slideIndex) => {
          let position = "nextSlide";
          if (slideIndex === index) {
            position = "active";
          }
          if (
            slideIndex === index - 1 ||
            (index === 0 && slideIndex === slider.length - 1)
          ) {
            position = "lastSlide";
          }
          return <Slider position={position} slide={slide} />;
        })}
      </div>

      <section className="card-section" data-aos="fade-right">
        <section className="card">
          <div className="row card-header h-md-25 h-lg-25 h-sm-50 m-0">
            {cardHeader.map((cardDetails) => (
              <CardHeaderDetails cardDetails={cardDetails} />
            ))}
          </div>
          <div className="row h-100 m-0">
            <div className="col-md-6 col-sm-12 p-0 overflow-hidden">
              <img
                src={require("../../assets/school-3.jpg")}
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
                  data-aos-delay="300">
                  Heading
                </h1>
                <h2
                  className="card-image-tagline"
                  data-aos="fade-right"
                  data-aos-delay="300">
                  Taglines
                </h2>
                <p
                  className="card-image-description"
                  data-aos="flip-right"
                  data-aos-delay="300">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam cum explicabo repudiandae aut ad! Qui, deserunt vero
                  quis officia, eveniet deleniti, eius eaque suscipit provident
                  quia molestias amet ducimus. Magni!
                </p>
                <button
                  className="button mt-5"
                  data-aos="fade-up"
                  data-aos-delay="300">
                  Button
                </button>
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
              Chak #95/12L
              <br /> Tehsil Chichawatni
              <br /> District Sahiwal
            </p>
            <p>123456789</p>
            <p>zaidali36422@gmail.com</p>
          </div>
          <div className="authentication" data-aos="fade-left">
            <h4 className="mb-4">Login or Signup to get our services</h4>
            <button className="button m-2">Login</button>
            <button className="button m-2">Signup</button>
          </div>
        </section>
        <section className="second-footer-section">
          <div>
            <span className="copyright-text">
              Copyright All Right Reserved 2022, Zaid Saleem
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
