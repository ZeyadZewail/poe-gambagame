import { Region } from "./Region";

interface Trader {
    accountName: string;
    characterName: String;
    type: TraderType;
    region: Region;
}
export enum TraderType {
    Honest ="honest",
    Scammer ="scammer",
    PriceFixer = "pricefixer",
    OilPrince = "oilprince"
}
export default Trader;