// Update User Profile
const newFormHandler = async (event) => {
  event.preventDefault();
  const id = document.querySelector('#id').value.trim();
  const first_name = document.querySelector('#first_name').value.trim();
  const last_name = document.querySelector('#last_name').value.trim();
  const mobile = document.querySelector('#mobile').value.trim();

  if (id && first_name && last_name && mobile) {
    const response = await fetch(`/api/users/${id}`, {
      method: 'put',
      body: JSON.stringify({ first_name, last_name, mobile }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to update profile');
    }
  }
};

// Activity Deleted on Profile Page
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/activities/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete activity');
    }
  }
};

// New Activity created on Profile Page
const newActivityHandler = async (event) => {
  event.preventDefault();

  const name = toTitleCase(
    document.querySelector('#activity-name').value.trim()
  );
  const date_start =
    dayjs(document.querySelector('#activity-date').value.trim()).format(
      'YYYY-MM-DD'
    ) + 'T10:00:00.000Z';

  const duration = document.querySelector('#activity-duration').value.trim();
  const date_end = dayjs(date_start).add(duration, 'day');

  if (name && date_start && date_end) {
    const response = await fetch(`/api/activities/`, {
      method: 'POST',
      body: JSON.stringify({ name, date_start, date_end }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to update profile');
    }
  }
};

// Convert Name to TitleCase
function toTitleCase(str) {
  var lcStr = str.toLowerCase();
  return lcStr.replace(/(?:^|\s)\w/g, function (match) {
    return match.toUpperCase();
  });
}

document
  .querySelector('.update-profile-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.activity-list')
  .addEventListener('click', delButtonHandler);

document
  .querySelector('.add-activity-form')
  .addEventListener('submit', newActivityHandler);
