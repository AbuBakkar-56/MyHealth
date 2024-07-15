document.addEventListener('DOMContentLoaded', function() {
    const formAddMedicine = document.getElementById('formAddMedicine');
  
    formAddMedicine.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const data = {
        name: document.getElementById('medicineName').value,
        description: document.getElementById('medicineDescription').value,
        deliveryTime: document.getElementById('medicineDeliveryTime').value,
        price: document.getElementById('medicinePrice').value
      };
  
      axios.post('/api/finalv/medicine', data)
        .then(response => {
          Toastify({
            text: 'Medicine added successfully',
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
  