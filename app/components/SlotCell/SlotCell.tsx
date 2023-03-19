import { readConfig } from "@remix-run/dev/dist/config";
import { useAtom } from "jotai";
import type { FC } from "react";
import { useState } from "react";
import { renderVar } from "~/routes";
import type Item from "~/Types/Item";
import type ItemInventory from "~/Types/ItemInventory";
import { hoveredSlot, mouseItem } from "../MouseFollower/MouseFollower";
import { unStackVar } from "../StorageController/StorageController";
import {
	unStackWindowItemParentVar,
	unStackWindowItemVar,
	UnStackWindowLocationVar,
} from "../UnstackWindow/UnstackWindow";

const cellSideLength = 47.4;

interface SlotInterface {
	item: Item | null;
	parentInventory: ItemInventory;
	x: number;
	y: number;
	isPrimary: boolean;
	horti: boolean;
}

const SlotCell: FC<SlotInterface> = ({ item, x, y, parentInventory, isPrimary, horti }) => {
	const [currentMouseItem, SetCurrentMouseItem] = useAtom(mouseItem);
	const [renderBool, SetForceRender] = useAtom(renderVar);
	const [hovered, SetHovered] = useState(false);
	const [mouseHoveredSlot, SetMouseHoveredSlot] = useAtom(hoveredSlot);
	const [UnstackWindow, SetUnstackWindow] = useAtom(unStackVar);
	const [unStackWindowItem, SetUnstackWindowItem] = useAtom(unStackWindowItemVar);
	const [UnstackWindowLocation, SetUnstackWindowLocation] = useAtom(UnStackWindowLocationVar);
	const [UnstackWindowItemParent, SetUnstackWindowItemParent] = useAtom(unStackWindowItemParentVar);

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
		// console.log(`You clicked slot @ (${x},${y}),Item: ${item?.name},Primary: ${isPrimary}`);
		SetMouseHoveredSlot({ x: x, y: y, parentInventory: parentInventory });
	};

	const SwapWithMouse = () => {
		if (item === null && currentMouseItem === null) {
			return;
		}

		if (item != null && currentMouseItem === null) {
			SetCurrentMouseItem(item);
			let index = parentInventory.items.indexOf(item);
			if (index !== -1) {
				parentInventory.items.splice(index, 1);
			}
		} else if (currentMouseItem != null && item === null) {
			// const parentSlotX = x + Math.floor(currentMouseItem.width / 2);
			if (horti) {
				currentMouseItem.x = x;
				currentMouseItem.y = y;
				parentInventory.items.push(currentMouseItem);
				SetCurrentMouseItem(null);
			} else if (CheckViableForItem(x, y, currentMouseItem)) {
				currentMouseItem.x = x;
				currentMouseItem.y = y - Math.floor(currentMouseItem.length / 2);
				parentInventory.items.push(currentMouseItem);
				SetCurrentMouseItem(null);
			}
		} else if (currentMouseItem != null && item != null) {
			if (item.name === currentMouseItem.name && item.maxStack > 1 && item.count < item.maxStack) {
				const spaceToTake = item.maxStack - item.count;
				const possibleToGive = Math.min(spaceToTake, currentMouseItem.count);
				const remainder = currentMouseItem.count - possibleToGive;
				item.count += possibleToGive;
				remainder == 0 ? SetCurrentMouseItem(null) : (currentMouseItem.count = remainder);
			}

			// if (CheckViableForItem(x, y, currentMouseItem)) {
			// 	//temp for holding current item
			// 	const temp: Item = item;
			// 	//add mouseitem to inv
			// 	currentMouseItem.x = x;
			// 	currentMouseItem.y = y - Math.floor(currentMouseItem.length / 2);
			// 	parentInventory.items.push(currentMouseItem);
			// 	//add item to mouse and remove from inv
			// 	setCurrentMouseItem(item);
			// 	let index = parentInventory.items.indexOf(item);
			// 	if (index !== -1) {
			// 		parentInventory.items.splice(index, 1);
			// 	}
			// }
		}
		ForceRender();
	};

	const CheckSpaceForItem = (x: number, y: number, item: Item) => {
		if (currentMouseItem != null) {
			const parentSloty = y - Math.floor(currentMouseItem.length / 2);

			const rightSpace = parentInventory.width - x;
			const leftSpace = parentInventory.length - parentSloty;
			if (rightSpace >= currentMouseItem.width && leftSpace >= currentMouseItem.length) {
				return true;
			}
		}
		return false;
	};

	const CheckViableForItem = (x: number, y: number, item2: Item | null) => {
		// if (item == null && item2 != null && CheckSpaceForItem(x, y, item2)) {
		// 	return true;
		// }

		if (item === null && item2 != null && CheckSpaceForItem(x, y, item2)) {
			const parentSloty = y - Math.floor(item2.length / 2);
			const viabilityMatrix = parentInventory.generateItemGrid();
			for (let i = 0; i < item2.length; i++) {
				for (let j = 0; j < item2.width; j++) {
					if (viabilityMatrix[parentSloty + i][x + j] != null) {
						return false;
					}
				}
			}
			return true;
		}

		// if (item != null && item2 != null && CheckSpaceForItem(x, y, item2)) {
		// 	const parentSloty = y - Math.floor(item2.length / 2);
		// 	const virtualInv = new ItemInventory(parentInventory.length, parentInventory.width, [...parentInventory.items]);
		// 	let index = virtualInv.items.indexOf(item);
		// 	if (index !== -1) {
		// 		virtualInv.items.splice(index, 1);
		// 	}
		// 	const viabilityMatrix = virtualInv.generateItemGrid();
		// 	for (let i = 0; i < item2.length; i++) {
		// 		for (let j = 0; j < item2.width; j++) {
		// 			if (viabilityMatrix[parentSloty + i][x + j] != null) {
		// 				return false;
		// 			}
		// 		}
		// 	}
		// 	return true;
		// }
	};

	const checkHovered = () => {
		if (currentMouseItem === null) {
			return hovered || item?.hovered;
		} else if (mouseHoveredSlot) {
			const dx = x - mouseHoveredSlot.x;
			const withinX = x >= mouseHoveredSlot.x && dx <= currentMouseItem.width - 1;

			const withinY =
				y <= mouseHoveredSlot.y + Math.floor(currentMouseItem.length / 2) &&
				y >= mouseHoveredSlot.y - Math.floor(currentMouseItem.length / 2);
			return withinX && withinY && mouseHoveredSlot.parentInventory == parentInventory;
		}
	};

	const HandleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.shiftKey && currentMouseItem === null && item != null && item.maxStack > 1 && item.count > 1) {
			SetUnstackWindowLocation({ x: e.clientX, y: e.clientY });
			SetUnstackWindow(true);
			SetUnstackWindowItem(item);
			SetUnstackWindowItemParent(parentInventory);
		} else {
			SwapWithMouse();
		}
	};

	const getImageStyle = () => {
		if (horti) {
			return {
				width: `${calcWidth()}px`,
				height: `${calcLength()}px`,
				scale: "1.5",
			};
		} else if (isPrimary) {
			return { width: `${calcWidth()}px`, height: `${calcLength()}px` };
		} else {
			return { width: "0px", height: "0px" };
		}
	};

	return (
		<div
			className={`${checkHovered() ? "bg-gray-300 bg-opacity-10" : null} ${isPrimary ? "z-20" : "z-10"} `}
			style={
				!horti
					? { width: `${cellSideLength}px`, height: `${cellSideLength}px` }
					: { width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }
			}
			onClick={HandleClick}
			onMouseEnter={() => {
				if (item) {
					item.hovered = true;
				}
				SetHovered(true);
				ReportPosition();
				ForceRender();
			}}
			onMouseLeave={() => {
				if (item) {
					item.hovered = false;
				}
				SetHovered(false);
				ForceRender();
			}}>
			{item ? (
				<div className="pointer-events-none m-0" style={getImageStyle()}>
					{isPrimary ? <img src={item.imgSrc} alt="grid" /> : null}
					{item.maxStack > 1 ? (
						<div
							className={`relative bottom-[105%] right-[30%] text-s stroke-black ${
								item.count == item.maxStack ? "text-blue-600" : "text-white"
							}`}>
							{item.count}
						</div>
					) : null}
				</div>
			) : null}
		</div>
	);
};

export default SlotCell;

export { cellSideLength };
