const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const timeConv = (t: string) => {
  const c = Number(t.substring(0, 2))
  return c > 12 ? `${c < 22 || c === 24 ? '0' : ''}${c % 12}${t.substring(2)} PM` : t + ` ${c == 12 ? 'PM' : 'AM'}`
}

export const appointmentTIme = (date: string, time: string) => {
  const d = new Date(`${date} ${time}`)
  return `${months[d.getMonth()]} ${d.getDate()}. ${timeConv(time)}`
}