export const getFormattedDate = (date) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return `${day} / ${month} / ${year}`;
};

export const getTimeLeft = (birthday) => {
  const today = new Date();
  const birthdayDate = new Date(birthday);
  birthdayDate.setFullYear(today.getFullYear());
  if (today > birthdayDate && birthdayDate.getDate() !== today.getDate()) {
    birthdayDate.setFullYear(today.getFullYear() + 1);
  }
  const timeLeft = birthdayDate.getTime() - today.getTime();
  const days = timeLeft / (1000 * 3600 * 24);
  
  if (days < 1) {
    return 'Hoy es el cumple! ð';
  }

  if (days < 7) {
    return `Quedan ${Math.floor(days)} dÃ­as! ð`;
  }

  if (days < 30) {
    return `Quedan ${Math.floor(days / 7)} semanas! ð`;
  }

  if (days < 365) {
    return `Quedan ${Math.floor(days / 30)} meses! ð`;
  }

  return `Quedan ${Math.floor(days / 365)} aÃ±os! ð`;
};
