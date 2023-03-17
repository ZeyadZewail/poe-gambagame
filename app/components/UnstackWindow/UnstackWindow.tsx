import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import type Item from "~/Types/Item";
import Slider from "./Slider";
import unstackBG from "../../assets/sliderwindow.png";
import buttonBG from "../../assets/unstackbutton_normal.png";
import { mouseItem } from "../MouseFollower/MouseFollower";
import type ItemInventory from "~/Types/ItemInventory";
import { unStackVar } from "../StorageController/StorageController";

const unStackWindowItemVar = atom<Item | null>(null);
const unStackWindowItemParentVar = atom<ItemInventory | null>(null);
const UnStackWindowLocationVar = atom({ x: 0, y: 0 });
export { unStackWindowItemVar, UnStackWindowLocationVar, unStackWindowItemParentVar };

const UnstackWindow = () => {
	const [item] = useAtom(unStackWindowItemVar);
	const [parentInventory] = useAtom(unStackWindowItemParentVar);
	const [location] = useAtom(UnStackWindowLocationVar);
	const [value, SetValue] = useState<number>(0);
	const [currentMouseItem, SetCurrentMouseItem] = useAtom(mouseItem);
	const [spawnUnstack, SetSpawnUnstack] = useAtom(unStackVar);

	useEffect(() => {
		SetValue(0);
	}, [item]);

	const HandleOk = () => {
		if (item != null) {
			SetCurrentMouseItem({ ...item, count: value });
			if (item.count - value === 0) {
				if (parentInventory != null) {
					let index = parentInventory.items.indexOf(item);
					if (index !== -1) {
						parentInventory.items.splice(index, 1);
					}
				}
			} else {
				item.count -= value;
			}
			SetSpawnUnstack(false);
		}
	};

	return (
		<div
			className="fixed text-white z-40 bg-no-repeat flex flex-col bg-contain p-1"
			style={{
				transform: `translate(${location.x}px,${location.y}px)`,
				backgroundImage: `url(${unstackBG})`,
			}}
			onClick={(e) => {
				e.stopPropagation();
			}}
			onWheel={(e) => {
				if (e.deltaY < 0) {
					console.log("Up");
					if (item) {
						SetValue(Math.min(item.count, value + 1));
					}
				} else {
					console.log("Down");
					if (item) {
						SetValue(Math.max(0, value - 1));
					}
				}
			}}>
			{item != null ? (
				<div className="p-4">
					<Slider min={0} max={item.count} value={value} />
				</div>
			) : null}
			<button className="m-0 w-fit relative top-[0%] scale-75 self-end" onClick={HandleOk}>
				<img src={buttonBG} alt="unstack Button" />
			</button>
		</div>
	);
};

export default UnstackWindow;
