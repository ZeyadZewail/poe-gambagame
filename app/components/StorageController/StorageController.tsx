import Inventory from "../Inventory/Inventory";

import divCardImage from "../../assets/item_divcard.png";
import mageBloodImage from "../../assets/item_mageblood.png";

import type Item from "~/Types/Item";

const rowMax = 12;

const TestItem: Item = {
	imgSrc: divCardImage,
	name: "Test Div Card",
	width: 1,
	length: 1,
	x: 0,
	y: 0,
};

const mageblood: Item = {
	imgSrc: mageBloodImage,
	name: "mageblood",
	width: 2,
	length: 1,
	x: 1,
	y: 0,
};

const StorageController = () => {
	return (
		<div>
			<Inventory rowMax={rowMax} items={[TestItem, mageblood]} />
		</div>
	);
};

export default StorageController;
