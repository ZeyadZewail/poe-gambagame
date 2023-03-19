import StorageController from "./StorageController/StorageController";

const InventoryWindow = () => {
	return (
		<div className="inventoryWindow">
			<div className="frame"></div>
			<div className="inventorygrid">
				<StorageController />
			</div>
			<div className="bottomframe"></div>
		</div>
	);
};
export default InventoryWindow;
