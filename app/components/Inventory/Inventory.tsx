import inventoryGrid from "../../assets/inventorygrid.png";
import type Item from "~/Types/Item";

import type { FC } from "react";
import { useState } from "react";
import ItemInventory from "~/Types/ItemInventory";
import { useAtom } from "jotai";
import { hoveredSlot } from "../MouseFollower/MouseFollower";

interface InventoryInterface {
	StarterItems: Item[];
}

const Inventory: FC<InventoryInterface> = ({ StarterItems }) => {
	const [mainInventory] = useState<ItemInventory>(new ItemInventory(12, 12, StarterItems));
	const [mouseHoveredSlot, SetMouseHoveredSlot] = useAtom(hoveredSlot);

	const rows = mainInventory.generateElementGrid();

	return (
		<div
			className="flex flex-col w-fit h-fit z-30"
			onMouseLeave={() => {
				SetMouseHoveredSlot(null);
			}}>
			<img src={inventoryGrid} alt="grid" className="absolute" />
			{rows}
		</div>
	);
};

export default Inventory;
