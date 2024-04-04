
const DateHelpers = () => {

    const transformDateWithDayOfTheWeek = (isoDateString: string) => {
        const date = new Date(isoDateString);

        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = daysOfWeek[date.getDay()];

        const dayOfMonth = date.getDate();
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const monthName = monthNames[date.getMonth()];

        return `${dayOfWeek}, ${dayOfMonth} ${monthName}`;
    }

    function formatDate(inputDate: string) {
        const months : Record<string, number> = {
            "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5,
            "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11
        };

        // Розділити вхідну дату на складові
        const parts = inputDate.split(', ');

        // Визначити день, місяць і рік
        const day = parseInt(parts[1].split(' ')[0]);
        const monthStr = parts[1].split(' ')[1];
        const year = new Date().getFullYear(); // Беремо поточний рік



        const dateObj = new Date(year,
            months[monthStr], day);

        // Отримати рік, місяць і день у потрібному форматі
        const yearFormatted = dateObj.getFullYear();
        const monthFormatted = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const dayFormatted = dateObj.getDate().toString().padStart(2, '0');

        // Повернути дату у відповідному форматі
        return `${yearFormatted}-${monthFormatted}-${dayFormatted}`;
    }


    return {
        transformDateWithDayOfTheWeek,
        formatDate
    };
}

export default DateHelpers();