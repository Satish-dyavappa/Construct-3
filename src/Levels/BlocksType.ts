export interface IlevelData {
    player: {
        positions: {
            x: number;
            y: number;
        };
    };
    grassBox?: {
        positions: Array<{
            x: number;
            y: number;
        }>;
    };
    gateStone?: {
        positions: Array<{
            x: number;
            y: number;
        }>;
    };
    concrete?: {
        positions: Array<{
            x: number;
            y: number;
        }>;
    };
    baseStone?: {
        positions: {
            x: number;
            y: number;
        } | Array<{
            x: number;
            y: number;
        }>;
    };
    totalStoneCount: number;
}