import {GameScoreMetadata} from "@/src/types/GameScoreMetadata";

export interface GameMetadataOverlayProps {
    metadata_visible: boolean;
    setMetadataVisible: React.Dispatch<React.SetStateAction<boolean>>;
    metadata: GameScoreMetadata;
}