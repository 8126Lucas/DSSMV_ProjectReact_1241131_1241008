import {GameScore} from "@/src/types/GameScore";

export interface LeaderboardListProps {
    data: GameScore[];
    limit?: number;
    type: 'latest' | 'best';
}