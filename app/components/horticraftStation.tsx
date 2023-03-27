import { atom, useAtom } from "jotai";
import { useState } from "react";
import { renderVar } from "~/routes";
import ItemInventory from "~/Types/ItemInventory";
import playSound, { AudioFile } from "./audioPlayer";
import HortiCraft from "./hortiCraft";
import { inventoryVar } from "./Inventory/Inventory";

const hortiInventory = atom<ItemInventory>(() => {
	return new ItemInventory(1, 1, [], true, 0, 0);
});
export { hortiInventory };
const HorticraftStation: React.FC = () => {
	const [hortiInv] = useAtom<ItemInventory>(hortiInventory);
	const [selectedCraft, setSelectedCraft] = useState<number | null>(0);
	const [renderBool, SetForceRender] = useAtom(renderVar);
	const [warningTextVisible, setWarningTextVisible] = useState(false);
	const [warningText, setWarningText] = useState("");
	const [warningTextSize, setWarningTextSize] = useState("");
	const [warningTimeout, setWarningTimeout] = useState<number | undefined>();
	const [mainInventory] = useAtom<ItemInventory>(inventoryVar)
	const ForceRender = () => {
		SetForceRender(!renderBool);
	};
	const craftSelected = () => {
		if (selectedCraft !== null) {
			// execute the selected craft function with the inventory
			const selectedCraftFunction = crafts[selectedCraft].craftFunction;
			selectedCraftFunction(hortiInv, crafts[selectedCraft].cost, mainInventory.lifeforce);
			ForceRender();
		}
	};

	const crafts = [
		{
			craftFunction: (inventory: ItemInventory, cost: number, lifeforce: number) => gamble(inventory, cost, lifeforce),
			cost: 1500,
			text: (
				<div>
					<span className="normal">Sacrifice</span> up to half a stack of{" "}
					<span className="normal">Divination Cards</span> to receive between 0 and twice that amount of the same Card
				</div>
			),
		},
	];

	function gamble(inventory: ItemInventory, cost: number, lifeforce: number) {
		if (cost > lifeforce) {
			if (warningTimeout) {
				clearTimeout(warningTimeout);
			}
			setWarningTextSize("24px")
			setWarningText("You do not have sufficient currency to buy this mod.");
			setWarningTextVisible(true);
			ForceRender();
			const timeoutId = window.setTimeout(() => {
				setWarningTextVisible(false);
			}, 1500);
			setWarningTimeout(timeoutId);
			return;
		}
		try {
			let outcome: number = gambleLogic(inventory.items[0].count, inventory.items[0].maxStack);
			if (inventory.items[0].count < outcome) {
				playSound(inventory.items[0].dropSound);
			}
			inventory.setCount(0, outcome);
			if (outcome == 0) {
				inventory.removeItem(inventory.items[0]);
			}
			mainInventory.lifeforce = mainInventory.lifeforce - cost;
			playSound(AudioFile.harvestCraft)
			setWarningTextVisible(false);
		} catch {
			if (warningTimeout) {
				clearTimeout(warningTimeout);
			}
			setWarningTextSize("36px")
			setWarningText("Too many Items in stack");
			setWarningTextVisible(true);
			ForceRender();
			const timeoutId = window.setTimeout(() => {
				setWarningTextVisible(false);
			}, 1500);
			setWarningTimeout(timeoutId);
		}
	}
	return (
		<div className="hortistation">
			<div className={`hortiWarning ${warningTextVisible ? "visible" : ""}`} style={{ fontSize: warningTextSize }}>{warningText}</div>
			<div className="frame"></div>
			<div className="topbar">
				<div className="text">Horticrafting</div>
			</div>
			<div className="crafts">
				{crafts.map((craft, index) => (
					<HortiCraft
						key={index}
						cost={craft.cost}
						text={craft.text}
						isSelected={selectedCraft === index}
						onSelect={() => setSelectedCraft(index)}
						currentLifeForce={mainInventory.lifeforce}
					/>
				))}
			</div>
			<div className="itemSlot">{hortiInv.generateFirstItem()}</div>
			<div className="button">
				<button className="craftButton" onClick={craftSelected} onMouseDown={() => playSound(AudioFile.ButtonDown)} onMouseUp={() => { playSound(AudioFile.ButtonUp) }} disabled={hortiInv.items.length == 0}>
					Craft
				</button>
			</div>
			<div className="lifeforce">
				<div className="text">{lifeForceFormatter(mainInventory.lifeforce)}</div>
			</div>
		</div>
	);
};

export default HorticraftStation;
function lifeForceFormatter(lifeforce: number): string {

	return lifeforce >= 10000 ? lifeforce / 1000 + "k" : lifeforce + "";

}
function gambleLogic(currentValue: number, maxValue: number): number {
	if (currentValue > maxValue / 2) {
		throw new Error("Current value cannot be higher than half of max value");
	}
	const randomValue = Math.floor(Math.random() * (currentValue * 2 + 1));
	return Math.min(randomValue, maxValue);
}
