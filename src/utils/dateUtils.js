
export function getNewDate() {
    const date = new Date();
    const formatter =
    new Intl.DateTimeFormat('en-IE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return formatter.format(date);
}