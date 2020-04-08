function addZero(num) {
  if (num < 10) return `0${num}`;
  else return num;
}

module.exports = {
  formatDate: (date) => {
    return `${date.getDate()} ${date.toLocaleString('default', {
      month: 'long',
    })} ${date.getFullYear()}`.toLowerCase();
  },
  formatDateDiff: (fDate, sDate) => {
    const diff = sDate.getTime() - fDate.getTime();
    return `${Math.round((diff / (1000 * 60 * 60)) * 10) / 10}`;
  },
  getHourTime: (date) => {
    return `${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
  },
  formatDuration: (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${addZero(minutes)}:${addZero(seconds)}`;
  },
};
