
const DateHelpers = () => {

    const transformDateWithDayOfTheWeek = (isoDateString) => {
        const date = new Date(isoDateString);

        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = daysOfWeek[date.getDay()];

        const dayOfMonth = date.getDate();
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const monthName = monthNames[date.getMonth()];

        return `${dayOfWeek}, ${dayOfMonth} ${monthName}`;
    }

    return {
        transformDateWithDayOfTheWeek
    };
}

export default DateHelpers();