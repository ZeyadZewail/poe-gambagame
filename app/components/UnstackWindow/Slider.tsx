import type { FC } from "react";
import sliderBG from "../../assets/unstackslider.png";
import sliderButton from "../../assets/unstacksliderbutton.png";

interface SliderInterface {
	min: number;
	max: number;
	value: number;
}

const Slider: FC<SliderInterface> = ({ min, max, value }) => {
	const calcTranslate = () => {
		const l_margin = 8;
		const distance = (value / max) * 90;

		return l_margin + distance;
	};

	return (
		<div className="flex gap-2 justify-center">
			<p>{value}</p>

			<div
				style={{
					backgroundImage: `url(${sliderBG})`,
					width: "137px",
					height: "20px",
					alignSelf: "center",
				}}>
				<img
					className="relative"
					style={{ transform: `translate(${calcTranslate()}px,0px)` }}
					src={sliderButton}
					alt="slider button"
				/>
			</div>
			<p>{max - value}</p>
		</div>
	);
};

export default Slider;
