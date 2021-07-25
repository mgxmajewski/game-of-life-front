export const GRID_WIDTH = 20;
export const GRID_HEIGHT = 20;

export const createStage = () =>
    Array.from(Array(GRID_HEIGHT), () => Array(GRID_WIDTH).fill([0, 'clear']));
