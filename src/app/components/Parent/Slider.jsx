const Slider = ({ position, slide }) => {
  return (
    <div className={`slider ${position}`}>
      <img src={slide.image} className="slider-image" alt="" />
      <div className="slider-text">
        <h1>Heading</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing e</p>
      </div>
    </div>
  );
};

export default Slider;
