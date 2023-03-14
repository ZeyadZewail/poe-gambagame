import SlotCell from "~/components/SlotCell/SlotCell";
import type Item from "./Item";

class ItemInventory {
	items: Item[];
	length: number;
	width: number;

	constructor(length: number, width: number, items: Item[] = []) {
		this.length = length;
		this.width = width;
		this.items = items.map((item, index) => {
			return { ...item, index: index };
		});
	}

	generateItemGrid = () => {
		const temp: any = [];
		for (let step = 0; step < this.length; step++) {
			temp.push([]);
			for (let step = 0; step < this.width; step++) {
				temp.at(-1)?.push(null);
			}
		}

		for (let item of this.items) {
			for (let i = 0; i < item.length; i++) {
				for (let j = 0; j < item.width; j++) {
					if (i == 0 && j == 0) {
						temp[item.y + i][item.x + j] = { item: item, isPrimary: true };
					} else {
						temp[item.y + i][item.x + j] = { item: item, isPrimary: false };
					}
				}
			}
		}
		return temp;
	};

	generateElementGrid = () => {
		const temp = this.generateItemGrid();
		const rows: any[] = [];
		for (let i = 0; i < temp.length; i++) {
			rows.push([]);
			for (let j = 0; j < temp[i].length; j++) {
				if (temp[i][j] != null) {
					rows[i].push(
						<SlotCell
							key={`(${i},${j})`}
							item={temp[i][j].item}
							x={j}
							y={i}
							parentInventory={this.items}
							isPrimary={temp[i][j].isPrimary}
						/>
					);
				} else
					rows[i].push(
						<SlotCell key={`(${i},${j})`} item={null} x={j} y={i} parentInventory={this.items} isPrimary={true} />
					);
			}
		}

		return rows.map((r, index) => {
			return (
				<div className="flex flex-row" key={index}>
					{r}
				</div>
			);
		});
	};
}

export default ItemInventory;
