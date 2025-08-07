import { IlevelData } from "./BlocksType";

const level1: IlevelData = {
   "player": { "positions": { x: 580, y: 360 } },
   "grassBox": { "positions": [{ x: 570, y: 870 }] },
   "gateStone": { "positions": [{ x: 570, y: 768 }, { x: 570, y: 566 }] },
   "concrete": { "positions": [ { x: 1242, y: 870 }, { x: 1292, y: 870 }, { x: 575, y: 564 }, { x: 575, y: 462 }] },
   "totalStoneCount": 6,
}

const level2: IlevelData = {
   "player": { "positions": { x: 360, y: 360 } },
   "baseStone": { "positions": { x: 360, y: 840 } },
   "gateStone": { "positions": [{ x: 460, y: 870 },{ x: 260, y: 870 },{x: 380, y: 600 }] },
   "concrete": { "positions": [{ x: 360, y: 564 }, { x: 360, y: 462 },{x:310,y:666},{ x: 460, y: 768 }] },
   "totalStoneCount": 7,   
}

const level3: IlevelData = {
  "player": { "positions": { x: 460, y: 360 } },
   "baseStone": { "positions": { x: 460, y: 870 } },
   "gateStone": { "positions": [{x: 460,y: 658},{x: 960,y: 768}] },
   "concrete": { "positions": [{ x: 370, y: 764 }, { x: 560, y: 760 },{ x: 460, y: 568 },{ x: 1060, y: 768 }] },
   "totalStoneCount": 6,
}

const level4: IlevelData = {
   "player": { "positions": { x: 550, y: 260 } },
   "baseStone": { "positions": { x: 460, y: 870 }},
   "gateStone": { "positions": [{ x: 420, y: 658 }, { x: 520, y: 558 }, { x: 620, y: 628 }] },
   "concrete": { "positions": [{ x: 370, y: 766 }, { x: 500, y: 420 }, { x: 540, y: 760 }, { x: 550, y: 320 }, { x: 580, y: 420 }] },
   "totalStoneCount": 8,
}


// Export as array for easier use
export const levels: IlevelData[] = [
    level1, level2, level3, level4
];

// Export individual levels
export { level1, level2, level3, level4}

// Re-export the interface for convenience
export type { IlevelData };