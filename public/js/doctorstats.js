document.addEventListener('DOMContentLoaded', function() {
    // Chart 1
    var ctx1 = document.getElementById('chart1').getContext('2d');
    var chart1 = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Number of Appointments',
          data: [20, 35, 30, 50, 45, 60],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Chart 2
    var ctx2 = document.getElementById('chart2').getContext('2d');
    var chart2 = new Chart(ctx2, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Number of Patients',
          data: [50, 70, 80, 60, 90, 100],
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });