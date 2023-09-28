/**
 * split trials into some blocks
 *
 * @param {Array} trials all trials
 * @param {Number} nBlock number of blocks.
 *
 * @returns
 */
export const chunkTrials = function (trials: any[], nBlock: number = 2) {
  var chunkSize = Math.ceil(trials.length / nBlock);
  var blocks: any[] = [];
  for (var i of Array(nBlock).keys()) {
    blocks.push(trials.slice(i * chunkSize, (i + 1) * chunkSize));
  }
  return blocks;
};
