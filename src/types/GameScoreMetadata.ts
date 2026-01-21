export interface GameScoreMetadata {
    room_token: string;
    category?: string | null;
    difficulty?: string | null;
    type?: string | null;
    number_of_questions?: string | null;
    data: {name: string, points: number}[];
}