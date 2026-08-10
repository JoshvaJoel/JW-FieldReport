document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reportForm');
    const nameInput = document.getElementById('name');
    const nameLabel = document.getElementById('nameLabel');
    const monthSelect = document.getElementById('month');
    const monthLabel = document.getElementById('monthLabel');
    const roleSection = document.getElementById('roleSection');
    const roleTitleLabel = document.getElementById('roleTitleLabel');
    const roleError = document.getElementById('roleError');
    const categoryInput = document.getElementById('category');
    const chipButtons = document.querySelectorAll('.chip-btn');
    const chipPublisher = document.getElementById('chipPublisher');
    const chipAuxiliary = document.getElementById('chipAuxiliary');
    const chipRegular = document.getElementById('chipRegular');
    
    const sharedMinistryCheckbox = document.getElementById('sharedMinistry');
    const rowSharedText = document.getElementById('rowSharedText');
    const bibleStudiesInput = document.getElementById('bibleStudies');
    const rowStudiesText = document.getElementById('rowStudiesText');
    
    const hoursRow = document.getElementById('hoursRow');
    const hoursInput = document.getElementById('hours');
    const rowHoursText = document.getElementById('rowHoursText');
    const hoursBadge = document.getElementById('hoursBadge');
    
    const remarksInput = document.getElementById('remarks');
    const commentsLabel = document.getElementById('commentsLabel');
    
    const formTitle = document.getElementById('formTitle');
    const submitBtn = document.getElementById('submitBtn');
    
    const tipToggleBtn = document.getElementById('tipToggleBtn');
    const tipBtnText = document.getElementById('tipBtnText');
    const tipNoteDesc = document.getElementById('tipNoteDesc');
    const infoNote = document.getElementById('infoNote');
    const langSelect = document.getElementById('langSelect');

    // Translation Dictionary
    const i18n = {
        en: {
            tipBtn: '💡 Tip: Adding recipient number',
            tipText: 'For direct sharing, add the recipient\'s 10-digit WhatsApp number to the link:',
            title: 'FIELD SERVICE REPORT',
            nameLabel: 'Name:',
            namePlaceholder: 'Enter your name',
            monthLabel: 'Month:',
            roleTitle: 'Service Status:',
            roleError: '⚠️ Please select your service status before submitting.',
            roles: {
                'Publisher': 'Publisher',
                'Auxiliary Pioneer': 'Auxiliary Pioneer',
                'Regular Pioneer': 'Regular Pioneer'
            },
            rowShared: 'Check the box if you shared in any form of the ministry during the month',
            rowStudies: 'Number of <em>different</em> Bible studies conducted',
            rowHours: 'Hours (Auxiliary Pioneer or Regular Pioneer)',
            hoursReq: '* Required',
            commentsLabel: 'Comments:',
            commentsPlaceholder: '',
            submitBtn: 'Submit via WhatsApp',
            submitBtnProgress: 'Opening WhatsApp...',
            whatsappTitle: '*FIELD SERVICE REPORT*',
            whatsappMonth: '*Month:*',
            whatsappName: '*Name:*',
            whatsappRole: '*Service Status:*',
            whatsappShared: '*Participated in Ministry:*',
            whatsappStudies: '*Bible Studies:*',
            whatsappHours: '*Hours:*',
            whatsappComments: '*Comments:*',
            yes: 'Yes',
            no: 'No',
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        },
        ta: {
            tipBtn: '💡 குறிப்பு: பெறுநர் எண்ணைச் சேர்க்க',
            tipText: 'நேரடியாகப் பகிர, பெறுநரின் 10 இலக்க WhatsApp எண்ணை இணைப்பில் சேர்க்கவும்:',
            title: 'வெளி ஊழிய அறிக்கை',
            nameLabel: 'பெயர்:',
            namePlaceholder: 'உங்கள் பெயரை உள்ளிடவும்',
            monthLabel: 'மாதம்:',
            roleTitle: 'சேவை நிலை:',
            roleError: '⚠️ சமர்ப்பிக்கும் முன் உங்கள் சேவை நிலையைத் தேர்ந்தெடுக்கவும்.',
            roles: {
                'Publisher': 'பிரஸ்தாபி',
                'Auxiliary Pioneer': 'துணை பயனியர்',
                'Regular Pioneer': 'ஒழுங்கான பயனியர்'
            },
            rowShared: 'இந்த மாதத்தில் ஏதாவது ஒரு விதமான ஊழியத்தில் நீங்கள் கலந்துகொண்டிருந்தால் பெட்டியை டிக் செய்யவும்',
            rowStudies: 'நடத்தப்பட்ட வெவ்வேறு பைபிள் படிப்புகளின் எண்ணிக்கை',
            rowHours: 'மணிநேரங்கள் (துணைப் பயனியர் அல்லது ஒழுங்கான பயனியர்)',
            hoursReq: '* தேவை',
            commentsLabel: 'குறிப்புகள்:',
            commentsPlaceholder: '',
            submitBtn: 'வாட்ஸ்அப் வழியாக அனுப்புக',
            submitBtnProgress: 'WhatsApp திறக்கிறது...',
            whatsappTitle: '*வெளி ஊழிய அறிக்கை*',
            whatsappMonth: '*மாதம்:*',
            whatsappName: '*பெயர்:*',
            whatsappRole: '*சேவை நிலை:*',
            whatsappShared: '*ஊழியத்தில் கலந்துகொண்டீர்களா:*',
            whatsappStudies: '*பைபிள் படிப்புகள்:*',
            whatsappHours: '*மணிநேரங்கள்:*',
            whatsappComments: '*குறிப்புகள்:*',
            yes: 'ஆம்',
            no: 'இல்லை',
            months: ["ஜனவரி", "பிப்ரவரி", "மார்ச்", "ஏப்ரல்", "மே", "ஜூன்", "ஜூலை", "ஆகஸ்ட்", "செப்டம்பர்", "அக்டோபர்", "நவம்பர்", "டிசம்பர்"]
        }
    };

    let currentLang = localStorage.getItem('jw_report_lang') || 'en';
    if (langSelect) {
        langSelect.value = currentLang;
    }

    // 0. Collapsible Tip Toggle
    if (tipToggleBtn && infoNote) {
        tipToggleBtn.addEventListener('click', () => {
            const isHidden = infoNote.style.display === 'none';
            infoNote.style.display = isHidden ? 'block' : 'none';
            tipToggleBtn.classList.toggle('open', isHidden);
        });
    }

    // 1. Month Dropdown Logic
    let selectedMonthOffsetIndex = -1; // Default to previous month (-1)

    function populateMonthDropdown(lang) {
        const langData = i18n[lang];
        const monthNames = langData.months;
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonthIdx = now.getMonth();

        const options = [];
        for (let i = -1; i <= 0; i++) {
            const date = new Date(currentYear, currentMonthIdx + i, 1);
            const monthName = monthNames[date.getMonth()];
            const yearStr = date.getFullYear();
            const label = `${monthName} ${yearStr}`;
            options.push({ offset: i, label: label });
        }

        monthSelect.innerHTML = '';
        options.forEach(opt => {
            const optionElem = document.createElement('option');
            optionElem.value = opt.label;
            optionElem.textContent = opt.label;
            optionElem.dataset.offset = opt.offset;
            if (opt.offset === selectedMonthOffsetIndex) {
                optionElem.selected = true;
            }
            monthSelect.appendChild(optionElem);
        });
    }

    monthSelect.addEventListener('change', () => {
        const selectedOption = monthSelect.options[monthSelect.selectedIndex];
        if (selectedOption && selectedOption.dataset.offset !== undefined) {
            selectedMonthOffsetIndex = parseInt(selectedOption.dataset.offset, 10);
        }
    });

    // 2. Language Switcher Application
    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('jw_report_lang', lang);
        const t = i18n[lang];

        tipBtnText.textContent = t.tipBtn;
        tipNoteDesc.textContent = t.tipText;
        formTitle.textContent = t.title;
        nameLabel.textContent = t.nameLabel;
        nameInput.placeholder = t.namePlaceholder;
        monthLabel.textContent = t.monthLabel;
        
        roleTitleLabel.innerHTML = `${t.roleTitle} <span class="required-star">*</span>`;
        roleError.textContent = t.roleError;
        
        chipPublisher.textContent = t.roles['Publisher'];
        chipAuxiliary.textContent = t.roles['Auxiliary Pioneer'];
        chipRegular.textContent = t.roles['Regular Pioneer'];
        
        rowSharedText.innerHTML = t.rowShared;
        rowStudiesText.innerHTML = t.rowStudies;
        rowHoursText.textContent = t.rowHours;
        hoursBadge.textContent = t.hoursReq;
        
        commentsLabel.textContent = t.commentsLabel;
        remarksInput.placeholder = t.commentsPlaceholder;
        
        if (!submitBtn.disabled) {
            submitBtn.textContent = t.submitBtn;
        }

        populateMonthDropdown(lang);
    }

    langSelect.addEventListener('change', (e) => {
        applyLanguage(e.target.value);
    });

    applyLanguage(currentLang);

    // 3. Load Saved Name from localStorage
    const savedName = localStorage.getItem('jw_report_name');
    if (savedName) {
        nameInput.value = savedName;
    }

    // 4. Handle Role Selection & Hide/Show Submit Button
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

            // SHOW submit button once a role is selected
            submitBtn.style.display = 'block';

            // Show Hours ONLY for Auxiliary Pioneer or Regular Pioneer; Hide for Publisher
            if (selectedRole === 'Auxiliary Pioneer' || selectedRole === 'Regular Pioneer') {
                hoursRow.style.display = 'table-row';
                hoursInput.required = true;
            } else {
                // Publisher
                hoursRow.style.display = 'none';
                hoursInput.required = false;
                hoursInput.value = ''; // Reset value when hidden
            }
        });
    });

    // 5. Form Submission Handling
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const t = i18n[currentLang];
        const name = nameInput.value.trim();
        const selectedRoleKey = categoryInput.value;

        // Check if role is selected (safety check)
        if (!selectedRoleKey) {
            roleSection.classList.add('has-error');
            roleError.style.display = 'block';
            roleSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        // Validate basic native fields
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Save name for convenience
        if (name) {
            localStorage.setItem('jw_report_name', name);
        }

        // Get localized role name
        const roleLocalized = t.roles[selectedRoleKey] || selectedRoleKey;

        // Get values
        const month = monthSelect.value;
        const sharedMinistry = sharedMinistryCheckbox.checked ? t.yes : t.no;
        const bibleStudies = bibleStudiesInput.value.trim();
        const hours = hoursInput.value.trim();
        const remarks = remarksInput.value.trim();

        // Construct formatted report message matching standard template
        let message = `${t.whatsappTitle}\n`;
        message += `${t.whatsappMonth} ${month}\n\n`;
        message += `${t.whatsappName} ${name}\n`;
        message += `${t.whatsappRole} ${roleLocalized}\n\n`;
        message += `${t.whatsappShared} ${sharedMinistry}\n`;

        if (bibleStudies !== '') {
            message += `${t.whatsappStudies} ${bibleStudies}\n`;
        }

        // Include hours only if Pioneer role and hours provided
        if ((selectedRoleKey === 'Auxiliary Pioneer' || selectedRoleKey === 'Regular Pioneer') && hours !== '') {
            message += `${t.whatsappHours} ${hours}\n`;
        }

        if (remarks !== '') {
            message += `${t.whatsappComments} ${remarks}\n`;
        }

        // Encode message for WhatsApp
        const encodedMessage = encodeURIComponent(message.trim());

        // Update button state
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = t.submitBtnProgress;
        submitBtn.disabled = true;

        // Normalize 'to' parameter for WhatsApp URL
        const urlParams = new URLSearchParams(window.location.search);
        let to = urlParams.get('to');
        if (to) {
            // Remove spaces, +, and non-numeric characters
            to = to.replace(/[^0-9]/g, '');
            // If user enters a 10-digit Indian mobile number, prepend '91' automatically
            if (to.length === 10) {
                to = '91' + to;
            }
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
