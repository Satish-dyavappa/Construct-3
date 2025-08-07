import { IlevelData } from "./BlocksType";

const level1: IlevelData = {
   "player": { "positions": { x: 580, y: 360 } },
   "grassBox": { "positions": [{ x: 570, y: 870 }] },
   "gateStone": { "positions": [{ x: 570, y: 768 }, { x: 570, y: 566 }] },
   "concrete": { "positions": [ { x: 1242, y: 870 }, { x: 1292, y: 870 }, { x: 575, y: 564 }, { x: 575, y: 462 }] },
   "totalStoneCount": 6 ,
}

const level2: IlevelData = {
   "player": { "positions": { x: 460, y: 360 } },
   "baseStone": { "positions": { x: 460, y: 670 } },
   "grassBox": { "positions": [{ x: 460, y: 768 }] },
   "gateStone": { "positions": [{ x: 410, y: 666 },{ x: 460, y: 870 }] },
   "concrete": { "positions": [{ x: 460, y: 564 }, { x: 460, y: 462 }] },
   "totalStoneCount": 5,   
}

const level3: IlevelData = {
   "player": { "positions": { x: 700, y: 258 } },
   "baseStone": { "positions": { x: 600, y: 870 } },
   "grassBox": { "positions": [{ x: 1240, y: 870 }] },
   "gateStone": { "positions": [{ x: 580, y: 666 }, { x: 782, y: 666 }, { x: 681, y: 564 }] },
   "concrete": { "positions": [{ x: 696, y: 360 }, { x: 635, y: 462 }, { x: 737, y: 462 }, { x: 532, y: 768 }, { x: 712, y: 768 }, {x : 850, y : 768}, {x : 850, y : 870}, {x : 1724, y : 870}] },
   "totalStoneCount": 11,
}

const level4: IlevelData = {
   "player": { "positions": { x: 700, y: 156 } },
   "grassBox": { "positions": [{ x: 530, y: 870 }, {x : 680, y : 870}, {x : 1080, y : 870}] },
   "gateStone": { "positions": [{ x: 580, y: 666 }, { x: 782, y: 666 }, { x: 680,    y: 564 }, {x : 680, y : 360}] },
   "concrete": { "positions": [{ x: 696, y: 258 }, { x: 635, y: 462 }, { x: 737, y: 462 }, { x: 530, y: 768 }, { x: 680, y: 768 }, 
                               { x: 830, y: 768 }, { x: 1080, y: 768 }, { x: 110, y: 870 }, { x: 830, y: 870 }, { x: 1724, y: 870 }] },
   "totalStoneCount": 14,
}

const level5: IlevelData = {
   "player": { "positions": { x: 675, y: 156 } },
   "baseStone": { "positions": { x: 1098, y: 666 } },
   "grassBox": { "positions": [{ x: 530, y: 870 }] },
   "gateStone": { "positions": [{ x: 630, y: 462 }, { x: 580, y: 768 }, { x: 680, y: 870 }, {x : 1055, y : 870}] },
   "concrete": { "positions": [{ x: 675, y: 278 }, { x: 675, y: 360 }, { x: 575, y: 564 }, { x: 677, y: 564 }, { x: 1155, y: 561 }, 
                               { x: 532, y: 666 }, { x: 634, y: 666 }, { x: 736, y: 666 }, { x: 731, y: 768 }, { x: 1023, y: 768 }, 
                               { x: 1125, y: 768 }] },
   "totalStoneCount" : 15
}

const level6: IlevelData = {
   "player": { "positions": { x: 627, y: 156 } },
   "grassBox": { "positions": [{ x: 1284, y: 870 }] },
   "gateStone": { "positions": [{ x: 630, y: 360 }, { x: 1133, y: 768 }] },
   "concrete": { "positions": [{ x: 627, y: 258 }, { x: 530, y: 462 }, { x: 730, y: 462 }, { x: 530, y: 564 }, { x: 730, y: 564 }, 
                               { x: 530, y: 666 }, { x: 730, y: 666 }, {x : 1184, y : 664}, { x: 530, y: 768 }, { x: 730, y: 768 }, 
                               { x: 530, y: 870 }, {x : 730, y : 870}, {x : 1182, y : 870}]},
   "totalStoneCount": 15,
}

const level7: IlevelData = {
   "player": { "positions": { x: 1060, y: 360 } },
   "grassBox": { "positions": [{ x: 1064, y: 870 }, {x : 1264, y : 870}] },
   "gateStone": { "positions": [{ x: 1110, y: 768 }, { x: 909, y: 870 }] },
   "concrete": { "positions": [{ x: 1060, y: 462 }, { x: 730, y: 564 }, { x: 1060, y: 564 }, { x: 730, y: 666 }, { x: 865, y: 666 }, 
                               { x: 1060, y: 666 }, { x: 1162, y: 666 }, { x: 730, y: 768 }, { x: 865, y: 768 }, { x: 1274, y: 768},
                               {x : 730, y : 870}, {x : 1162, y : 870}] },
   "totalStoneCount": 14,
}

const level8: IlevelData = {
   "player": { "positions": { x: 700, y: 156 } },
   "grassBox": { "positions": [{ x: 530, y: 870 }, {x : 680, y : 870}, {x : 1080, y : 870}] },
   "gateStone": { "positions": [{ x: 580, y: 666 }, { x: 782, y: 666 }, { x: 680, y: 564 }, {x : 680, y : 360}] },
   "concrete": { "positions": [{ x: 696, y: 258 }, { x: 635, y: 462 }, { x: 737, y: 462 }, { x: 530, y: 768 }, { x: 680, y: 768 }, 
                               { x: 830, y: 768 }, { x: 1080, y: 768 }, { x: 110, y: 870 }, { x: 830, y: 870 }, { x: 1724, y: 870 }] },
   "totalStoneCount": 14,
}

const level9: IlevelData = {
   "player": { "positions": { x: 700, y: 156 } },
   "grassBox": { "positions": [{ x: 530, y: 870 }, {x : 680, y : 870}, {x : 1080, y : 870}] },
   "gateStone": { "positions": [{ x: 580, y: 666 }, { x: 782, y: 666 }, { x: 680, y: 564 }, {x : 680, y : 360}] },
   "concrete": { "positions": [{ x: 696, y: 258 }, { x: 635, y: 462 }, { x: 737, y: 462 }, { x: 530, y: 768 }, { x: 680, y: 768 }, 
                               { x: 830, y: 768 }, { x: 1080, y: 768 }, { x: 110, y: 870 }, { x: 830, y: 870 }, { x: 1724, y: 870 }] },
   "totalStoneCount": 14,
}

const level10: IlevelData = {
   "player": { "positions": { x: 700, y: 156 } },
   "grassBox": { "positions": [{ x: 530, y: 870 }, {x : 680, y : 870}, {x : 1080, y : 870}] },
   "gateStone": { "positions": [{ x: 580, y: 666 }, { x: 782, y: 666 }, { x: 680, y: 564 }, {x : 680, y : 360}] },
   "concrete": { "positions": [{ x: 696, y: 258 }, { x: 635, y: 462 }, { x: 737, y: 462 }, { x: 530, y: 768 }, { x: 680, y: 768 }, 
                               { x: 830, y: 768 }, { x: 1080, y: 768 }, { x: 110, y: 870 }, { x: 830, y: 870 }, { x: 1724, y: 870 }] },
   "totalStoneCount": 14,
}

const level11: IlevelData = {
   "player": { "positions": { x: 700, y: 156 } },
   "grassBox": { "positions": [{ x: 530, y: 870 }, {x : 680, y : 870}, {x : 1080, y : 870}] },
   "gateStone": { "positions": [{ x: 580, y: 666 }, { x: 782, y: 666 }, { x: 680, y: 564 }, {x : 680, y : 360}] },
   "concrete": { "positions": [{ x: 696, y: 258 }, { x: 635, y: 462 }, { x: 737, y: 462 }, { x: 530, y: 768 }, { x: 680, y: 768 }, 
                               { x: 830, y: 768 }, { x: 1080, y: 768 }, { x: 110, y: 870 }, { x: 830, y: 870 }, { x: 1724, y: 870 }] },
   "totalStoneCount": 14,
}

const level12: IlevelData = {
   "player": { "positions": { x: 700, y: 156 } },
   "grassBox": { "positions": [{ x: 530, y: 870 }, {x : 680, y : 870}, {x : 1080, y : 870}] },
   "gateStone": { "positions": [{ x: 580, y: 666 }, { x: 782, y: 666 }, { x: 680, y: 564 }, {x : 680, y : 360}] },
   "concrete": { "positions": [{ x: 696, y: 258 }, { x: 635, y: 462 }, { x: 737, y: 462 }, { x: 530, y: 768 }, { x: 680, y: 768 }, 
                               { x: 830, y: 768 }, { x: 1080, y: 768 }, { x: 110, y: 870 }, { x: 830, y: 870 }, { x: 1724, y: 870 }] },
   "totalStoneCount": 14,
}

// Export as array for easier use
export const levels: IlevelData[] = [
    level1, level2, level3, level4, level5, level6, 
    level7, level8, level9, level10, level11, level12
];

// Export individual levels
export { level1, level2, level3, level4, level5, level6, level7, level8, level9, level10, level11, level12 }

// Re-export the interface for convenience
export type { IlevelData };