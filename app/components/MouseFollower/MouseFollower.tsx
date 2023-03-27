import { atom } from "jotai";
import { useAtom } from "jotai/react";
import type Item from "~/Types/Item";
import type ItemInventory from "~/Types/ItemInventory";
import { cellSideLengthVar } from "../SlotCell/SlotCell";
import useMousePosition from "./UseMousePosition";

interface slotLocation {
	parentInventory: ItemInventory;
	x: number;
	y: number;
}

const mouseItem = atom<Item | null>(null);
const hoveredSlotLocationVar = atom<slotLocation | null>(null);
export { mouseItem, hoveredSlotLocationVar };

const MouseFollower = () => {
	const [currentItem] = useAtom(mouseItem);
	const mousePosition = useMousePosition();
	const [cellSideLength] = useAtom<number>(cellSideLengthVar);

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
			className="z-50 pointer-events-none select-none"
			style={{
				width: `${calcWidth()}px`,
				height: `${calcLength()}px`,
				position: "fixed",
				transform: `translate(${mousePosition.x - 0.5 * calcWidth()}px,${mousePosition.y - 0.5 * calcLength()}px)`,
			}}>
			{currentItem != null ? <img src={currentItem.imgSrc} className="z-30" alt="grid" /> : null}

			{currentItem != null && currentItem.maxStack > 1 ? (
				<div
					className={`relative bottom-[105%] left-[7%] text-s stroke-black ${
						currentItem.count == currentItem.maxStack ? "text-blue-600" : "text-white"
					}`}>
					{currentItem.count}
				</div>
			) : null}
		</div>
	);
};

export default MouseFollower;
