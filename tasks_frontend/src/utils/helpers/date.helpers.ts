
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

        const day = parseInt(inputDate.split(' ')[0]);
        const monthStr = inputDate.split(' ')[1];
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

    function timeAgo(inputDateStr: string): string {
        // Розділення дати та часу
        const [datePart, timePart] = inputDateStr.split(' ');

        // Розділення дати на день, місяць, рік
        const [day, month, year] = datePart.split('.').map(Number);

        // Створення рядка у форматі ISO
        const isoDateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${timePart}`;

        const inputDate = new Date(isoDateStr);

        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000);


        const intervals = [
            { label: 'year', seconds: 31536000 },
            { label: 'month', seconds: 2592000 },
            { label: 'week', seconds: 604800 },
            { label: 'day', seconds: 86400 },
            { label: 'hour', seconds: 3600 },
            { label: 'minute', seconds: 60 },
            { label: 'second', seconds: 1 }
        ];

        for (const interval of intervals) {
            const count = Math.floor(diffInSeconds / interval.seconds);
            if (count >= 1) {
                return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
            }
        }

        return 'just now';
    }

    return {
        transformDateWithDayOfTheWeek,
        formatDate,
        timeAgo
    };
}

export default DateHelpers();