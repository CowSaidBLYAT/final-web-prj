let selectedDays = [];
let notes = {};

document.addEventListener('DOMContentLoaded', function () {
    const year = 2023; // Specify the desired year
    const month = 11; // 0-indexed month (0 = January, 11 = December)

    let daysInMonth = getDaysInMonth(month, year);
    let firstDayOfMonth = new Date(year, month, 1).getDay();

    // Create table rows for the month
    for (let i = 0; i < daysInMonth; i += 7) {
        let row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            let day = i + j + 1 - firstDayOfMonth;
            let cell = document.createElement('td');

            if (day <= 0 || day > daysInMonth) {
                cell.textContent = '';
            } else {
                cell.textContent = day;
                if (day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
                    cell.classList.add('today');
                }
                cell.addEventListener('click', function () {
                    selectDay(cell, day);
                });
            }
            row.appendChild(cell);
        }
        document.getElementById('days').appendChild(row);
    }
});

function selectDay(cell, day) {
    if (selectedDays.includes(day)) {
        selectedDays = selectedDays.filter(function (selectedDay) {
            return selectedDay !== day;
        });
        cell.classList.remove('selected-day');
    } else {
        selectedDays.push(day);
        cell.classList.add('selected-day');
    }

    let note = prompt('Enter a note for this day:');
    if (note) {
        notes[day] = note;
    } else {
        delete notes[day];
    }

    updateNotes();
}

function updateNotes() {
    let notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    selectedDays.forEach(function (day) {
        let listItem = document.createElement('li');
        listItem.textContent = 'Day ' + day + ': ' + notes[day];
        notesList.appendChild(listItem);
    });
}

function getDaysInMonth(month, year) {
    const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysInMonth[month];
}

function isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

// Add this function to clear selected days
function clearSelectedDays() {
    selectedDays.forEach(function (day) {
        let cells = document.querySelectorAll('td');
        cells.forEach(function (cell) {
            if (parseInt(cell.textContent) === day) {
                cell.classList.remove('selected-day');
            }
        });
    });

    selectedDays = [];
    notes = {};
    updateNotes();
}

document.getElementById('clear-button').addEventListener('click', clearSelectedDays);
