import { useAtom } from "jotai";
import { useState } from "react";
import { renderVar } from "~/routes";
import ItemInventory from "~/Types/ItemInventory";
import HortiCraft from "./hortiCraft";

export interface HorticraftStationProps {
	vividlf: number;
}

const HorticraftStation: React.FC<HorticraftStationProps> = ({ vividlf }) => {
	const [hortiInv] = useState<ItemInventory>(new ItemInventory(1, 1, [], true));
	const [selectedCraft, setSelectedCraft] = useState<number | null>(0);
	const [renderBool, SetForceRender] = useAtom(renderVar);
	const ForceRender = () => {
		SetForceRender(!renderBool);
	};
	const craftSelected = () => {
		if (selectedCraft !== null) {
			// execute the selected craft function with the inventory
			const selectedCraftFunction = crafts[selectedCraft].craftFunction;
			selectedCraftFunction(hortiInv);
			ForceRender();
		}
	};

	const crafts = [
		{
			craftFunction: (inventory: ItemInventory) => gamble(inventory),
			cost: 1500,
			text: (
				<div>
					<span className="normal">Sacrifice</span> up to half a stack of <span className="normal">Divination Cards</span> to receive between 0 and twice that amount of the same Card
				</div>
			),
		}
	];

	return (
		<div className="hortistation">
			<div className="frame"></div>
			<div className="topbar">
				<div className="text">Horticrafting</div>
			</div>
			<div className="crafts">
				{crafts.map((craft, index) => (
					<HortiCraft
						key={index}
						craftFunction={craft.craftFunction}
						cost={craft.cost}
						text={craft.text}
						isSelected={selectedCraft === index}
						onSelect={() => setSelectedCraft(index)}
					/>
				))}
			</div>
			<div className="itemSlot">{hortiInv.generateFirstItem()}</div>
			<div className="button">
				<button className="craftButton" onClick={craftSelected}>
					Craft
				</button>
			</div>
			<div className="lifeforce">
				<div className="text">{vividlf}</div>
			</div>
		</div>
	);
};

export default HorticraftStation;

function gamble(inventory: ItemInventory) {
	let outcome: number = gambleLogic(inventory.items[0].count, inventory.items[0].maxStack)
	inventory.setCount(0, outcome)
	if(outcome == 0)
	{
		inventory.items.splice(0, inventory.items.length);
	}

}
function gambleLogic(currentValue: number, maxValue: number): number {
	if (currentValue > maxValue / 2) {
		throw new Error('Current value cannot be higher than half of max value');
	}

	const randomValue = Math.floor(Math.random() * (currentValue * 2 + 1));
	return Math.min(randomValue, maxValue);
}
