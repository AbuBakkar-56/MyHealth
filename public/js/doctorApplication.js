const applyDoctorApi = async (
    name, email, Specialization, waitTime, Experience, Services, Education,
    About, Fee, AvailabilityDays, availbleSlots, Cities, AvailbleHospitals, professionalStatement
  ) => {
    try {
      const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:7000/api/finalv/doctorapplication',
        data: {
          name,
          email,
          Specialization,
          waitTime,
          Experience,
          Services,
          Education,
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
          text: "Doctor Application Submitted Successfully",
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
      Toastify({
        text: `Error: ${err.response.data.message}`,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(90deg, #ff5f6d, #ffc371)",
      }).showToast();
    }
  };
  
  const formApplyDoctor = document.getElementById('applyDoctorForm');
  if (formApplyDoctor) {
    formApplyDoctor.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('applyDoctorName').value;
      const email = document.getElementById('applyDoctorEmail').value;
      const Specialization = document.getElementById('applyDoctorSpecialization').value.split(',');
      const waitTime = document.getElementById('applyDoctorWaitTime').value;
      const Experience = document.getElementById('applyDoctorExperience').value;
      const Services = document.getElementById('applyDoctorServices').value.split(',');
      const Education = document.getElementById('applyDoctorEducation').value.split(',');
      const About = document.getElementById('applyDoctorAbout').value;
      const Fee = document.getElementById('applyDoctorFee').value;
      const AvailabilityDays = document.getElementById('applyDoctorAvailabilityDays').value.split(',');
      const availbleSlots = document.getElementById('applyDoctorAvailableSlots').value.split(',');
      const Cities = document.getElementById('applyDoctorCities').value.split(',');
      const AvailbleHospitals = document.getElementById('applyDoctorHospitals').value.split(',');
      const professionalStatement = document.getElementById('applyDoctorProfessionalStatement').value;
      console.log(
        name, email, Specialization, waitTime, Experience, Services, Education,
        About, Fee, AvailabilityDays, availbleSlots, Cities, AvailbleHospitals, professionalStatement
      );
      applyDoctorApi(
        name, email, Specialization, waitTime, Experience, Services, Education,
        About, Fee, AvailabilityDays, availbleSlots, Cities, AvailbleHospitals, professionalStatement
      );
    });
  }
  