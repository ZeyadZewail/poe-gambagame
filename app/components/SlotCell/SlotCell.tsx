import { useAtom, useSetAtom } from "jotai";
import { FC, useRef } from "react";
import { useState } from "react";
import { hoveredSlotVar, hoverItemVar, renderVar, unStackVar } from "~/routes";
import type Item from "~/Types/Item";
import type ItemInventory from "~/Types/ItemInventory";
import { hortiInventory } from "../horticraftStation";
import { inventoryVar } from "../Inventory/Inventory";
import { hoveredSlotLocation, mouseItem } from "../MouseFollower/MouseFollower";
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
	const [mouseHoveredSlotLocation, SetMouseHoveredSlotLocation] = useAtom(hoveredSlotLocation);
	const [mosueHoveredSlot, SetMouseHoveredSlot] = useAtom(hoveredSlotVar);
	const [hortiInv] = useAtom<ItemInventory>(hortiInventory);
	const [mainInventory] = useAtom<ItemInventory>(inventoryVar);
	const [hoverItem, SetHoverItem] = useAtom(hoverItemVar);
	const SetUnstackWindow = useSetAtom(unStackVar);
	const SetUnstackWindowItem = useSetAtom(unStackWindowItemVar);
	const SetUnstackWindowLocation = useSetAtom(UnStackWindowLocationVar);
	const SetUnstackWindowItemParent = useSetAtom(unStackWindowItemParentVar);

	const slotRef = useRef(null);

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
		SetMouseHoveredSlotLocation({ x: x, y: y, parentInventory: parentInventory });
	};

	const SwapWithMouse = () => {
		if (item === null && currentMouseItem === null) {
			return;
		}

		if (item != null && currentMouseItem === null) {
			SetCurrentMouseItem(item);
			parentInventory.removeItem(item);
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

	const CheckSpaceForItem = (x: number, y: number) => {
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

		if (item === null && item2 != null && CheckSpaceForItem(x, y)) {
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
		} else if (mouseHoveredSlotLocation) {
			const dx = x - mouseHoveredSlotLocation.x;
			const withinX = x >= mouseHoveredSlotLocation.x && dx <= currentMouseItem.width - 1;

			const withinY =
				y <= mouseHoveredSlotLocation.y + Math.floor(currentMouseItem.length / 2) &&
				y >= mouseHoveredSlotLocation.y - Math.floor(currentMouseItem.length / 2);
			return withinX && withinY && mouseHoveredSlotLocation.parentInventory == parentInventory;
		}
	};

	const findAvailableSpace = (
		inventory: ItemInventory,
		itemWidth: number,
		itemLength: number
	): { x: number; y: number } | null => {
		const takenSpaces: boolean[][] = Array.from({ length: inventory.length }, () =>
			new Array(inventory.width).fill(false)
		);

		for (const item of inventory.items) {
			for (let y = item.y; y < item.y + item.length; y++) {
				for (let x = item.x; x < item.x + item.width; x++) {
					takenSpaces[y][x] = true;
				}
			}
		}

		for (let x = 0; x <= inventory.width - itemWidth; x++) {
			for (let y = 0; y <= inventory.length - itemLength; y++) {
				if (!takenSpaces[y].slice(x, x + itemWidth).includes(true)) {
					let canPlace = true;
					for (let i = y + 1; i < y + itemLength; i++) {
						if (takenSpaces[i].slice(x, x + itemWidth).includes(true)) {
							canPlace = false;
							break;
						}
					}
					if (canPlace) {
						return { x, y };
					}
				}
			}
		}

		return null;
	};

	const HandleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.shiftKey && currentMouseItem === null && item != null && item.maxStack > 1 && item.count > 1) {
			SetUnstackWindowLocation({ x: e.clientX, y: e.clientY });
			SetUnstackWindow(true);
			SetUnstackWindowItem(item);
			SetUnstackWindowItemParent(parentInventory);
		} else if (
			e.shiftKey &&
			currentMouseItem != null &&
			(item === null || (item.name == currentMouseItem.name && item.count != item.maxStack))
		) {
			if (item != null) {
				const spaceToTake = item.maxStack - item.count;
				const possibleToGive = Math.min(spaceToTake, 1);
				const remainder = currentMouseItem.count - possibleToGive;
				item.count += possibleToGive;
				remainder == 0 ? SetCurrentMouseItem(null) : (currentMouseItem.count = remainder);
			} else {
				currentMouseItem.x = x;
				currentMouseItem.y = y - Math.floor(currentMouseItem.length / 2);
				parentInventory.items.push({ ...currentMouseItem, count: 1 });
				const remainder = currentMouseItem.count - 1;
				remainder == 0 ? SetCurrentMouseItem(null) : (currentMouseItem.count = remainder);
				ForceRender();
			}
		} else if (e.ctrlKey && currentMouseItem === null && item != null && !horti) {
			if (hortiInv.itemCount() == 0) {
				hortiInv.items.push(item);
				parentInventory.removeItem(item);
			} else if (hortiInv.items[0].name == item.name && hortiInv.items[0].count != hortiInv.items[0].maxStack) {
				const spaceToTake = hortiInv.items[0].maxStack - hortiInv.items[0].count;
				const possibleToGive = Math.min(spaceToTake, item.count);
				const remainder = item.count - possibleToGive;
				hortiInv.items[0].count += possibleToGive;
				remainder == 0 ? parentInventory.removeItem(item) : (item.count = remainder);
			}
			ForceRender();
		} else if (e.ctrlKey && currentMouseItem === null && item != null && horti) {
			hortiInv.removeItem(item);
			let breakEarly = false;
			if (item.maxStack > 1) {
				let sameItems = mainInventory.items.filter((filterItem) => filterItem.name == item.name);
				for (let i = 0; i < sameItems.length; i++) {
					const spaceToTake = sameItems[i].maxStack - sameItems[i].count;
					const possibleToGive = Math.min(spaceToTake, item.count);
					const remainder = item.count - possibleToGive;
					sameItems[i].count += possibleToGive;
					remainder == 0 ? (breakEarly = true) : (item.count = remainder);
					if (breakEarly) break;
				}
			}
			let availableSpace = findAvailableSpace(mainInventory, item.width, item.length);
			if (availableSpace != null && !breakEarly) {
				item.x = availableSpace.x;
				item.y = availableSpace.y;
				mainInventory.items.push(item);
			}
			ForceRender();
		} else {
			SetUnstackWindow(false);
			SwapWithMouse();
		}
		ForceRender();
	};

	const handleRightClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.preventDefault();
		alert("cum (right click menu)");
	};

	const handleHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (item) {
			item.hovered = true;
			SetHoverItem(item);
			if (slotRef != null) {
				SetMouseHoveredSlot(slotRef);
			}
		} else {
			SetHoverItem(null);
		}
		SetHovered(true);
		ReportPosition();
		ForceRender();
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
			ref={slotRef}
			className={`${checkHovered() ? "bg-gray-300 bg-opacity-10" : null} ${isPrimary ? "z-20" : "z-10"} `}
			style={
				!horti
					? { width: `${cellSideLength}px`, height: `${cellSideLength}px` }
					: { width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }
			}
			onClick={HandleClick}
			onContextMenu={handleRightClick}
			onMouseEnter={handleHover}
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
