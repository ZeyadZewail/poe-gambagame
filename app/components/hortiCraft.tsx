import type { ReactElement } from "react";
import vividicon from "~/assets/vividlf.png";
import type ItemInventory from "~/Types/ItemInventory";

export interface HortiCraftProps {
	cost: number;
	text: ReactElement<any, any>;
	onSelect: () => void;
	isSelected: boolean;
	currentLifeForce: number;
}

const HortiCraft: React.FC<HortiCraftProps> = ({ cost, text, onSelect, isSelected,  currentLifeForce}) => {
	return (
		<div className={`craft ${isSelected ? "selected" : ""}`} onClick={onSelect}>
			<div className="text">{text}</div>
			<div className={`cost ${cost > currentLifeForce ? "red":""}` }>
				{cost}
				<img src={vividicon} alt="vivid-lifeforce" title="vivid-lifeforce" />
			</div>
		</div>
	);
};

export default HortiCraft;
