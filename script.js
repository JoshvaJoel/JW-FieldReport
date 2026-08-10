document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reportForm');
    const nameInput = document.getElementById('name');
    const monthSelect = document.getElementById('month');
    const roleSection = document.getElementById('roleSection');
    const roleError = document.getElementById('roleError');
    const categoryInput = document.getElementById('category');
    const chipButtons = document.querySelectorAll('.chip-btn');
    const sharedMinistryCheckbox = document.getElementById('sharedMinistry');
    const bibleStudiesInput = document.getElementById('bibleStudies');
    const hoursInput = document.getElementById('hours');
    const hoursBadge = document.getElementById('hoursBadge');
    const remarksInput = document.getElementById('remarks');
    const submitBtn = document.getElementById('submitBtn');

    // 1. Populate Month Dropdown (Defaulting to Previous Month)
    function initializeMonthDropdown() {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonthIdx = now.getMonth();

        // Calculate previous month & year
        let prevMonthIdx = currentMonthIdx - 1;
        let prevYear = currentYear;
        if (prevMonthIdx < 0) {
            prevMonthIdx = 11;
            prevYear -= 1;
        }
        const defaultMonthValue = `${monthNames[prevMonthIdx]} ${prevYear}`;

        // Generate past 6 months to next 3 months
        const options = [];
        for (let i = -6; i <= 3; i++) {
            const date = new Date(currentYear, currentMonthIdx + i, 1);
            const label = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
            options.push(label);
        }

        // Populate select element
        monthSelect.innerHTML = '';
        options.forEach(opt => {
            const optionElem = document.createElement('option');
            optionElem.value = opt;
            optionElem.textContent = opt;
            if (opt === defaultMonthValue) {
                optionElem.selected = true;
            }
            monthSelect.appendChild(optionElem);
        });
    }

    initializeMonthDropdown();

    // 2. Load Saved Name from localStorage
    const savedName = localStorage.getItem('jw_report_name');
    if (savedName) {
        nameInput.value = savedName;
    }

    // 3. Handle Role/Category Chip Selection
    chipButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedRole = btn.getAttribute('data-value');

            // Set active state on chips
            chipButtons.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');

            // Store in hidden input
            categoryInput.value = selectedRole;

            // Clear error state
            roleSection.classList.remove('has-error');
            roleError.style.display = 'none';

            // Update Hours mandatory/optional rules
            if (selectedRole === 'Auxiliary Pioneer' || selectedRole === 'Regular Pioneer') {
                hoursInput.required = true;
                hoursBadge.textContent = '* Required';
                hoursBadge.className = 'req-badge required-mode';
            } else {
                // Publisher
                hoursInput.required = false;
                hoursBadge.textContent = '(Optional)';
                hoursBadge.className = 'req-badge optional-mode';
            }
        });
    });

    // 4. Form Submission Handling
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const selectedRole = categoryInput.value;

        // Check if role is selected
        if (!selectedRole) {
            roleSection.classList.add('has-error');
            roleError.style.display = 'block';
            roleSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        // Validate basic native fields (e.g. Name required, Hours required if pioneer)
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Save name for convenience
        if (name) {
            localStorage.setItem('jw_report_name', name);
        }

        // Get values
        const month = monthSelect.value;
        const sharedMinistry = sharedMinistryCheckbox.checked ? 'Yes' : 'No';
        const bibleStudies = bibleStudiesInput.value.trim();
        const hours = hoursInput.value.trim();
        const remarks = remarksInput.value.trim();

        // Construct formatted report message
        let message = `FIELD SERVICE REPORT\n\n`;
        message += `Name: ${name}\n`;
        message += `Month: ${month}\n`;
        message += `Designation: ${selectedRole}\n\n`;
        message += `Shared in Ministry: ${sharedMinistry}\n`;

        if (bibleStudies !== '') {
            message += `Bible Studies: ${bibleStudies}\n`;
        }

        if (hours !== '') {
            message += `Hours: ${hours}\n`;
        }

        if (remarks !== '') {
            message += `Comments: ${remarks}\n`;
        }

        // Encode message for WhatsApp
        const encodedMessage = encodeURIComponent(message.trim());

        // Update button state
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Opening WhatsApp...';
        submitBtn.disabled = true;

        // Check for 'to' parameter in URL
        const urlParams = new URLSearchParams(window.location.search);
        let to = urlParams.get('to');
        if (to) {
            to = to.replace(/[^0-9]/g, '');
        }

        let whatsappUrl = to 
            ? `https://wa.me/${to}?text=${encodedMessage}` 
            : `https://wa.me/?text=${encodedMessage}`;

        // Redirect to WhatsApp
        window.location.href = whatsappUrl;

        // Re-enable button after delay
        setTimeout(() => {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }, 2500);
    });
});
