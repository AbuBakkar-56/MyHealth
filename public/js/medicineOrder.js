document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get('/api/finalv/medicinePurchase');

        if (response.data.status === 'success') {
            const purchases = response.data.data.purchaseDetails;

            const container = document.getElementById('medicine-orders-container');
            if (container) {
                container.innerHTML = purchases.map(purchase => {
                    return `
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">Customer: ${purchase.name}</h5>
                                <p class="card-text">Phone Number: ${purchase.phoneNumber}</p>
                                <p class="card-text">Address: ${purchase.Address}</p>
                                <h6>Medicine Details:</h6>
                                ${purchase.details.map(detail => `
                                    <p class="card-text">Medicine ID: ${detail._id}</p>
                                    <p class="card-text">Medicine Name: ${detail.name}</p>
                                    
                                    <p class="card-text">Delivery Time: ${detail.deliveryTime}</p>
                                    <p class="card-text">Price: ${detail.price}</p>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }).join('');
            }

        } else {
            Toastify({
                text: "Failed to fetch medicine purchases.",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(90deg, #ff5f6d, #ffc371)",
            }).showToast();
        }
    } catch (err) {
        console.error(err);
        Toastify({
            text: "An error occurred while fetching medicine purchases.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: "linear-gradient(90deg, #ff5f6d, #ffc371)",
        }).showToast();
    }
});
