import SlotCell from "../SlotCell/SlotCell";
import inventoryGrid from "../../assets/inventorygrid.png";
import type Item from "~/Types/Item";
import divCardImage from "../../assets/item_divcard.png";
import mageBloodImage from "../../assets/item_mageblood.png";

import { useEffect, useState } from "react";
import ItemInventory from "~/Types/ItemInventory";
import { useAtom } from "jotai";
import { renderVar } from "../StorageController/StorageController";

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

const Inventory = () => {
	const [classTest] = useState<ItemInventory>(new ItemInventory(12, 12, [TestItem, mageblood]));
	const [forceRender, SetForceRender] = useAtom(renderVar);

	useEffect(() => {
		console.log(classTest);
	}, [classTest, forceRender]);

	const rows = classTest.generateElementGrid();

	return (
		<div className="flex flex-col w-fit h-fit">
			<img src={inventoryGrid} alt="grid" className="absolute" />
			{rows}

			<button
				onClick={() => {
					classTest.items[1].x = classTest.items[1].x + 1;
					SetForceRender(!forceRender);
				}}>
				+X
			</button>
			<button
				className="z-20"
				onClick={() => {
					console.log("Refreshed");
					SetForceRender(!forceRender);
				}}>
				refresh
			</button>
		</div>
	);
};

export default Inventory;
