document.addEventListener('DOMContentLoaded', function() {
  var Calendar = FullCalendar.Calendar;

  var calendarEl = document.getElementById('calendar');
  var selectedDate;

  var calendar = new Calendar(calendarEl, {
    eventClick: function(info) {
      showModalForCustomizingEvent(info.event);
    }
  });

  calendarEl.addEventListener('click', function(event) {
    if (event.target.classList.contains('fc-daygrid-day')) {
      selectedDate = event.target.dataset.date;
      showModalForAddingActivity();
    }
  });

  calendar.render();

  var activityModal = document.querySelector('#activity-modal');
  var customEventModal = document.querySelector('#custom-event-modal');
  var modalInstance = M.Modal.init(activityModal);
  var customEventModalInstance = M.Modal.init(customEventModal);

  var saveButton = document.querySelector('#save-activity');

  saveButton.addEventListener('click', function() {
    var activityName = document.querySelector('#activity-name').value;

    var newEvent = {
      title: activityName,
      start: selectedDate
    };

    calendar.addEvent(newEvent);

    modalInstance.close();
  });

  function showModalForCustomizingEvent(event) {
    var editEventButton = document.querySelector('#edit-event-button');
    var deleteEventButton = document.querySelector('#delete-event-button');
    editEventButton.removeEventListener('click', null);
    deleteEventButton.removeEventListener('click', null);

    var eventTitleInput = document.querySelector('#event-title');
    eventTitleInput.value = event.title;


    editEventButton.addEventListener('click', function() {
      event.setProp('title', eventTitleInput.value);
      customEventModalInstance.close();
    });

    deleteEventButton.addEventListener('click', function() {
      event.remove();
      customEventModalInstance.close();
    });

    customEventModalInstance.open();
  }

  function showModalForAddingActivity() {
    modalInstance.open();
  }
});