import { atom } from "jotai";
import { useAtom } from "jotai/react";
import { useEffect } from "react";
import type Item from "~/Types/Item";
import { cellSideLength } from "../SlotCell/SlotCell";
import useMousePosition from "./UseMousePosition";

const mouseItem = atom<Item | null>(null);
export { mouseItem };

const MouseFollower = () => {
	const [currentItem] = useAtom(mouseItem);
	const mousePosition = useMousePosition();

	useEffect(() => {
		console.log(currentItem);
	}, [currentItem]);

	const calcWidth = () => {
		if (currentItem) {
			return cellSideLength * currentItem.width;
		} else {
			return cellSideLength;
		}
	};

	const calcLength = () => {
		if (currentItem) {
			return cellSideLength * currentItem.length;
		} else {
			return cellSideLength;
		}
	};

	return (
		<div
			className="z-10"
			style={{
				width: `${calcWidth()}px`,
				height: `${calcLength()}px`,
				position: "fixed",
				transform: `translate(${mousePosition.x - 0.5 * calcWidth()}px,${mousePosition.y - 0.5 * calcLength()}px)`,
			}}>
			{currentItem != null ? <img src={currentItem.imgSrc} alt="grid" /> : null}
		</div>
	);
};

export default MouseFollower;
