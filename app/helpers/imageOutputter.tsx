import divCardImage from "~/assets/item_divcard.png";
import mageBloodImage from "~/assets/item_mageblood.png";
export default function imageOuputter(imageSrc: string) : string {
    switch (imageSrc) {
        case "item_mageblood.png":
            return mageBloodImage;
        case "item_divcard.png":
            return divCardImage;
        default:
            return divCardImage;
    }
}