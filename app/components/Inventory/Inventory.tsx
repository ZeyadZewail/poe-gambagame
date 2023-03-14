import inventoryGrid from "../../assets/inventorygrid.png";
import type Item from "~/Types/Item";
import divCardImage from "../../assets/item_divcard.png";
import mageBloodImage from "../../assets/item_mageblood.png";
import farrulsFurImage from "../../assets/item_farrulfur.png";
import { useState } from "react";
import ItemInventory from "~/Types/ItemInventory";

const TestItem: Item = {
	imgSrc: divCardImage,
	name: "Test Div Card",
	width: 1,
	length: 1,
	x: 0,
	y: 0,
	hovered: false,
};

const mageblood: Item = {
	imgSrc: mageBloodImage,
	name: "mageblood",
	width: 2,
	length: 1,
	x: 1,
	y: 0,
	hovered: false,
};

const farrulsfur: Item = {
	imgSrc: farrulsFurImage,
	name: "farrulsfur",
	width: 2,
	length: 3,
	x: 3,
	y: 0,
	hovered: false,
};

const Inventory = () => {
	const [mainInventory] = useState<ItemInventory>(new ItemInventory(12, 12, [TestItem, mageblood, farrulsfur]));

	const rows = mainInventory.generateElementGrid();

	return (
		<div className="flex flex-col w-fit h-fit">
			<img src={inventoryGrid} alt="grid" className="absolute" />
			{rows}
		</div>
	);
};

export default Inventory;
