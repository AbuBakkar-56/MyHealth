const findDoctorApi = async (doctorId) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/finalv/doctors/${doctorId}`,
            data: {
                doctorId
            }
        });

        if (res.data.status === 'success') {
            const doctor = res.data.data.doctor;
            const doctorInfoDiv = document.getElementById('doctorInfo');
            doctorInfoDiv.innerHTML = `
                <form id="editDoctorForm">
                    <div class="card mt-5">
                        <div class="card-body">
                            <h2 class="mb-3">Edit Doctor</h2>

                            <div class="mb-3">
                                <label for="doctorName">Name</label>
                                <input type="text" class="form-control" id="doctorName" name="name" value="${doctor.name}" required minlength="3" maxlength="25">
                            </div>

                            <div class="mb-3">
                                <label for="doctorSpecialization">Specialization</label>
                                <input type="text" class="form-control" id="doctorSpecialization" name="specialization" value="${doctor.Specialization.join(', ')}" required>
                            </div>

                            <div class="mb-3">
                                <label for="doctorWaitTime">Wait Time</label>
                                <input type="number" class="form-control" id="doctorWaitTime" name="waitTime" value="${doctor.waitTime}" required>
                            </div>

                            <div class="mb-3">
                                <label for="doctorExperience">Experience (years)</label>
                                <input type="number" class="form-control" id="doctorExperience" name="experience" value="${doctor.Expirience}">
                            </div>

                            <div class="mb-3">
                                <label for="doctorServices">Services</label>
                                <input type="text" class="form-control" id="doctorServices" name="services" value="${doctor.Services.join(', ')}" required>
                            </div>

                            <div class="mb-3">
                                <label for="doctorEducation">Education</label>
                                <textarea class="form-control" id="doctorEducation" name="education" required>${doctor.Education.join(', ')}</textarea>
                            </div>

                            <div class="mb-3">
                                <label for="doctorProfessionalMemberships">Professional Memberships</label>
                                <textarea class="form-control" id="doctorProfessionalMemberships" name="professionalMemberships">${doctor.ProfessionalMemberships.join(', ')}</textarea>
                            </div>

                            <div class="mb-3">
                                <label for="doctorAbout">About</label>
                                <textarea class="form-control" id="doctorAbout" name="about" rows="3" required>${doctor.About}</textarea>
                            </div>

                            <div class="mb-3">
                                <label for="doctorFee">Fee</label>
                                <input type="number" class="form-control" id="doctorFee" name="fee" value="${doctor.Fee}" required>
                            </div>

                            <div class="mb-3">
                                <label for="doctorAvailableDays">Availability Days</label>
                                <input type="text" class="form-control" id="doctorAvailableDays" name="availableDays" value="${doctor.AvailabilityDays.join(', ')}" required>
                            </div>

                            <div class="mb-3">
                                <label for="doctorAvailableSlots">Available Slots</label>
                                <input type="text" class="form-control" id="doctorAvailableSlots" name="availableSlots" value="${doctor.availbleSlots.join(', ')}" required>
                            </div>

                            <div class="mb-3">
                                <label for="doctorAvailableCities">Available Cities</label>
                                <input type="text" class="form-control" id="doctorAvailableCities" name="availableCities" value="${doctor.Cities.join(', ')}" required>
                            </div>

                            <div class="mb-3">
                                <label for="doctorAvailableHospitals">Available Hospitals</label>
                                <textarea class="form-control" id="doctorAvailableHospitals" name="availableHospitals" required>${doctor.AvailbleHospitals.join(', ')}</textarea>
                            </div>

                            <div class="mb-3">
                                <label for="doctorProfessionalStatement">Professional Statement</label>
                                <textarea class="form-control" id="doctorProfessionalStatement" name="professionalStatement" required>${doctor.professionalStatement}</textarea>
                            </div>

                            <button type="submit" class="btn btn-primary mt-3">Save Changes</button>
                        </div>
                    </div>
                </form>
            `;

            document.getElementById('editDoctorForm').addEventListener('submit', async function(e) {
                e.preventDefault();
                const updatedDoctor = {
                    name: document.getElementById('doctorName').value,
                    Specialization: document.getElementById('doctorSpecialization').value.split(',').map(item => item.trim()),
                    waitTime: document.getElementById('doctorWaitTime').value,
                    Experience: document.getElementById('doctorExperience').value,
                    Services: document.getElementById('doctorServices').value.split(',').map(item => item.trim()),
                    Education: document.getElementById('doctorEducation').value.split(',').map(item => item.trim()),
                    ProfessionalMemberships: document.getElementById('doctorProfessionalMemberships').value.split(',').map(item => item.trim()),
                    About: document.getElementById('doctorAbout').value,
                    Fee: document.getElementById('doctorFee').value,
                    AvailabilityDays: document.getElementById('doctorAvailableDays').value.split(',').map(item => item.trim()),
                    availbleSlots: document.getElementById('doctorAvailableSlots').value.split(',').map(item => item.trim()),
                    Cities: document.getElementById('doctorAvailableCities').value.split(',').map(item => item.trim()),
                    AvailbleHospitals: document.getElementById('doctorAvailableHospitals').value.split(',').map(item => item.trim()),
                    professionalStatement: document.getElementById('doctorProfessionalStatement').value,
                };

                try {
                    const updateResponse = await axios.patch(`/api/finalv/doctors/${doctor._id}`, updatedDoctor);
                    if (updateResponse.data.status === 'success') {
                        alert('Doctor information updated successfully');
                    } else {
                        alert('Failed to update doctor information');
                    }
                } catch (updateError) {
                    console.error('Error updating doctor:', updateError);
                    alert('Failed to update doctor information');
                }
            });
        } else {
            document.getElementById('doctorInfo').innerHTML = `<p>Doctor not found</p>`;
        }
    } catch (err) {
        console.log(err);
        document.getElementById('doctorInfo').innerHTML = `<p>Server error</p>`;
    }
};

const findDoctorBtn = document.getElementById('enterIdFormBtn');
findDoctorBtn.addEventListener('click', e => {
    e.preventDefault();
    const doctorId = document.getElementById('doctorEnteredInputId').value;
    findDoctorApi(doctorId);
});
