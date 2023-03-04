import { FC, useEffect } from "react";
import SlotCell from "../SlotCell/SlotCell";
import inventoryGrid from "../../assets/inventorygrid.png";
import type Item from "~/Types/Item";

interface InventoryInterface {
	rowMax: number;
	items: Item[];
}

const Inventory: FC<InventoryInterface> = ({ rowMax, items }) => {
	console.log("Inventory", items);

	const generateGrid = () => {
		const temp: any = [];
		for (let step = 0; step < rowMax; step++) {
			temp.push([]);
			for (let step = 0; step < rowMax; step++) {
				temp.at(-1)?.push(null);
			}
		}

		for (let item of items) {
			temp[item.y][item.x] = item;

			for (let step = 1; step < item.length; step++) {
				temp[item.y + step][item.x] = "blocked";
			}
			for (let step = 1; step < item.width; step++) {
				temp[item.y][item.x + step] = "blocked";
			}
		}

		const rows: any[] = [];
		for (let i = 0; i < temp.length; i++) {
			rows.push([]);
			for (let j = 0; j < temp[i].length; j++) {
				if (temp[i][j] != null) {
					if (temp[i][j] == "blocked") {
						rows[i].push(null);
					} else {
						rows[i].push(<SlotCell key={""} item={temp[i][j]} />);
					}
				} else rows[i].push(<SlotCell key={""} item={null} />);
			}
		}

		return rows.map((r) => {
			return (
				<div className="flex flex-row" key="">
					{...r}
				</div>
			);
		});
	};

	return (
		<div className="flex flex-col w-fit h-fit">
			<img src={inventoryGrid} alt="grid" className="absolute" />
			{generateGrid()}
		</div>
	);
};

export default Inventory;
