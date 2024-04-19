
const darkModeToggle = document.getElementById('dark-mode-toggle');

darkModeToggle.addEventListener('change', () => {
    const body = document.body;
    const container = document.querySelector('.container');

    if (darkModeToggle.checked) {
        body.classList.add('dark-mode');
        container.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
        container.classList.remove('dark-mode');
    }
});

// Function to generate the calendar
function generateCalendar() {
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value) - 1; // JavaScript months are 0-indexed
    const year = parseInt(document.getElementById('year').value);
    const startDayIndex = parseInt(document.getElementById('start-day').value);
    const calendarColor = document.getElementById('calendar-color').value;
    const fontSize = document.getElementById('font-size').value + 'px';
    const showWeekNumbers = document.getElementById('show-week-numbers').checked;
    const highlightDates = document.getElementById('highlight-dates').value.split(',').map(date => date.trim());
    const fontColor = document.getElementById('font-color').value;
    const customMessage = document.getElementById('custom-message').value;

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const numDaysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    let calendarHTML = `<h2>${months[month]} ${year}</h2>`;
    calendarHTML += '<table>';
    calendarHTML += '<tr>';

    if (showWeekNumbers) {
        calendarHTML += '<th>Week</th>';
    }

    for (let i = 0; i < daysOfWeek.length; i++) {
        calendarHTML += `<th>${daysOfWeek[(i + startDayIndex) % 7]}</th>`;
    }

    calendarHTML += '</tr><tr>';

    let dayOfMonth = 1;
    let weekNumber = 1;

    for (let i = 0; i < 42; i++) {
        if (i % 7 === 0 && showWeekNumbers) {
            calendarHTML += `<td>${weekNumber}</td>`;
            weekNumber++;
        }

        if (i < startingDay || dayOfMonth > numDaysInMonth) {
            calendarHTML += '<td></td>';
        } else {
            let classNames = [];
            if ((i % 7) === 0 || (i % 7) === 6) { // Weekend
                classNames.push('weekend');
            }
            if (day === dayOfMonth && month === new Date().getMonth() && year === new Date().getFullYear()) { // Current date
                classNames.push('current-date');
            }
            if (day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) { // Today's date
                classNames.push('today');
            }
            if (highlightDates.includes(`${year}-${month + 1}-${dayOfMonth}`)) { // Highlighted dates
                classNames.push('highlighted-date');
            }

            calendarHTML += `<td class="${classNames.join(' ')}" style="background-color: ${calendarColor}; color: ${fontColor}; font-size: ${fontSize};">${dayOfMonth}`;

            if (customMessage && highlightDates.includes(`${year}-${month + 1}-${dayOfMonth}`)) {
                calendarHTML += `<br><span>${customMessage}</span>`;
            }

            calendarHTML += '</td>';
            dayOfMonth++;
        }

        if ((i + 1) % 7 === 0) {
            calendarHTML += '</tr><tr>';
        }
    }

    calendarHTML += '</tr></table>';

    const calendarContainer = document.getElementById('calendar-container');
    calendarContainer.innerHTML = calendarHTML;

    calendarContainer.classList.add('show-calendar');
}
