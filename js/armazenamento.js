window.HelpingHandsStorage = (() => {
    const key = 'helpingHands.registration';
    const names = ['fullname', 'birthdate', 'CPF', 'email', 'phonenumber', 'address', 'city', 'state', 'zipcode'];

    function save(form) {
        const data = {};
        names.forEach((name) => { data[name] = form.elements.namedItem(name).value; });
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch {
            return false;
        }
    }

    function restore(form) {
        if (!form) return;
        try {
            const data = JSON.parse(localStorage.getItem(key) || 'null');
            if (!data || typeof data !== 'object' || Array.isArray(data)) return;
            names.forEach((name) => {
                const field = form.elements.namedItem(name);
                if (field && typeof data[name] === 'string') field.value = data[name];
            });
        } catch {
            // Unavailable storage or malformed JSON must not stop SPA navigation.
        }
    }

    return { save, restore };
})();
