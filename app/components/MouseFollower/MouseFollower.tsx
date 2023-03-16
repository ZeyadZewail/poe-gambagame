import { atom } from "jotai";
import { useAtom } from "jotai/react";
import { useEffect } from "react";
import type Item from "~/Types/Item";
import type ItemInventory from "~/Types/ItemInventory";
import { cellSideLength } from "../SlotCell/SlotCell";
import useMousePosition from "./UseMousePosition";

interface slotLocation {
  parentInventory: ItemInventory;
  x: number;
  y: number;
}

const mouseItem = atom<Item | null>(null);
const hoveredSlot = atom<slotLocation | null>(null);
export { mouseItem, hoveredSlot };

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
      className="z-30 pointer-events-none"
      style={{
        width: `${calcWidth()}px`,
        height: `${calcLength()}px`,
        position: "fixed",
        transform: `translate(${mousePosition.x - 0.5 * calcWidth()}px,${
          mousePosition.y - 0.5 * calcLength()
        }px)`,
      }}
    >
      {currentItem != null ? (
        <img src={currentItem.imgSrc} className="z-30" alt="grid" />
      ) : null}
    </div>
  );
};

export default MouseFollower;
