// Delegation keeps form listeners active when SPA templates replace the content.
window.HelpingHandsEvents = (() => {
    function validate(field) {
        field.setCustomValidity('');
        if (field.required && field.type === 'text' && !field.value.trim()) {
            field.setCustomValidity('Please enter a value, not only spaces.');
        }
        if (field.name === 'birthdate') {
            field.setCustomValidity(field.value ? HelpingHandsDates.birthDateError(field.value) : '');
        }
        const valid = field.checkValidity();
        let message = document.getElementById(`${field.id}-error`);
        if (!message) {
            message = document.createElement('small');
            message.id = `${field.id}-error`;
            message.className = 'field-error';
            field.insertAdjacentElement('afterend', message);
            field.setAttribute('aria-describedby', message.id);
        }
        message.textContent = valid ? '' : field.validationMessage;
        field.classList.toggle('is-invalid', !valid);
        field.setAttribute('aria-invalid', String(!valid));
        return valid;
    }

    function feedback(form, message, success) {
        let status = form.querySelector('.form-feedback');
        if (!status) {
            status = document.createElement('p');
            status.className = 'form-feedback';
            status.setAttribute('role', 'status');
            form.append(status);
        }
        status.textContent = message;
        status.classList.toggle('feedback-success', success);
    }

    function start() {
        document.addEventListener('input', (event) => {
            const field = event.target;
            if (!field.matches('#registration-form input:not([type="submit"])')) return;
            validate(field);
            const status = field.form.querySelector('.form-feedback');
            if (status) status.textContent = '';
        });

        document.addEventListener('submit', (event) => {
            const form = event.target;
            if (form.id !== 'registration-form') return;
            event.preventDefault();
            const fields = [...form.querySelectorAll('input:not([type="submit"])')];
            const results = fields.map(validate);
            if (results.includes(false)) {
                feedback(form, 'Please correct the highlighted fields.', false);
                fields[results.indexOf(false)].focus();
                return;
            }
            const saved = HelpingHandsStorage.save(form);
            feedback(form, saved ? 'Registration saved in this browser.' : 'Unable to save registration in this browser. Please try again.', saved);
        });

        document.addEventListener('change', (event) => {
            if (event.target.id === 'menu-toggle') {
                document.querySelector('.menu-icon').setAttribute('aria-expanded', String(event.target.checked));
            }
        });
    }
    return { start };
})();
