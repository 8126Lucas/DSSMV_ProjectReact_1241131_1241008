import {GameScoreMetadata} from "@/src/types/GameScoreMetadata";

export interface GameScore {
    _id: string;
    rank?: number;
    game_date: string;
    score: number;
    time: number;
    metadata: GameScoreMetadata;
}