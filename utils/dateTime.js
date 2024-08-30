exports.formatDateSync = (date = new Date()) => {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return day + "-" + month + "-" + year;
};

exports.convertToEpoch = (date) => {
  if (date) {
    return Math.floor(date.getTime() / 1000);
  } else {
    return null;
  }
};

exports.getEpochFirstLastToday = () => {
  // Get current date
  const now = new Date();

  // Get the start of today (00:00:00)
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  // const firstEpochTime = Math.floor(startOfDay.getTime() / 1000);
  const firstEpochTime = startOfDay.getTime();

  // Get the end of today (23:59:59)
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999
  );
  // const lastEpochTime = Math.floor(endOfDay.getTime() / 1000);
  const lastEpochTime = endOfDay.getTime();
  return {
    firstEpochTime,
    lastEpochTime,
  };
};

exports.formatDashedDate = (epochTime) => {
  // let date = new Date(epochTime);
  // console.log(epochTime);
  const et = isNaN(epochTime) ? epochTime : parseInt(epochTime);
  // const et = isNaN(parseInt(epochTime)) ? epochTime : parseInt(epochTime);
  let date = new Date(et);

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return year + "-" + month + "-" + day;
};



function getdates(daysCount = 1) {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < daysCount; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i); // Subtract 'i' days from today's date
    const formattedDate = formatDate(date);
    dates.push(formattedDate);
  }

  return dates;
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0'); // Ensures two-digit day
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensures two-digit month
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}