const newFormHandler = async (event) => {
    event.preventDefault();
  
    const user_id = document.querySelector('#user_id').value.trim();
    const name = document.querySelector('#name').value.trim();
    const date_start = document.querySelector('#date-start').value.trim();
  
    if (name && needed_funding && description) {
      const response = await fetch(`/api/activities`, {
        method: 'POST',
        body: JSON.stringify({ name, needed_funding, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create activity');
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
    .querySelector('.new-activity-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.activity-list')
    .addEventListener('click', delButtonHandler);
  