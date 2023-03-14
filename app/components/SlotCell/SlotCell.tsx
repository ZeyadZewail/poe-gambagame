import { useAtom } from "jotai";
import { FC, useEffect, useState } from "react";
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
	const [renderBool, SetForceRender] = useAtom(renderVar);
	const [hovered, setHovered] = useState(false);

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

	const ForceRender = () => {
		SetForceRender(!renderBool);
	};

	const ReportPosition = () => {
		console.log(`You clicked slot @ (${x},${y}),Item: ${item?.name}`);
		console.log(item);
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
		ForceRender();
	};

	return (
		<div
			className={`${hovered || item?.hovered ? "bg-gray-300 bg-opacity-10" : null} ${isPrimary ? "z-20" : "z-10"}`}
			style={{ width: `${cellSideLength}px`, height: `${cellSideLength}px` }}
			onClick={() => {
				ReportPosition();
				SwapWithMouse();
			}}
			onMouseEnter={() => {
				if (item) {
					item.hovered = true;
				}
				setHovered(true);
				ReportPosition();
				ForceRender();
			}}
			onMouseLeave={() => {
				if (item) {
					item.hovered = false;
				}
				setHovered(false);
				ForceRender();
			}}>
			{item ? (
				<div
					className="pointer-events-none"
					style={
						isPrimary ? { width: `${calcWidth()}px`, height: `${calcLength()}px` } : { width: "0px", height: "0px" }
					}>
					{isPrimary ? <img src={item.imgSrc} alt="grid" /> : null}
				</div>
			) : null}
		</div>
	);
};

export default SlotCell;

export { cellSideLength };
