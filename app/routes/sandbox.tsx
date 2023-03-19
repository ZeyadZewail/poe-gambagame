import { useAtom } from "jotai";
import Inventory from "~/components/Inventory/Inventory";
import MouseFollower from "~/components/MouseFollower/MouseFollower";
import UnstackWindow from "~/components/UnstackWindow/UnstackWindow";
import { unStackVar } from ".";

export default function Sandbox() {
	const [spawnUnstack, SetSpawnUnstack] = useAtom(unStackVar);

	return (
		<div
			className="select-none"
			onClick={() => {
				if (spawnUnstack) {
					SetSpawnUnstack(false);
				}
			}}>
			{spawnUnstack ? <UnstackWindow /> : null}
			<MouseFollower />
			<Inventory />
		</div>
	);
}
