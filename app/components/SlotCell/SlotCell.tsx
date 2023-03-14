import { useAtom } from "jotai";
import type { FC } from "react";
import type Item from "~/Types/Item";
import { mouseItem } from "../MouseFollower/MouseFollower";
import { renderVar } from "../StorageController/StorageController";

const cellSideLength = 47.4;

interface SlotInterface {
	item: Item | null;
	parentInventory: Item[];
	x: number;
	y: number;
	isPrimary: boolean;
}

const SlotCell: FC<SlotInterface> = ({ item, x, y, parentInventory, isPrimary }) => {
	const [currentMouseItem, setCurrentMouseItem] = useAtom(mouseItem);
	const [forceRender, SetForceRender] = useAtom(renderVar);

	const calcWidth = () => {
		if (item) {
			return cellSideLength * item.width;
		} else {
			return cellSideLength;
		}
	};

	const calcLength = () => {
		if (item) {
			return cellSideLength * item.length;
		} else {
			return cellSideLength;
		}
	};

	const refresh = () => {
		SetForceRender(!forceRender);
	};

	const ReportPosition = () => {
		console.log(`You clicked slot @ (${x},${y})`);
	};

	const SwapWithMouse = () => {
		if (item != null && currentMouseItem === null) {
			setCurrentMouseItem(item);
			let index = parentInventory.indexOf(item);
			if (index !== -1) {
				parentInventory.splice(index, 1);
			}
		} else if (currentMouseItem != null && item === null) {
			currentMouseItem.x = x;
			currentMouseItem.y = y;
			parentInventory.push(currentMouseItem);
			setCurrentMouseItem(null);
		}
		refresh();
	};

	return (
		<div
			className={`hover:bg-gray-300 hover:bg-opacity-10 ${isPrimary ? "z-20" : "z-10"}`}
			style={isPrimary ? { width: `${calcWidth()}px`, height: `${calcLength()}px` } : { width: "0px", height: "0px" }}
			onClick={() => {
				ReportPosition();
				SwapWithMouse();
			}}>
			{item ? <div className="flex flex-col">{isPrimary ? <img src={item.imgSrc} alt="grid" /> : null}</div> : null}
		</div>
	);
};

export default SlotCell;

export { cellSideLength };
