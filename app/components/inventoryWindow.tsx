import Inventory from "./Inventory/Inventory";

const InventoryWindow = () => {
	return (
		<div className="inventoryWindow">
			<div className="frame"></div>
			<div className="inventorygrid">
				<Inventory />
			</div>
			<div className="bottomframe"></div>
		</div>
	);
};
export default InventoryWindow;
