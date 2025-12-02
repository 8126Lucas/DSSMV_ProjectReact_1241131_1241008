export function calculateScore(tl: number, diff: string, type: string): number {
    let base_points = 500;
    switch (diff) {
        case 'hard': base_points += 300; break;
        case 'medium': base_points += 150; break;
        default: break;
    }
    switch (type) {
        case 'boolean': base_points += 50; break;
        case 'multiple': base_points += 100; break;
        default: break;
    }
    let factor = tl/30;
    return Math.floor(base_points * factor);
}