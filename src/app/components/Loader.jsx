import { useRef, useEffect } from "react";
import lottie from "lottie-web";
import data from "../assets/loader/loader.json";

const Loader = () => {
  const container = useRef();

  useEffect(() => {
    lottie
      .loadAnimation({
        container: container.current, // the dom element that will contain the animation
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: data,
      })
      .play();
  }, []);

  return (
    <div
      className="container"
      style={{ width: "100vh", height: "100vh" }}
      ref={container}
    ></div>
  );
};

export default Loader;
