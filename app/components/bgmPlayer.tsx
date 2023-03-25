import bgm1 from "~/assets/audio/HarvestBoss.wav"
import bgm2 from "~/assets/audio/HarvestCombat.wav"
import bgm3 from "~/assets/audio/HarvestGarden.wav"
import { FC, useEffect, useRef, useState } from "react"
import { atom, useAtomValue } from "jotai";
const bgmVar = atom(true);
export { bgmVar }
const BGMPlayer = ({ children }) => {
    const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
    const audioFiles = [bgm1, bgm2, bgm3];
    const audioRef = useRef(new Audio(audioFiles[currentAudioIndex]));
    const muteAudio = useAtomValue(bgmVar);
    const playAudio = () => {
        if (audioRef.current.paused) {
            audioRef.current.loop = false;
            audioRef.current.volume = 0.3;
            audioRef.current.play();
            audioRef.current.addEventListener('ended', handleNextAudio);
            audioRef.current.muted = muteAudio;
        }
    };
    useEffect(() => {
        if (audioRef.current.muted) {
            audioRef.current.play();
            audioRef.current.muted = false;
        }
    }, [muteAudio]);
    useEffect(() => {
        audioRef.current.pause();
        audioRef.current = new Audio(audioFiles[currentAudioIndex]);
        audioRef.current.addEventListener('canplaythrough', playAudio);
        return () => {
            audioRef.current.removeEventListener('canplaythrough', playAudio);
        };
    }, [currentAudioIndex]);

    const handleNextAudio = () => {
        setCurrentAudioIndex((currentAudioIndex + 1) % audioFiles.length);
    };

    useEffect(() => {
        audioRef.current.addEventListener('ended', handleNextAudio);
        return () => {
            audioRef.current.removeEventListener('ended', handleNextAudio);
        };
    }, []);

    return <>{children}</>;
};

export default BGMPlayer;  