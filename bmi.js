var $required = $('.required')
var $height = $('#height');
var $weight = $('#weight');
var mode;

$('input:text').on('input', function () {
  this.setCustomValidity('');
  $('#result').fadeOut();
})

$('input[name="units"]').change(function () {
  $('input:text').val('').trigger('input');

  if ($(this).is(':checked')) {
    mode = $(this).val();

    switch ($(this).val()) {
      case 'metric':
        $height.attr('placeholder', 'Height (cm)');
        $height.attr('pattern', '[0-9]+(?:\.[0-9]*)?');

        $weight.attr('placeholder', 'Weight (kg)');

        break;

      case 'us-imperial':
      case 'uk-imperial':
        $height.attr('placeholder', 'Height (ft\'in")');
        $height.attr('pattern', '([0-9]+)\'(?:([0-9.]+)")?');

        if (mode === 'us-imperial') {
          $weight.attr('placeholder', 'Weight (lbs)');
        } else {
          $weight.attr('placeholder', 'Weight (st)');
        }

        break;
    }
  }
}).change();  // Trigger initial check

$('#calculate').click(function () {
  $required.each(function () {
    if (!$(this).val()) {
      $(this).prop('required', true);
    }
  });
  
  var height = $height.val();
  var weight = parseFloat($weight.val());
  
  if (height <= 0) {
    $height[0].setCustomValidity('Number must be positive');
  }
  
  if (weight <= 0) {
    $weight[0].setCustomValidity('Number must be positive');
  }
  
  if ($height.is(':invalid') || $weight.is(':invalid')) {
    alert('Invalid input!');
    return;
  }
  
  var multiplier;
  
  switch (mode) {
    case 'metric':
      height = parseFloat(height) / 100;
      multiplier = 1;

      break;

    case 'us-imperial':
    case 'uk-imperial':
      var match = new RegExp($height.attr('pattern')).exec(height);
      height = parseInt(match[1])*12;
      if (match[2] != null) {
        height += parseFloat(match[2]);
      }
    
    if (mode === 'us-imperial') {
      multiplier = 703;
    } else {
      multiplier = 703 * 14;
    }
  
    break;
  }  
  
  var bmi = weight*multiplier / height**2;
  
  if (bmi <= 0 || bmi === Infinity || isNaN(bmi)) {
    alert('Something went wrong (BMI is ' + bmi + '). Check the input.');
    return;
  }
  
  if (bmi === Infinity)
  
  var category;
  
  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi < 25.0) {
    category = 'Normal';
  } else if (bmi < 30.0) {
    category = 'Overweight';
  } else if (bmi < 35.0) {
    category = 'Obese Class I';
  } else if (bmi < 40.0) {
    category = 'Obese Class II';
  } else {
    category = 'Obese Class III';
  }
  
  $('#bmi').text(Math.round(bmi * 100) / 100);
  $('#category').text(category).removeClass().addClass('bmi-' + category.toLowerCase().replace(/ /g, '-'));
  $('#result').fadeIn();
});