import { useRef } from "react";
import lottie from "lottie-web";

const Loader = ({ isLoading }) => {
  const container = useRef();

  lottie.loadAnimation({
    container: container.current, // the dom element that will contain the animation
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: require("../assets/loader/loader.json"),
  });

  if (!isLoading) return null;

  return <div className="container" ref={container}></div>;
};

export default Loader;
