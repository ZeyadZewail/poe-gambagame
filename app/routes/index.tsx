import { json, LinksFunction } from "@remix-run/node";
import stylesUrl from "~/style/index.css";
import divCards from "~/data/divcards.json";
import { useLoaderData } from "@remix-run/react";
import HorticraftStation from "~/components/horticraftStation";
import InventoryWindow from "~/components/inventoryWindow";
import StorageController, { unStackVar } from "~/components/StorageController/StorageController";
import MouseFollower from "~/components/MouseFollower/MouseFollower";
import { atom, useAtom } from "jotai";
import UnstackWindow from "~/components/UnstackWindow/UnstackWindow";

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader = async () => {
	return json(divCards);
};

const renderVar = atom(false);
export { renderVar };

export default function Index() {
	const divcards = useLoaderData<typeof loader>();
	const [spawnUnstack, SetSpawnUnstack] = useAtom(unStackVar);
	const [render] = useAtom(renderVar);

	return (
		<div>
			<div className="hideoutWindow">
				<MouseFollower />
				{spawnUnstack ? <UnstackWindow /> : null}
				<HorticraftStation vividlf={0} />
				<InventoryWindow />
				{/*<TradeWindow currency={0} divcards={divcards} />*/}
			</div>
			<div className="manabar"></div>
		</div>
	);
}
