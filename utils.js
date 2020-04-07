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
};
