var CALENDAR = CALENDAR | (function() {
    'use strict';

    var calendar = window.calendar;
    var monthDate;
    var $wrapper;
    var today = new Date();

    // html
    calendar.buildUI = function(year, month) {
        monthDate = calendar.getMonthDate(year, month);

        var html = '<div>' +
            '<table>' +
            '<tr>' +
            '<td><lable>name</lable></td>' +
            '<td><input class="ui-calendar-input"/></td>' +
            '</tr>' +
            '<tr>' +
            '<td><lable>address</lable></td>' +
            '<td><input class="ui-calendar-input"/></td>' +
            '</tr>' +
            '<tr>' +
            '<td><lable>tel</lable></td>' +
            '<td><input class="ui-calendar-input"/></td>' +
            '</tr>' +
            '</table>' +
            '</div>' +
            '<div class="ui-calendar-header">' +
            '<a href="#" class="ui-calendar-btn ui-calendar-prev-btn">&lt;</a>' +
            '<a href="#" class="ui-calendar-btn ui-calendar-next-btn">&gt;</a>' +
            '<span class="ui-calendar-curr-month">' + monthDate.year + '-' + monthDate.month + '</span>' +
            '</div>' +

            '<div class="ui-calendar-body">' +
            '<table >' +
            '<thead>' +
            '<tr>' +
            '<th>Mon</th>' +
            '<th>Tue</th>' +
            '<th>Wed</th>' +
            '<th>Thu</th>' +
            '<th>Fri</th>' +
            '<th>Sat</th>' +
            '<th>Sun</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';

        for (var i = 0; i < monthDate.days.length; i++) {
            var date = monthDate.days[i];

            if (i % 7 === 0) {
                html += '<tr>';
            }
            if (date.date <= 0) {
                html += '<td data-date = ' + date.date + ' class = "notThisMonth">' + date.showDate + '</td>'
            } else if (date.date > date.showDate) {
                html += '<td data-date = ' + date.date + ' class = "notThisMonth">' + date.showDate + '</td>'
            } else if (date.showDate == today.getDate() &&
                monthDate.month == today.getMonth() + 1 &&
                monthDate.year == today.getFullYear()) {
                html += '<td data-date = ' + date.date + ' class = "on">' + date.showDate + '</td>'
            } else {
                html += '<td data-date = ' + date.date + '>' + date.showDate + '</td>'
            }

            if (i % 7 === 6) {
                html += '</tr>';
            }
        }

        html += '</tbody>' +
            '</table>' +
            '</div>';
        return html;
    };

    // render
    calendar.render = function(direction) {
        var year, month;
        if (monthDate) {
            year = monthDate.year;
            month = monthDate.month;
        }

        if (direction === 'prev') month--;
        if (direction === 'next') month++;

        var html = calendar.buildUI(year, month);

        $wrapper = document.querySelector('.ui-calendar-wrapper');
        if (!$wrapper) {
            $wrapper = document.createElement('div');
            $wrapper.className = "ui-calendar-wrapper";

            document.body.appendChild($wrapper);
        }
        $wrapper.innerHTML = html;

    }

    calendar.init = function(input) {
        calendar.render();

        $wrapper.classList.add('ui-calendar-wrapper-show');
        var $input = document.querySelector(input);
        var left = $input.offsetLeft;
        var top = $input.offsetTop;
        var height = $input.offsetHeight;

        $wrapper.style.top = top + height + 8 + 'px';
        $wrapper.style.left = left + 2 + 'px';

        /*
        var $input = document.querySelector(input);
        var isOpen = false;
		
        $input.addEventListener('click',function(){
        	if(isOpen){
        		$wrapper.classList.remove('ui-calendar-wrapper-show');
        		isOpen = false;
        	}else{
        		$wrapper.classList.add('ui-calendar-wrapper-show');
        		var left = $input.offsetLeft;
        		var top = $input.offsetTop;
        		var height = $input.offsetHeight;
        		
        		$wrapper.style.top = top + height + 8 + 'px';
        		$wrapper.style.left = left + 2 +'px';
        		
        		isOpen = true;
        	}
        },false);
        */

        // prev and next button click event
        $wrapper.addEventListener('click', function(e) {
            var $target = e.target;
            if (!$target.classList.contains('ui-calendar-btn')) {
                return;
            }

            if ($target.classList.contains('ui-calendar-prev-btn')) {
                calendar.render('prev');
            } else if ($target.classList.contains('ui-calendar-next-btn')) {
                calendar.render('next');
            }
        }, false);

        // calendar item click event
        $wrapper.addEventListener('click', function(e) {
            var $target = e.target;

            if ($target.tagName.toLowerCase() !== 'td') {
                return;
            }


            var date = new Date(monthDate.year, monthDate.month - 1, $target.dataset.date);

            // $input.value = format(date);
            // $wrapper.classList.remove('ui-calendar-wrapper-show');
            // isOpen = false;
        }, false);
    }

    // Format return date
    function format(date) {
        var ret = '';
        var padding = function(num) {
            if (num <= 9) {
                return '0' + num;
            } else {
                return num;
            }
        }

        ret += date.getFullYear() + '-';
        ret += padding(date.getMonth() + 1) + '-';
        ret += padding(date.getDate());

        return ret;
    }
})();