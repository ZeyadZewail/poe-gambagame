import { LinksFunction } from "@remix-run/node";
import { useAtom } from "jotai";
import ContextMenu from "~/components/contextMenu";
import Inventory from "~/components/Inventory/Inventory";
import MouseFollower from "~/components/MouseFollower/MouseFollower";
import UnstackWindow from "~/components/UnstackWindow/UnstackWindow";
import stylesUrl from "~/style/index.css";
import { unStackVar } from ".";
export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: stylesUrl }];
};
export default function Sandbox() {
	const [spawnUnstack, SetSpawnUnstack] = useAtom(unStackVar);

	return (
		<div>
			<ContextMenu></ContextMenu>
		</div>
	);
}
