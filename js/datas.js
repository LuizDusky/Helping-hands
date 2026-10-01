// Day.js 1.11.13 and its plugin are loaded before this adapter.
window.HelpingHandsDates = (() => {
    dayjs.extend(dayjs_plugin_customParseFormat);
    function birthDateError(value) {
        const date = dayjs(value, 'YYYY-MM-DD', true);
        if (!date.isValid()) return 'Please enter a valid birth date.';
        if (date.isAfter(dayjs(), 'day')) return 'Birth date cannot be in the future.';
        return '';
    }
    return { birthDateError };
})();
