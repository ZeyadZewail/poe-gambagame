import StorageController from "./StorageController/StorageController";

export interface InventoryWindowProps {}
const InventoryWindow: React.FC<InventoryWindowProps> = ({}) => {
	return (
		<div className="inventoryWindow z-40">
			<div className="frame"></div>
			<div className="inventorygrid z-40">
				<StorageController />
			</div>
			<div className="bottomframe"></div>
		</div>
	);
};
export default InventoryWindow;
