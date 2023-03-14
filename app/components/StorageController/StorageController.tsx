import { atom, useAtom } from "jotai";
import Inventory from "../Inventory/Inventory";
import MouseFollower from "../MouseFollower/MouseFollower";

const renderVar = atom(false);

export { renderVar };

const StorageController = () => {
	const [render] = useAtom(renderVar);

	return (
		<div className="w-full h-screen">
			<MouseFollower />
			<Inventory />
		</div>
	);
};

export default StorageController;
