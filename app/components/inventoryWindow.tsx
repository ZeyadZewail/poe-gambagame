import Inventory, { inventoryVar } from "./Inventory/Inventory";
import divineicon from "~/assets/divineorb.png";
import ItemInventory from "~/Types/ItemInventory";
import { useAtom } from "jotai";

const InventoryWindow = () => {
	const [mainInventory] = useAtom<ItemInventory>(inventoryVar)
	return (
		<div className="inventoryWindow">
			<div className="frame"></div>
			<div className="text">
				Inventory
			</div>
			<div>
				<Inventory />
			</div>
			<div className="currency">

				{mainInventory.currency % 1 === 0
					? mainInventory.currency.toFixed(0)
					: mainInventory.currency.toFixed(1)} <img src={divineicon} alt="divine" title="divine" />
			</div>
			<div className="bottomframe"></div>
		</div>
	);
};
export default InventoryWindow;
