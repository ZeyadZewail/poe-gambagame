import { json, LinksFunction } from "@remix-run/node";
import TradeWindow from "~/components/tradeWindow";
import stylesUrl from "~/style/index.css";
import divCards from "~/data/divcards.json";
import { useLoaderData } from "@remix-run/react";
import HorticraftStation from "~/components/horticraftStation";
import InventoryWindow from "~/components/inventoryWindow";

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader = async () => {
	return json(divCards);
};

export default function Index() {
	const divcards = useLoaderData<typeof loader>();
	return (
		<div className="hideoutWindow">
			<HorticraftStation vividlf={0} />
			<InventoryWindow />
			{/*<TradeWindow currency={0} divcards={divcards} />*/}
		</div>
	);
}
