import inventoryGrid from "../../assets/inventorygrid.png";
import type Item from "~/Types/Item";
import divCardImage from "../../assets/item_divcard.png";
import mageBloodImage from "../../assets/item_mageblood.png";
import farrulsFurImage from "../../assets/item_farrulfur.png";
import ItemInventory from "~/Types/ItemInventory";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { hoveredSlot } from "../MouseFollower/MouseFollower";

const testItem: Item = ;

const mageblood: Item = {
	imgSrc: mageBloodImage,
	name: "mageblood",
	width: 2,
	length: 1,
	x: 1,
	y: 2,
	hovered: false,
	maxStack: 1,
	count: 1,
	type: "item",
};

const farrulsfur: Item = {
	imgSrc: farrulsFurImage,
	name: "farrulsfur",
	width: 2,
	length: 3,
	x: 3,
	y: 2,
	hovered: false,
	maxStack: 1,
	count: 1,
	type: "item",
};

const inventoryVar = atom<ItemInventory>(() => {
	return new ItemInventory(12, 12, [testItem, { ...testItem, x: 1 }, mageblood, farrulsfur], false);
});

export { inventoryVar };

const Inventory = () => {
	const mainInventory = useAtomValue(inventoryVar);
	const SetMouseHoveredSlot = useSetAtom(hoveredSlot);

	const rows = mainInventory.generateElementGrid();

	return (
		<div
			className="flex flex-col w-fit h-fit z-40  fixed top-[13%] left-[4.5%]"
			onMouseLeave={() => {
				SetMouseHoveredSlot(null);
			}}>
			<img src={inventoryGrid} alt="grid" className="absolute" />
			{rows}
		</div>
	);
};

export default Inventory;
