document.addEventListener('DOMContentLoaded', function() {
    const formGetPrescription = document.getElementById('formGetPrescription');
    const prescriptionDetails = document.getElementById('prescriptionDetails');
  
    formGetPrescription.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const patientCnic = document.getElementById('patientCnicGet').value;
      console.log(patientCnic);
  
      axios.get('/api/finalv/prescription', {
        params: { patientCnic: patientCnic }
      })
      .then(response => {
        const prescription = response.data.data;
        prescriptionDetails.innerHTML = `
          <h3>Prescription for ${prescription.patientName}</h3>
          <p><strong>Patient CNIC:</strong> ${prescription.patientCnic}</p>
          <p><strong>Prescription:</strong> ${prescription.prescription}</p>
        `;
        Toastify({
          text: 'Prescription retrieved successfully',
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(90deg, #1e3c72, #2a5298)"
        }).showToast();
      })
      .catch(error => {
        prescriptionDetails.innerHTML = `<p>Error: ${error.response.data.message}</p>`;
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
  