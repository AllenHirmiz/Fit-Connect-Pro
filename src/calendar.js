document.addEventListener('DOMContentLoaded', function() {
  var Calendar = FullCalendar.Calendar;

  var calendarEl = document.getElementById('calendar');
  var checkbox = document.getElementById('drop-remove');

  var calendar = new Calendar(calendarEl, {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: true,
    droppable: true,
    eventClick: function(info) {
      // Display modal for customizing/deleting event
      showModalForCustomizingEvent(info.event);
    }
  });

  calendarEl.addEventListener('click', function(event) {
    if (event.target.classList.contains('fc-daygrid-day')) {
      // Display modal for adding activity to the clicked day
      showModalForAddingActivity();
    }
  });

  calendar.render();
});

function showModalForCustomizingEvent(event) {
  // Implement the modal logic for customizing/deleting the event
}

function showModalForAddingActivity() {
  // Implement the modal logic for adding an activity
}
