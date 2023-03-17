export interface InventoryWindowProps {
}
const InventoryWindow: React.FC<InventoryWindowProps> = ({ }) => {
    return (
        <div className="inventoryWindow">
            <div className="frame"></div>
            <div className="inventorygrid"></div>
            <div className="bottomframe"></div>
        </div>)
}
export default InventoryWindow;