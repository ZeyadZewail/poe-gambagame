import type { FC } from "react";
import { useEffect } from "react";
import { useState } from "react";
import SlotCell from "../SlotCell/SlotCell";
import inventoryGrid from "../../assets/inventorygrid.png";
import type Item from "~/Types/Item";

interface InventoryInterface {
	count: number;
	rowMax: number;
	items: Item[];
}

const Inventory: FC<InventoryInterface> = ({ count, rowMax, items }) => {
	const [internalStorage, setInternalStorage] = useState<any>([]);
	const [render, setRender] = useState(true);

	useEffect(() => {
		const temp: any = [];
		for (let step = 0; step < rowMax; step++) {
			temp.push([]);
			for (let step = 0; step < rowMax; step++) {
				temp.at(-1)?.push(null);
			}
		}
		setInternalStorage(temp);
	}, [items]);

	console.log("Inventory", internalStorage);
	return (
		<div className="flex flex-col w-fit h-fit">
			<img src={inventoryGrid} alt="grid" className="absolute" />
			{generateGrid(internalStorage)}
			<button
				onClick={() => {
					console.log("Added Item");
					internalStorage[0][0] = items[0];
					internalStorage[0][1] = items[1];

					setRender(!render);
				}}>
				Add Item
			</button>
		</div>
	);
};

export default Inventory;

const generateGrid = (internalStorage: any[]) => {
	return internalStorage.map((i) => generateRow(i));
};

const generateRow = (row: Item[]) => {
	return (
		<div className="flex flex-row">
			{row.map((i) => {
				if (i == null) {
					return <SlotCell key={""} item={null} />;
				} else {
					return <SlotCell key={""} item={i} />;
				}
			})}
		</div>
	);
};
