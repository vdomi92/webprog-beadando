export const w0 = {
  level: 0,
  type: 'field',
  hasBulb: false,
  hasBulbError: false,
};
export const b0 = {
  level: 0,
  type: 'black',
};
export const b1 = {
  level: 1,
  type: 'black',
};
export const b2 = {
  level: 2,
  type: 'black',
};
export const b3 = {
  level: 3,
  type: 'black',
};
export const b4 = {
  level: 4,
  type: 'black',
};
export const b5 = {
  level: -1,
  type: 'black',
};

const map0 = {
    name: 'beginner_map1',
    map: [
          [w0, w0, w0, b1, w0, w0, w0],
          [w0, b0, w0, w0, w0, b2, w0],
          [w0, w0, w0, w0, w0, w0, w0],
          [b5, w0, w0, b5, w0, w0, b5],
          [w0, w0, w0, w0, w0, w0, w0],
          [w0, b5, w0, w0, w0, b2, w0],
          [w0, w0, w0, b3, w0, w0, w0],
    ],
    rows: 7,
    cols: 7,
  };

  export const maps = [map0,/*map1, map2 */];