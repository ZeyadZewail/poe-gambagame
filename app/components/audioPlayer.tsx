import divDrop from "~/assets/audio/item_drop_divcard.wav"
import itemPickup from "~/assets/audio/item_pickup.wav"
export enum AudioFile {
    itemDDiv, itemPickUp
}

export default function playSound(audio: AudioFile, volume:number) {
    let audioFileToPlay = new Audio('');
    switch (audio) {
        case AudioFile.itemDDiv:
            audioFileToPlay = new Audio(divDrop);
            break;
        case AudioFile.itemPickUp:
            audioFileToPlay = new Audio(itemPickup)
        default:
            break;
    }
    audioFileToPlay.volume=volume;
    audioFileToPlay.play();
}
