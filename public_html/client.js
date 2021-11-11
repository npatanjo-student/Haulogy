function addAppointment() {
  let f = $('#firstName').val();
  let l = $('#lastName').val();
  let e = $('#email').val();
  let n = $('#number').val();
  console.log(f);
  let appointment = {firstName : f, lastName : l, email : e, phoneNumber : n}
  let appointmentStr = JSON.stringify(appointment);
  $.ajax({
    url: '/add/',
    data:{appointment: appointmentStr},
    method:'POST',
    success: function(result) {
      alert('Appointment Added');
    }
  });


}
