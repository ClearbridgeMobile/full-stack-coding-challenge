const formatDate = (date) => {
  date = new Date(date);
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = months[date.getUTCMonth() - 1];
  const addSuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  const formattedDate = `${monthName} ${addSuffix(day)}, ${year}  `;
  return formattedDate;
};


export const companyUtils = { formatDate };
