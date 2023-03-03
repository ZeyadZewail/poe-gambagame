import type { FC } from "react";
import SlotCell from "../SlotCell/SlotCell";

interface InventoryInterface {
	count: number;
	rowMax: number;
}

const Inventory: FC<InventoryInterface> = ({ count, rowMax }) => {
	console.log(count);
	return <div className="flex-col">{generateGrid(count, rowMax)}</div>;
};

export default Inventory;

const generateGrid = (count: number, rowMax: number) => {
	const rows: any = [];
	const remainder = count % rowMax;
	const fullRowCount = (count - remainder) / rowMax;

	for (let step = 0; step < fullRowCount; step++) {
		// Runs 5 times, with values of step 0 through 4.
		rows.push(generateRow(rowMax));
	}
	rows.push(generateRow(remainder));

	return <div className="flex flex-col">{rows}</div>;
};

const generateRow = (count: number) => {
	const rows: any[] = [];

	for (let step = 0; step < count; step++) {
		// Runs 5 times, with values of step 0 through 4.
		rows.push(<SlotCell key={step} />);
	}

	return <div className="flex flex-row">{rows}</div>;
};
