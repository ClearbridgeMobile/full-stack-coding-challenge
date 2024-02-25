const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  // Adjust for timezone offset
  const timezoneOffset = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() + timezoneOffset);

  // Set hours, minutes, seconds, and milliseconds to zero
  date.setHours(0, 0, 0, 0);

  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export default formatDate;
