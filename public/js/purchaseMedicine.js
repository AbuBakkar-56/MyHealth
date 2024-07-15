const purchaseMedicine = async (name, phoneNumber, Address, quantity, medicineId) => {
    try {
      const res = await axios({
        method: 'POST',
        url: `http://127.0.0.1:7000/api/finalv/medicine/${medicineId}/purchaseMedicine`,
        data: {
          name,
          phoneNumber,
          Address,
          quantity,
          medicine: medicineId,
        }
      });
  
      if (res.data.status === 'success') {
        Toastify({
          text: "Medicine purchased successfully!",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "center",
          backgroundColor: "linear-gradient(90deg, #1e3c72, #2a5298)",
        }).showToast();
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        Toastify({
          text: `Error: ${res.data.message}`,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "center",
          backgroundColor: "linear-gradient(90deg, #ff5f6d, #ffc371)",
        }).showToast();
      }
    } catch (err) {
      Toastify({
        text: "An unexpected error occurred.",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(90deg, #ff5f6d, #ffc371)",
      }).showToast();
    }
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#btn_purchase_medicine').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const form = btn.closest('form');
        const name = form.querySelector('#customerName').value;
        const phoneNumber = form.querySelector('#phoneNumber').value;
        const Address = form.querySelector('#address').value;
        const quantity = form.querySelector('#quantityInput').value;
        const medicineId = form.querySelector('input[name="medicineId"]').value;
  
        purchaseMedicine(name, phoneNumber, Address, quantity, medicineId);
      });
    });
  });
  