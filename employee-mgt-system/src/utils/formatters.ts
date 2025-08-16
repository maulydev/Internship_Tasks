export const formatDate = (dateInput: string | Date): string => {
  const date = new Date(dateInput);

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
