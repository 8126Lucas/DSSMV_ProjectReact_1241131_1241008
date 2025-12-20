export interface CountdownClockProps {
    seconds: number;
    onTimeChange: (time: number) => void;
}