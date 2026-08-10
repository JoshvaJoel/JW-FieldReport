document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reportForm');
    const categorySelect = document.getElementById('category');
    const hoursRow = document.getElementById('hoursRow');
    const hoursInput = document.getElementById('hours');
    const submitBtn = document.getElementById('submitBtn');

    // Handle category change to show/hide hours
    categorySelect.addEventListener('change', () => {
        const category = categorySelect.value;
        if (category === 'Auxiliary Pioneer' || category === 'Regular Pioneer') {
            hoursRow.style.display = 'table-row';
            hoursInput.required = true;
        } else {
            hoursRow.style.display = 'none';
            hoursInput.required = false;
            hoursInput.value = ''; // Clear value
        }
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Custom validation check before proceeding
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Get values
        const name = document.getElementById('name').value.trim();
        const category = categorySelect.value;
        const fieldActivity = document.querySelector('input[name="fieldActivity"]:checked')?.value;
        const hours = hoursInput.value.trim();
        const bibleStudies = document.getElementById('bibleStudies').value.trim();
        const remarks = document.getElementById('remarks').value.trim();

        // Build message
        let message = `Field Service Report\n\n`;
        message += `Name: ${name}\n`;
        message += `Category: ${category}\n`;
        message += `Field Activity: ${fieldActivity}\n`;

        if (category === 'Auxiliary Pioneer' || category === 'Regular Pioneer') {
            if (hours !== '') {
                message += `Hours: ${hours}\n`;
            }
        }

        if (bibleStudies !== '') {
            message += `Bible Studies: ${bibleStudies}\n`;
        }

        if (remarks !== '') {
            message += `Remarks: ${remarks}\n`;
        }

        // Encode message
        const encodedMessage = encodeURIComponent(message.trim());

        // Update button state
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Opening WhatsApp...';
        submitBtn.disabled = true;

        // Determine destination
        const urlParams = new URLSearchParams(window.location.search);
        let to = urlParams.get('to');
        
        // Clean up phone number (just in case)
        if (to) {
            to = to.replace(/[^0-9]/g, '');
        }

        let whatsappUrl = '';
        if (to) {
            whatsappUrl = `https://wa.me/${to}?text=${encodedMessage}`;
        } else {
            whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
        }

        // Open WhatsApp
        window.location.href = whatsappUrl;

        // Reset button state after a short delay (in case they navigate back)
        setTimeout(() => {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }, 2000);
    });
});
