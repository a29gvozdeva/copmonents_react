import React from "react";
import moment from 'moment';


export default class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {date: moment()};
    };

    weekdayShort() {
        const weekDaysShort = moment.weekdaysShort();
        return weekDaysShort.map(day => {
            return (
                <th key={day} className="week-day">
                    {day[0]}
                </th>
            );
        });
    };

    firstDayInMonth() {
        return moment(this.state.date)
            .startOf("month")
            .format("d");
    };

    daysInMonth() {
        return moment(this.state.date).daysInMonth();
    }


    daysBeforeFirstDay() {
        let daysBefore = [];
        for (let i = 0; i < this.firstDayInMonth(); i++) {
            daysBefore.push(
                <td className="calendar-day empty">{""}</td>
            );
        }
        return daysBefore;
    }

    allDaysInMonth() {
        let allDays = [];
        for (let i = 1; i <= this.daysInMonth(); i++) {
            if (i == moment(this.state.date).format('D')) {
                allDays.push(
                    <td className="current-day-number">{i}</td>
                );
            } else {
                allDays.push(
                    <td className="calendar-day">{i}</td>
                );
            }
        }
        return allDays;
    }


    totalSlots() {
        const totalSlots = [...this.daysBeforeFirstDay(), ...this.allDaysInMonth()];
        let rows = [];
        let cells = [];
        totalSlots.forEach((value, i) => {
            if (i % 7 !== 0) {
                cells.push(value)
            } else {
                rows.push(cells);
                cells = [];
                cells.push(value);
            }
            if (i === totalSlots.length - 1) {
                rows.push(cells);
            }
        })
        return rows.map((d, i) => {
                return <tr key={i}>{d}</tr>;
            }
        );
    };


    getCurrentDay() {
        return moment(this.state.date).format('D');
    }

    getCurrentYear() {
        return moment(this.state.date).format('YYYY');
    }

    getCurrentMonth() {
        return moment(this.state.date).format('MMMM');
    }

    getCurrentWeekDay() {
        return moment(this.state.date).format('dddd');
    }


    render() {
        const weekdayShort = this.weekdayShort();
        const firstDayInMoth = this.firstDayInMonth();
        const daysBefore = this.daysBeforeFirstDay();
        const currentDay = this.getCurrentDay();
        const currentYear = this.getCurrentYear();
        const currentMonth = this.getCurrentMonth();
        const currentWeekDay = this.getCurrentWeekDay();

        return (
            <div className={'calendar-wrapper'}>
                <div className={'current-day-wrapper'}>
                    <h2>{currentWeekDay}</h2>
                    <h1>{currentDay}</h1>
                </div>
                <div className={'current-month-wrapper'}>
                    <h2>{currentMonth} {currentYear}</h2>
                    <table>
                        <thead>
                        <tr>
                            {weekdayShort}
                        </tr>
                        </thead>
                        <tbody>{this.totalSlots()}</tbody>
                    </table>
                </div>

            </div>
        );
    }
}
