import Inventory from "../Inventory/Inventory";

import divCardImage from "../../assets/item_divcard.png";
import mageBloodImage from "../../assets/item_mageblood.png";

import type Item from "~/Types/Item";
import { useEffect, useState } from "react";

const TestItem: Item = {
	imgSrc: divCardImage,
	name: "Test Div Card",
	width: 1,
	length: 1,
};

const mageblood: Item = {
	imgSrc: mageBloodImage,
	name: "mageblood",
	width: 2,
	length: 1,
};

const StorageController = () => {
	const [items, setItems] = useState<Item[]>([]);

	useEffect(() => {
		setItems([TestItem, mageblood]);
	}, []);

	return (
		<div>
			<Inventory count={12 * 12} rowMax={12} items={items} />
		</div>
	);
};

export default StorageController;
