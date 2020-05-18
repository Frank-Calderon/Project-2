$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $('#submit');
  const emailInput = $('input#email-input');
  const passwordInput = $('input#password-input');

  // When the form is submitted, we validate there's an email and password
  // entered
  loginForm.on('click', (event) => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear
    // the form
    loginUser(userData.email, userData.password);
    emailInput.val('');
    passwordInput.val('');
  });

  /**
 * loginUser does a post to our "api/login" route and if successful,
 * redirects us the the members page
 *
 * @param {string} email - The user's login email address
 * @param {string} password - The user's login password
 *
 * @example
 *
 *     loginUser('example@gmail.com(opens in new tab)', secretpassword')
 */
  function loginUser(email, password) {
    $.post('/api/login', {
      email,
      password,
    }).then(() => {
      window.location.replace('/members');
    }).catch((err) => {
      console.log(err);
    });
  }
});
