let medicinePrice = 0;

function openModal(medicineId, price) {
    const form = document.getElementById('purchaseMedicineForm');
    const medicineIdField = document.getElementById('medicineId');
    const medicinePriceField = document.getElementById('medicinePrice');
    const quantityInput = document.getElementById('quantityInput');
    const totalPriceElement = document.getElementById('totalPrice');
    const modal = document.getElementById('purchaseModal');

    if (!form || !medicineIdField || !medicinePriceField || !quantityInput || !totalPriceElement || !modal) {
        console.error('One or more elements are missing:', {
            form,
            medicineIdField,
            medicinePriceField,
            quantityInput,
            totalPriceElement,
            modal
        });
        return;
    }

    form.action = `/api/finalv/medicine/${medicineId}/purchaseMedicine`;
    medicineIdField.value = medicineId;
    medicinePriceField.value = price;
    medicinePrice = parseFloat(price); // Update the global medicinePrice variable
    quantityInput.value = 1; // Reset quantity to 1
    totalPriceElement.textContent = medicinePrice.toFixed(2) + ' Rs'; // Reset total price
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('purchaseModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('purchaseModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const quantityInput = document.getElementById('quantityInput');
    const decrementButton = document.getElementById('decrementQuantity');
    const incrementButton = document.getElementById('incrementQuantity');
    const totalPriceElement = document.getElementById('totalPrice');

    if (!quantityInput || !decrementButton || !incrementButton || !totalPriceElement) {
        console.error('One or more elements are missing:', {
            quantityInput,
            decrementButton,
            incrementButton,
            totalPriceElement
        });
        return;
    }

    decrementButton.addEventListener('click', () => {
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
            totalPriceElement.textContent = (medicinePrice * quantityInput.value).toFixed(2) + ' Rs';
        }
    });

    incrementButton.addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
        totalPriceElement.textContent = (medicinePrice * quantityInput.value).toFixed(2) + ' Rs';
    });

    document.getElementById('purchaseMedicineForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const quantity = quantityInput.value;
        const medicineId = e.target.medicineId.value;
        const name = document.getElementById('customerName').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const Address = document.getElementById('address').value;

        // Form validation
        let validationErrors = [];

        // Name validation
        const namePattern = /^[a-zA-Z\s]+$/;
        if (name.length < 3) {
            validationErrors.push("Name must be at least 3 characters long.");
        } else if (!namePattern.test(name)) {
            validationErrors.push("Name can only contain letters and spaces.");
        }

        // Phone number validation
        const phonePattern = /^\d{11}$/;
        if (!phonePattern.test(phoneNumber)) {
            validationErrors.push("Phone number must be exactly 11 digits long and contain only numbers.");
        }

        // Address validation
        if (Address.length < 5) {
            validationErrors.push("Address must be at least 5 characters long.");
        }

        if (validationErrors.length > 0) {
            Toastify({
                text: validationErrors.join(' '),
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(90deg, #ff5f6d, #ffc371)",
            }).showToast();
            return;
        }

        try {
            const res = await axios.post(`/api/finalv/medicine/${medicineId}/purchaseMedicine`, {
                name,
                phoneNumber,
                Address,
                quantity,
                medicine: medicineId,
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
                text: "An error occurred while purchasing medicine.",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(90deg, #ff5f6d, #ffc371)",
            }).showToast();
        }
    });
});