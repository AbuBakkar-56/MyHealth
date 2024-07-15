document.addEventListener('DOMContentLoaded', function() {
    const formCreatePrescription = document.getElementById('formCreatePrescription');
  
    formCreatePrescription.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const data = {
        patientName: document.getElementById('patientName').value,
        patientCnic: document.getElementById('patientCnic').value,
        prescription: document.getElementById('prescription').value
      };
  
      axios.post('/api/finalv/prescription', data)
        .then(response => {
          Toastify({
            text: response.data.message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(90deg, #1e3c72, #2a5298)"
          }).showToast();
        })
        .catch(error => {
          Toastify({
            text: `Error: ${error.response.data.message}`,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(90deg, #e52d27, #b31217)"
          }).showToast();
        });
    });
  });
  