export const timeDifferenceInHours = (date1: Date, date2: Date): number => {
  const diffInMs = Math.abs(date1.getTime() - date2.getTime());
  return diffInMs / (1000 * 60 * 60);
};

export const timeDifferenceInDays = (date1: Date, date2: Date): number => {
  return timeDifferenceInHours(date1, date2) / 24;
};

export const timeDifferenceInWeeks = (date1: Date, date2: Date): number => {
  return timeDifferenceInDays(date1, date2) / 7;
};
