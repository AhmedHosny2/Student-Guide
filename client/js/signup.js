document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(signupForm);
      const formDataObject = {};
      
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
      console.log(formDataObject);
      const apiUrl = 'http://localhost:5001/user/signup'; // Replace with your API URL
      
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObject),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Response from the API:', data);
          // Handle the response data from the API (e.g., show a success message)
        })
        .catch((error) => {
          console.error('Fetch error:', error);
        });
    });
  });
  