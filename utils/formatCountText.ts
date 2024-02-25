
export const formatCountText = (count: number) => {
  let countStr = count.toString();
  let index = countStr.length - 3;
  while (index > 0) {
    countStr = countStr.substring(0, index) + ',' + countStr.substring(index);
    index -= 3;
  }
  return countStr;
}
