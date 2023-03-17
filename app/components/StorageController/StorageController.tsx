import { atom, useAtom } from "jotai";
import Inventory from "../Inventory/Inventory";
import MouseFollower from "../MouseFollower/MouseFollower";
import divCardImage from "../../assets/item_divcard.png";
import mageBloodImage from "../../assets/item_mageblood.png";
import farrulsFurImage from "../../assets/item_farrulfur.png";
import type Item from "~/Types/Item";
const renderVar = atom(false);

export { renderVar };

const testItem: Item = {
  imgSrc: divCardImage,
  name: "Test Div Card",
  width: 1,
  length: 1,
  x: 0,
  y: 0,
  hovered: false,
  maxStack: 8,
  count: 5,
};

const mageblood: Item = {
  imgSrc: mageBloodImage,
  name: "mageblood",
  width: 2,
  length: 1,
  x: 1,
  y: 2,
  hovered: false,
  maxStack: 1,
  count: 1,
};

const farrulsfur: Item = {
  imgSrc: farrulsFurImage,
  name: "farrulsfur",
  width: 2,
  length: 3,
  x: 3,
  y: 2,
  hovered: false,
  maxStack: 1,
  count: 1,
};

const StorageController = () => {
  const [render] = useAtom(renderVar);

  return (
    <div className="w-full h-screen flex gap-8">
      <MouseFollower />
      <Inventory
        StarterItems={[testItem, { ...testItem, x: 1 }, mageblood, farrulsfur]}
      />
      <Inventory StarterItems={[]} />
    </div>
  );
};

export default StorageController;
