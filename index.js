$(document).ready(function() {
  var minAge = 21;

  checkUser();

  $('form').on('click', 'input[type=submit]', function(e) {
    event.preventDefault();
    var inputDate = $('input[type="date"]').val();
    var inputDateFormatted = new Date(inputDate);

    var userAge = getAge(inputDateFormatted);

    var checked = $('#checkbox').is(':checked');

    if (checked == true) {
      saveUser(userAge);
    }

    if (userAge >= 21) {
      gainAccess();
    } else {
      revokeAccess(userAge);
    }
  });

  function checkUser() {
    var userAuth = localStorage.getItem('user_age');

    if (userAuth == undefined || null) return;

    if (userAuth >= minAge) {
      gainAccess();
    } else if (userAuth < minAge) {
      revokeAccess(userAuth);
    }
  }

  function getAge(userBirth) {
    var today = new Date();
    var age = today.getFullYear() - userBirth.getFullYear();
    var month = today.getMonth() - userBirth.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < userBirth.getDate())) {
      age--;
    }
    return age;
  }

  function gainAccess() {
    $('#showText').html(`You're old enough to enjoy a vodka with us.`);
  }

  function revokeAccess(userAge) {
    if (isNaN(userAge)) {
      $('#showText').html(`Please enter a valid date.`);
    } else {
      $('#showText').html(`Come back in ${minAge - userAge} years`);
    }
  }

  function saveUser(userAge) {
    localStorage.setItem('user_age', userAge);
  }
});
