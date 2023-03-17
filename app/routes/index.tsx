import { json, LinksFunction } from "@remix-run/node";
import TradeWindow from "~/components/tradeWindow";
import stylesUrl from "~/style/index.css";
import divCards from '~/data/divcards.json';
import { useLoaderData } from "@remix-run/react";
import HorticraftStation from "~/components/horticraftStation";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader = async () => {
  return json(divCards);
}

export default function Index() {
  const divcards = useLoaderData<typeof loader>();
  return (
    <div>
      <HorticraftStation vividlf={0} />
      {/*<TradeWindow currency={0} divcards={divcards} />*/}
    </div>
  );
}
