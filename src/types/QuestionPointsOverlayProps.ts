import {PointsOverlayProps} from "@/src/types/PointsOverlayProps";

export interface QuestionPointsOverlayProps extends PointsOverlayProps{
    points: number;
    correct: boolean;
}