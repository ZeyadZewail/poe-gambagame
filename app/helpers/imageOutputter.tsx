import divCardImage from "~/assets/item_divcard.png";
import bottledFaithImage from "~/assets/item_bottledfaith.png";
import headhunterImage from "~/assets/item_headhunter.png";
import mageBloodImage from "~/assets/item_mageblood.png";
import mirrorImage from "~/assets/item_mirror.png";
import mirrorShardImage from "~/assets/item_mirrorshard.png";
import soulTakerImage from "~/assets/item_soultaker.png";
import squireImage from "~/assets/item_squire.png";
import stranglegaspImage from "~/assets/item_stranglegasp.png";
import unnaturalInstinctImage from "~/assets/item_unnaturalinstinct.png";
import divineorbImage from "~/assets/divineorb.png"


export default function imageOuputter(imageSrc: string): string {
    switch (imageSrc) {
        case "item_mageblood.png":
            return mageBloodImage;
        case "item_divcard.png":
            return divCardImage;
        case "item_bottledfaith.png":
            return bottledFaithImage;
        case "item_headhunter.png":
            return headhunterImage;
        case "item_mirror.png":
            return mirrorImage;
        case "item_mirrorshard.png":
            return mirrorShardImage;
        case "item_soultaker.png":
            return soulTakerImage;
        case "item_squire.png":
            return squireImage;
        case "item_stranglegasp.png":
            return stranglegaspImage;
        case "item_unnaturalinstinct.png":
            return unnaturalInstinctImage;
        case "divineorb.png":
            return divineorbImage;
        default:
            return divCardImage;
    }
}