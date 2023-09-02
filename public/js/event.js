const eventMoveHandler = async (id, name, date_start, date_end) => {

  if (id && date_start && date_end && name) {
      // Send a POST request to the API endpoint
      const response = await fetch(`/api/activities/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ date_start, date_end, name }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
      } else {
        alert(response.statusText);
      }
    }
};
  
const eventDeleteHandler = async (id) => {
  if (id) {
      // Send a POST request to the API endpoint
      const response = await fetch(`/api/activities/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {

      } else {
        alert(response.statusText+'Failed to delete activity');
      }
    }
};
  
const eventCreateHandler = async (name, date_start, date_end) => {
  if (name && date_start) {
      // Send a POST request to the API endpoint
      const response = await fetch(`/api/activities/`, {
        method: 'POST',
        body: JSON.stringify({name, date_start, date_end }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {

      } else {
        alert(response.statusText+'Failed to create activity');
      }
    }
  };
  

  