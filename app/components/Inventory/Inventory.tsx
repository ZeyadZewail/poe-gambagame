import inventoryGrid from "../../assets/inventorygrid.png";
import type Item from "~/Types/Item";
import divCardImage from "../../assets/item_divcard.png";
import mageBloodImage from "../../assets/item_mageblood.png";
import farrulsFurImage from "../../assets/item_farrulfur.png";
import bottledFaithImage from "../../assets/item_bottledfaith.png";
import ItemInventory from "~/Types/ItemInventory";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { hoveredSlotLocationVar } from "../MouseFollower/MouseFollower";
import { hoverItemVar } from "~/routes";
import { AudioFile } from "../audioPlayer";

const TheApothecary: Item = {
	imgSrc: divCardImage,
	name: "The Apothecary",
	width: 1,
	length: 1,
	x: 0,
	y: 0,
	hovered: false,
	maxStack: 5,
	count: 2,
	type: "divcard",
	price: 41.5,
	pickUpSound: AudioFile.itemPickUp,
	dropSound: AudioFile.itemDDiv,
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
	dropSound: AudioFile.itemDDiv,
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
	dropSound: AudioFile.itemDDiv,
};

const bottledfaith: Item = {
	name: "bottledfaith",
	imgSrc: bottledFaithImage,
	type: "item",
	width: 1,
	length: 2,
	x: 1,
	y: 4,
	maxStack: 1,
	count: 1,
	price: 0,
	pickUpSound: AudioFile.itemPickUp,
	dropSound: AudioFile.itemDDiv,
};

const inventoryVar = atom<ItemInventory>(() => {
	return new ItemInventory(
		12,
		12,
		[TheApothecary, { ...TheApothecary, x: 1 }, mageblood, farrulsfur, bottledfaith],
		false,
		100000,
		15000
	);
});

export { inventoryVar };

const Inventory = () => {
	const mainInventory = useAtomValue(inventoryVar);
	const SetMouseHoveredSlot = useSetAtom(hoveredSlotLocationVar);
	const SetMouseHoveredItem = useSetAtom(hoverItemVar);
	const rows = mainInventory.generateElementGrid();

	return (
		<div
			className="inventoryGrid"
			onMouseLeave={() => {
				SetMouseHoveredSlot(null);
				SetMouseHoveredItem(null);
			}}>
			{rows}
		</div>
	);
};

export default Inventory;
