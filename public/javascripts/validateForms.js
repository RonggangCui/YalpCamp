(function () {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".validated-form");

    // Function to validate a single input field
    function validateField(field, regex, validFeedback, invalidFeedback) {
        if (regex.test(field.value)) {
            field.classList.add("is-valid");
            field.classList.remove("is-invalid");
            validFeedback.style.display = "block";
            invalidFeedback.style.display = "none";
        } else {
            field.classList.add("is-invalid");
            field.classList.remove("is-valid");
            validFeedback.style.display = "none";
            invalidFeedback.style.display = "block";
        }
    }

    // Loop over the forms and add event listeners
    Array.from(forms).forEach(function (form) {
        const usernameField = form.querySelector("#username");
        const emailField = form.querySelector("#email");
        const passwordField = form.querySelector("#password");

        const usernameRegex = /^[a-zA-Z0-9]{3,20}$/; // Example: alphanumeric, 3-20 characters
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex pattern
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Example: minimum 8 characters, at least one letter and one number

        // Add input event listeners for real-time validation
        if (usernameField) {
            const usernameValidFeedback = usernameField.nextElementSibling.nextElementSibling;
            const usernameInvalidFeedback = usernameField.nextElementSibling;
            usernameField.addEventListener("input", function () {
                validateField(
                    usernameField,
                    usernameRegex,
                    usernameValidFeedback,
                    usernameInvalidFeedback
                );
            });
        }

        if (emailField) {
            const emailValidFeedback = emailField.nextElementSibling.nextElementSibling;
            const emailInvalidFeedback = emailField.nextElementSibling;
            emailField.addEventListener("input", function () {
                validateField(emailField, emailRegex, emailValidFeedback, emailInvalidFeedback);
            });
        }

        if (passwordField) {
            const passwordValidFeedback = passwordField.nextElementSibling.nextElementSibling;
            const passwordInvalidFeedback = passwordField.nextElementSibling;
            passwordField.addEventListener("input", function () {
                validateField(
                    passwordField,
                    passwordRegex,
                    passwordValidFeedback,
                    passwordInvalidFeedback
                );
            });
        }

        // Add submit event listener for final validation
        form.addEventListener(
            "submit",
            function (event) {
                let valid = true;

                if (usernameField && !usernameRegex.test(usernameField.value)) {
                    valid = false;
                    usernameField.classList.add("is-invalid");
                    usernameField.classList.remove("is-valid");
                }

                if (emailField && !emailRegex.test(emailField.value)) {
                    valid = false;
                    emailField.classList.add("is-invalid");
                    emailField.classList.remove("is-valid");
                }

                if (passwordField && !passwordRegex.test(passwordField.value)) {
                    valid = false;
                    passwordField.classList.add("is-invalid");
                    passwordField.classList.remove("is-valid");
                }

                if (!valid || !form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add("was-validated");
            },
            false
        );
    });
})();
