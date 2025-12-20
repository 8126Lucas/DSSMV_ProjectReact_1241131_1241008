import {PointsOverlayProps} from "@/src/types/PointsOverlayProps";

export interface GamePointsOverlayProps extends PointsOverlayProps {
    player_scores: {name: string, points: number}[];
}