import type { ReactElement } from "react";
import vividicon from "~/assets/vividlf.png";
import type ItemInventory from "~/Types/ItemInventory";

export interface HortiCraftProps {
	cost: number;
	text: ReactElement<any, any>;
	craftFunction: (inventory: ItemInventory) => void;
	onSelect: () => void;
	isSelected: boolean;
}

const HortiCraft: React.FC<HortiCraftProps> = ({ cost, text, craftFunction, onSelect, isSelected }) => {
	return (
		<div className={`craft ${isSelected ? "selected" : ""}`} onClick={onSelect}>
			<div className="text">{text}</div>
			<div className="cost">
				{cost}
				<img src={vividicon} alt="vivid-lifeforce" title="vivid-lifeforce" />
			</div>
		</div>
	);
};

export default HortiCraft;
