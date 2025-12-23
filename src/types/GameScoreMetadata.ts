import {GamePointsPerPlayerProps} from "@/src/types/GamePointsPerPlayerProps";

export interface GameScoreMetadata {
    room_token: string;
    data: {name: string, points: number}[];
}