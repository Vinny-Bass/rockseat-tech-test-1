export default function getCurrentTime() {
    const date = new Date()

    const options = {
        timeZone: 'Europe/London',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }

    const dateStr = new Intl.DateTimeFormat('en-GB', options).format(date)

    const [day, month, year, hour, minute, second] = dateStr.match(/\d+/g);
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

console.log(getCurrentTime())