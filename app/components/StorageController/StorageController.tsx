import { atom } from "jotai";
import Inventory from "../Inventory/Inventory";
import divCardImage from "../../assets/item_divcard.png";
import mageBloodImage from "../../assets/item_mageblood.png";
import farrulsFurImage from "../../assets/item_farrulfur.png";
import type Item from "~/Types/Item";

const unStackVar = atom(false);

export { unStackVar };

const testItem: Item = {
	imgSrc: divCardImage,
	name: "Test Div Card",
	width: 1,
	length: 1,
	x: 0,
	y: 0,
	hovered: false,
	maxStack: 8,
	count: 5,
	type: "divcard",
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

const StorageController = () => {
	return (
		<div className="flex gap-8 z-40  fixed top-[13%] left-[4.5%]">
			<Inventory StarterItems={[testItem, { ...testItem, x: 1 }, mageblood, farrulsfur]} />
		</div>
	);
};

export default StorageController;
