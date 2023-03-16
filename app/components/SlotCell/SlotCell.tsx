import { useAtom } from "jotai";
import type { FC } from "react";
import { useState } from "react";
import type Item from "~/Types/Item";
import type ItemInventory from "~/Types/ItemInventory";
import { hoveredSlot, mouseItem } from "../MouseFollower/MouseFollower";
import { renderVar } from "../StorageController/StorageController";

const cellSideLength = 47.4;

interface SlotInterface {
  item: Item | null;
  parentInventory: ItemInventory;
  x: number;
  y: number;
  isPrimary: boolean;
}

const SlotCell: FC<SlotInterface> = ({
  item,
  x,
  y,
  parentInventory,
  isPrimary,
}) => {
  const [currentMouseItem, setCurrentMouseItem] = useAtom(mouseItem);
  const [renderBool, SetForceRender] = useAtom(renderVar);
  const [hovered, setHovered] = useState(false);
  const [mouseHoveredSlot, setMouseHoveredSlot] = useAtom(hoveredSlot);

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
    console.log(
      `You clicked slot @ (${x},${y}),Item: ${item?.name},Primary: ${isPrimary}`
    );
    setMouseHoveredSlot({ x: x, y: y, parentInventory: parentInventory });
  };

  const SwapWithMouse = () => {
    if (item === null && currentMouseItem === null) {
      return;
    }

    if (item != null && currentMouseItem === null) {
      setCurrentMouseItem(item);
      let index = parentInventory.items.indexOf(item);
      if (index !== -1) {
        parentInventory.items.splice(index, 1);
      }
    } else if (currentMouseItem != null && item === null) {
      // const parentSlotX = x + Math.floor(currentMouseItem.width / 2);
      if (CheckViableForItem(x, y, currentMouseItem)) {
        currentMouseItem.x = x;
        currentMouseItem.y = y - Math.floor(currentMouseItem.length / 2);
        parentInventory.items.push(currentMouseItem);
        setCurrentMouseItem(null);
      }
    } else if (currentMouseItem != null && item != null) {
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
      if (
        rightSpace >= currentMouseItem.width &&
        leftSpace >= currentMouseItem.length
      ) {
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
      const withinX =
        x >= mouseHoveredSlot.x && dx <= currentMouseItem.width - 1;

      const withinY =
        y <= mouseHoveredSlot.y + Math.floor(currentMouseItem.length / 2) &&
        y >= mouseHoveredSlot.y - Math.floor(currentMouseItem.length / 2);
      return (
        withinX &&
        withinY &&
        mouseHoveredSlot.parentInventory == parentInventory
      );
    }
  };

  return (
    <div
      className={`${checkHovered() ? "bg-gray-300 bg-opacity-10" : null} ${
        isPrimary ? "z-20" : "z-10"
      }`}
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
      }}
    >
      {item ? (
        <div
          className="pointer-events-none"
          style={
            isPrimary
              ? { width: `${calcWidth()}px`, height: `${calcLength()}px` }
              : { width: "0px", height: "0px" }
          }
        >
          {isPrimary ? <img src={item.imgSrc} alt="grid" /> : null}
        </div>
      ) : null}
    </div>
  );
};

export default SlotCell;

export { cellSideLength };
