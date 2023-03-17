import type { FC } from "react";
import sliderBG from "../../assets/unstackslider.png";
import sliderButton from "../../assets/unstacksliderbutton.png";

interface SliderInterface {
  min: number;
  max: number;
  value: number;
}

const Slider: FC<SliderInterface> = ({ min, max, value }) => {
  return (
    <div className="flex gap-2">
      <p>1</p>

      <div
        style={{
          backgroundImage: `url(${sliderBG})`,
          width: "137px",
          height: "20px",
        }}
      >
        <img
          className="relative"
          style={{ transform: `translate(${10}px,0px)` }}
          src={sliderButton}
          alt="slider button"
        />
      </div>
      <p>{max}</p>
    </div>
  );
};

export default Slider;
