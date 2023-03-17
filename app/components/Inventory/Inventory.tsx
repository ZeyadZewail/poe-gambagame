import inventoryGrid from "../../assets/inventorygrid.png";
import type Item from "~/Types/Item";

import type { FC } from "react";
import { useState } from "react";
import ItemInventory from "~/Types/ItemInventory";

interface InventoryInterface {
  StarterItems: Item[];
}

const Inventory: FC<InventoryInterface> = ({ StarterItems }) => {
  const [mainInventory] = useState<ItemInventory>(
    new ItemInventory(12, 12, StarterItems)
  );

  const rows = mainInventory.generateElementGrid();

  return (
    <div className="flex flex-col w-fit h-fit">
      <img src={inventoryGrid} alt="grid" className="absolute" />
      {rows}
    </div>
  );
};

export default Inventory;
