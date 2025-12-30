export interface GameScoreMetadata {
    room_token: string;
    data: {name: string, points: number}[];
}