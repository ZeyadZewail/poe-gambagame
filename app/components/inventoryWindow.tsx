import Inventory from "./Inventory/Inventory";
import divineicon from "~/assets/divineorb.png";

const InventoryWindow = () => {
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
				0 <img src={divineicon} alt="divine" title="divine" />
			</div>
			<div className="bottomframe"></div>
		</div>
	);
};
export default InventoryWindow;
