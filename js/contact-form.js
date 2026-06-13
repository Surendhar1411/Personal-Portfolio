// Ajax Contact Form
$(function () {
  // Get the form.
  var form = $('#contact-form');

  // Get the messages div.
  var formMessages = $('#form-message');

  // Set up an event listener for the contact form.
  $(form).submit(function (e) {
    // Stop the browser from submitting the form.
    e.preventDefault();

    // Get the submit button and store original state.
    var submitBtn = $(form).find('button[type="submit"]');
    var originalBtnContent = submitBtn.html();
    
    // Disable button and show sending state.
    submitBtn.prop('disabled', true).html('<i class="bi bi-hourglass-split"></i> Sending...');

    // Serialize the form data.
    var formData = $(form).serialize();

    // Submit the form using AJAX.
    $.ajax({
      type: 'POST',
      url: $(form).attr('action'),
      data: formData,
      dataType: 'json'
    })
      .done(function (response) {
        // Change button to submitted state.
        submitBtn.html('<i class="bi bi-check-circle-fill"></i> Submitted');

        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass('error').addClass('success').text('Thank you! Your message has been sent successfully.').show();

        // Clear the form fields.
        $('#contact-form input,#contact-form textarea').val('');

        // Wait 3 seconds, then restore the form and hide the success message.
        setTimeout(function () {
          submitBtn.prop('disabled', false).html(originalBtnContent);
          $(formMessages).fadeOut(500, function () {
            $(this).text('').removeClass('success');
          });
        }, 3000);
      })
      .fail(function (data) {
        // Restore button immediately on error.
        submitBtn.prop('disabled', false).html(originalBtnContent);

        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass('success').addClass('error').show();

        // Set the message text.
        if (data.responseJSON && data.responseJSON.message) {
          $(formMessages).text(data.responseJSON.message);
        } else if (data.responseText !== '') {
          $(formMessages).text(data.responseText);
        } else {
          $(formMessages).text(
            'Oops! An error occurred and your message could not be sent.'
          );
        }
      });
  });
});
