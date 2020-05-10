$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

<<<<<<< HEAD
  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", (event) => {
=======
  // When the form is submitted, we validate there's an email and password
  // entered
  loginForm.on('submit', (event) => {
>>>>>>> d4db0e0b590ea288e57e2066c3ab0b3c1a7f40a0
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }

<<<<<<< HEAD
    // If we have an email and password we run the loginUser function and clear the form
    // eslint-disable-next-line no-use-before-define
=======
    // If we have an email and password we run the loginUser function and clear
    // the form
>>>>>>> d4db0e0b590ea288e57e2066c3ab0b3c1a7f40a0
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
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
    $.post("/api/login", {
      email,
      password,
<<<<<<< HEAD
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch((err) => {
        console.log(err);
      });
=======
    }).then(() => {
      window.location.replace('/members');
    }).catch((err) => {
      console.log(err);
    });
>>>>>>> d4db0e0b590ea288e57e2066c3ab0b3c1a7f40a0
  }
});
