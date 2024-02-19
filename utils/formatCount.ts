
export const formatCount = (count: number) => {
    if (count >= 1000000) {
      return (Math.floor((count / 1000000) * 10) / 10).toFixed(1) + 'M'; // convert to M for number from > 1000000
    } else if (count >= 1000) {
      return (Math.floor(count / 100) / 10).toFixed(1) + 'k'; // convert to k for number from > 1000
    } else {
      return count;
    }
  };
