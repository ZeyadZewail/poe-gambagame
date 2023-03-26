import inventoryGrid from "../../assets/inventorygrid.png";
import type Item from "~/Types/Item";
import divCardImage from "../../assets/item_divcard.png";
import mageBloodImage from "../../assets/item_mageblood.png";
import farrulsFurImage from "../../assets/item_farrulfur.png";
import ItemInventory from "~/Types/ItemInventory";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { hoveredSlotLocationVar } from "../MouseFollower/MouseFollower";
import { hoverItemVar } from "~/routes";
import { AudioFile } from "../audioPlayer";

const TheDoctor: Item = {
	imgSrc: divCardImage,
	name: "The Doctor",
	width: 1,
	length: 1,
	x: 0,
	y: 0,
	hovered: false,
	maxStack: 8,
	count: 5,
	type: "divcard",
	price: 8,
	pickUpSound: AudioFile.itemPickUp,
	dropSound: AudioFile.itemDDiv
};

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
	price: 210,
	pickUpSound: AudioFile.itemPickUp,
	dropSound: AudioFile.itemDDiv
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
	price: 10,
	pickUpSound: AudioFile.itemPickUp,
	dropSound: AudioFile.itemDDiv
};

const inventoryVar = atom<ItemInventory>(() => {
	return new ItemInventory(12, 12, [TheDoctor, { ...TheDoctor, x: 1 }, mageblood, farrulsfur], false, 10, 15000);
});

export { inventoryVar };

const Inventory = () => {
	const mainInventory = useAtomValue(inventoryVar);
	const SetMouseHoveredSlot = useSetAtom(hoveredSlotLocationVar);
	const SetMouseHoveredItem = useSetAtom(hoverItemVar);
	const rows = mainInventory.generateElementGrid();

	return (
		<div
			className="flex flex-col w-fit h-fit z-40  fixed top-[13%] left-[4.5%]"
			onMouseLeave={() => {
				SetMouseHoveredSlot(null);
				SetMouseHoveredItem(null);
			}}>
			<img src={inventoryGrid} alt="grid" className="absolute" />
			{rows}
		</div>
	);
};

export default Inventory;
