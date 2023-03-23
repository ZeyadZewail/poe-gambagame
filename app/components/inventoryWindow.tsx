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
			<div className="inventorygrid">
				<Inventory />
			</div>
			<div className="currency">
				{mainInventory.currency} <img src={divineicon} alt="divine" title="divine" />
			</div>
			<div className="bottomframe"></div>
		</div>
	);
};
export default InventoryWindow;
