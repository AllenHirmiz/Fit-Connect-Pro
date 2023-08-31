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

document
  .querySelector('.update-profile-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.activity-list')
  .addEventListener('click', delButtonHandler);
