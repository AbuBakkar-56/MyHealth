const registerDoctorApi = async (
    name, Specialization, waitTime, Experience, Services, Education,
    ProfessionalMemberships, About, Fee, AvailabilityDays, availbleSlots,
    Cities, AvailbleHospitals, professionalStatement
) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:7000/api/finalv/doctors',
            data: {
                name,
                Specialization,
                waitTime,
                Experience,
                Services,
                Education,
                ProfessionalMemberships,
                About,
                Fee,
                AvailabilityDays,
                availbleSlots,
                Cities,
                AvailbleHospitals,
                professionalStatement
            }
        });
        if (res.data.status === 'success') {
            Toastify({
                text: "Doctor Created Successfully!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(90deg, #1e3c72, #2a5298)",
            }).showToast();
            setTimeout(() => {
                window.location.reload(true);
            }, 1500);
        }
    } catch (err) {
        console.error('Error:', err);
        Toastify({
            text: `Error: ${err.response.data.message}`,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: "linear-gradient(90deg, #ff5f6d, #ffc371)",
        }).showToast();
    }
}

const formRegDoctor = document.getElementById('form-register-doctor');
console.log(formRegDoctor);

formRegDoctor.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('doctorName').value;
    const Specialization = document.getElementById('doctorSpecialization').value.split(',');
    const waitTime = document.getElementById('doctorWaitTime').value;
    const Experience = document.getElementById('doctorExperience').value;
    const Services = document.getElementById('doctorServices').value.split(',');
    const Education = document.getElementById('doctorEducation').value.split(',');
    const ProfessionalMemberships = document.getElementById('doctorProfessionalMemberships').value.split(',');
    const About = document.getElementById('doctorAbout').value;
    const Fee = document.getElementById('doctorFee').value;
    const AvailabilityDays = document.getElementById('doctorAvailableDays').value.split(',');
    const availbleSlots = document.getElementById('doctorAvailableSlots').value.split(',');
    const Cities = document.getElementById('doctorAvailableCities').value.split(',');
    const AvailbleHospitals = document.getElementById('doctorAvailableHospitals').value.split(',');
    const professionalStatement = document.getElementById('doctorProfessionalStatement').value;

    console.log(
        name, Specialization, waitTime, Experience, Services, Education,
        ProfessionalMemberships, About, Fee, AvailabilityDays, availbleSlots,
        Cities, AvailbleHospitals, professionalStatement
    );

    registerDoctorApi(
        name, Specialization, waitTime, Experience, Services, Education,
        ProfessionalMemberships, About, Fee, AvailabilityDays, availbleSlots,
        Cities, AvailbleHospitals, professionalStatement
    );
});
