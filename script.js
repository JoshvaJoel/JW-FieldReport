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
    const chipSpecial = document.getElementById('chipSpecial');
    const chipMissionary = document.getElementById('chipMissionary');
    
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
    
    const actionGroup = document.getElementById('actionGroup');
    const moreReportsText = document.getElementById('moreReportsText');
    const addReportBtn = document.getElementById('addReportBtn');
    const reportsSummarySection = document.getElementById('reportsSummarySection');
    const summaryTitle = document.getElementById('summaryTitle');
    const summaryCardsList = document.getElementById('summaryCardsList');
    
    const formTitle = document.getElementById('formTitle');
    const submitBtn = document.getElementById('submitBtn');
    
    const tipToggleBtn = document.getElementById('tipToggleBtn');
    const tipBtnText = document.getElementById('tipBtnText');
    const tipNoteDesc = document.getElementById('tipNoteDesc');
    const sampleLinkLabel = document.getElementById('sampleLinkLabel');
    const infoNote = document.getElementById('infoNote');
    const langSelect = document.getElementById('langSelect');
    
    const githubInfoBtn = document.getElementById('githubInfoBtn');
    const githubPopover = document.getElementById('githubPopover');
    const githubInfoDesc = document.getElementById('githubInfoDesc');
    const githubLinkBtn = document.getElementById('githubLinkBtn');

    let reportsList = [];
    let editingIndex = -1;

    // Translation Dictionary
    const i18n = {
        en: {
            tipBtn: '💡 Tip: Adding recipient number',
            tipText: 'For direct sharing, add the recipient\'s WhatsApp number with country code to the link:',
            sampleLink: 'Sample link:',
            githubInfoDesc: 'Check the source code on GitHub:',
            githubClickHere: 'Click Here',
            title: 'FIELD SERVICE REPORT',
            nameLabel: 'Name:',
            namePlaceholder: 'Enter your name',
            monthLabel: 'Month:',
            roleTitle: 'Service Status:',
            roleError: '⚠️ Please select your service status before submitting.',
            roles: {
                'Publisher': 'Publisher',
                'Auxiliary Pioneer': 'Auxiliary Pioneer',
                'Regular Pioneer': 'Regular Pioneer',
                'Special Pioneer': 'Special Pioneer',
                'Missionary': 'Missionary'
            },
            rowShared: 'Check the box if you shared in any form of the ministry during the month',
            rowStudies: 'Number of <em>different</em> Bible studies conducted',
            rowHours: 'Hours (Pioneer or Missionary)',
            hoursReq: '* Required',
            commentsLabel: 'Comments:',
            commentsPlaceholder: '',
            moreReportsQuestion: 'More reports?',
            addBtn: '➕ Add',
            updateBtn: '✓ Update',
            summaryTitleText: 'Added Reports:',
            editBtnText: 'Edit ✏️',
            deleteBtnText: 'Remove 🗑️',
            reportNumHeader: (num) => `*--- Report ${num} ---*`,
            submitBtnSingle: 'Submit via WhatsApp',
            submitBtnMultiFunc: (count) => `Submit ${count} Reports via WhatsApp`,
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
            tipText: 'நேரடியாகப் பகிர, பெறுநரின் நாட்டுக் குறியீட்டுடன் கூடிய WhatsApp எண்ணை இணைப்பில் சேர்க்கவும்:',
            sampleLink: 'மாதிரி இணைப்பு:',
            githubInfoDesc: 'Check the source code on GitHub:',
            githubClickHere: 'Click Here',
            title: 'வெளி ஊழிய அறிக்கை',
            nameLabel: 'பெயர்:',
            namePlaceholder: 'உங்கள் பெயரை உள்ளிடவும்',
            monthLabel: 'மாதம்:',
            roleTitle: 'சேவை நிலை:',
            roleError: '⚠️ சமர்ப்பிக்கும் முன் உங்கள் சேவை நிலையைத் தேர்ந்தெடுக்கவும்.',
            roles: {
                'Publisher': 'பிரஸ்தாபி',
                'Auxiliary Pioneer': 'துணை பயனியர்',
                'Regular Pioneer': 'ஒழுங்கான பயனியர்',
                'Special Pioneer': 'சிறப்பு பயனியர்',
                'Missionary': 'மிஷனரி'
            },
            rowShared: 'இந்த மாதத்தில் ஏதாவது ஒரு விதமான ஊழியத்தில் நீங்கள் கலந்துகொண்டிருந்தால் பெட்டியை டிக் செய்யவும்',
            rowStudies: 'நடத்தப்பட்ட வெவ்வேறு பைபிள் படிப்புகளின் எண்ணிக்கை',
            rowHours: 'மணிநேரங்கள் (பயனியர் அல்லது மிஷனரி)',
            hoursReq: '* தேவை',
            commentsLabel: 'குறிப்புகள்:',
            commentsPlaceholder: '',
            moreReportsQuestion: 'மேலும் அறிக்கைகளா?',
            addBtn: '➕ சேர்',
            updateBtn: '✓ புதுப்பி',
            summaryTitleText: 'சேர்க்கப்பட்ட அறிக்கைகள்:',
            editBtnText: 'திருத்து ✏️',
            deleteBtnText: 'நீக்கு 🗑️',
            reportNumHeader: (num) => `*--- அறிக்கை ${num} ---*`,
            submitBtnSingle: 'வாட்ஸ்அப் வழியாக அனுப்புக',
            submitBtnMultiFunc: (count) => `${count} அறிக்கைகளை வாட்ஸ்அப் வழியாக அனுப்புக`,
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

    // 0. Collapsible Tip Toggle & GitHub Popover Toggle
    if (tipToggleBtn && infoNote) {
        tipToggleBtn.addEventListener('click', () => {
            const isHidden = infoNote.style.display === 'none';
            infoNote.style.display = isHidden ? 'block' : 'none';
            tipToggleBtn.classList.toggle('open', isHidden);
        });
    }

    if (githubInfoBtn && githubPopover) {
        githubInfoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = githubPopover.style.display === 'none';
            githubPopover.style.display = isHidden ? 'block' : 'none';
        });

        document.addEventListener('click', (e) => {
            if (!githubPopover.contains(e.target) && e.target !== githubInfoBtn) {
                githubPopover.style.display = 'none';
            }
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

    // Helper: Escape HTML
    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    // Helper: Reset Form Fields (keep selected month)
    function resetFormFields() {
        nameInput.value = '';
        categoryInput.value = '';
        chipButtons.forEach(c => c.classList.remove('active'));
        sharedMinistryCheckbox.checked = false;
        bibleStudiesInput.value = '';
        hoursInput.value = '';
        hoursRow.style.display = 'none';
        hoursInput.required = false;
        remarksInput.value = '';
        editingIndex = -1;

        const t = i18n[currentLang];
        addReportBtn.textContent = t.addBtn;
        addReportBtn.classList.remove('is-editing');
    }

    // Helper: Render Queued Reports Summary List
    function renderReportsList() {
        const t = i18n[currentLang];
        summaryCardsList.innerHTML = '';

        if (reportsList.length === 0) {
            reportsSummarySection.style.display = 'none';
            if (!submitBtn.disabled) {
                submitBtn.textContent = t.submitBtnSingle;
            }
            return;
        }

        reportsSummarySection.style.display = 'block';
        summaryTitle.textContent = `${t.summaryTitleText} (${reportsList.length})`;

        reportsList.forEach((report, idx) => {
            const card = document.createElement('div');
            card.className = 'report-card';

            let detailsText = `${t.whatsappShared}: ${report.sharedMinistry}`;
            if (report.bibleStudies !== '') {
                detailsText += ` | ${t.whatsappStudies}: ${report.bibleStudies}`;
            }
            if (['Auxiliary Pioneer', 'Regular Pioneer', 'Special Pioneer', 'Missionary'].includes(report.selectedRoleKey) && report.hours !== '') {
                detailsText += ` | ${t.whatsappHours}: ${report.hours}`;
            }
            if (report.remarks !== '') {
                detailsText += ` | ${t.whatsappComments}: ${report.remarks}`;
            }

            card.innerHTML = `
                <div class="report-card-header">
                    <span class="card-name">${escapeHtml(report.name)}</span>
                    <span class="card-role-badge">${escapeHtml(report.roleLocalized)}</span>
                </div>
                <div class="report-card-details">${escapeHtml(detailsText)}</div>
                <div class="card-actions">
                    <button type="button" class="card-action-btn card-btn-edit" data-index="${idx}">${t.editBtnText}</button>
                    <button type="button" class="card-action-btn card-btn-delete" data-index="${idx}">${t.deleteBtnText}</button>
                </div>
            `;
            summaryCardsList.appendChild(card);
        });

        if (!submitBtn.disabled) {
            submitBtn.textContent = t.submitBtnMultiFunc(reportsList.length);
        }
    }

    // 2. Language Switcher Application
    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('jw_report_lang', lang);
        const t = i18n[lang];

        tipBtnText.textContent = t.tipBtn;
        tipNoteDesc.textContent = t.tipText;
        if (sampleLinkLabel) sampleLinkLabel.textContent = t.sampleLink;
        if (githubInfoDesc) githubInfoDesc.textContent = t.githubInfoDesc;
        if (githubLinkBtn) githubLinkBtn.textContent = t.githubClickHere;
        formTitle.textContent = t.title;
        nameLabel.textContent = t.nameLabel;
        nameInput.placeholder = t.namePlaceholder;
        monthLabel.textContent = t.monthLabel;
        
        roleTitleLabel.innerHTML = `${t.roleTitle} <span class="required-star">*</span>`;
        roleError.textContent = t.roleError;
        
        chipPublisher.textContent = t.roles['Publisher'];
        chipAuxiliary.textContent = t.roles['Auxiliary Pioneer'];
        chipRegular.textContent = t.roles['Regular Pioneer'];
        if (chipSpecial) chipSpecial.textContent = t.roles['Special Pioneer'];
        if (chipMissionary) chipMissionary.textContent = t.roles['Missionary'];
        
        rowSharedText.innerHTML = t.rowShared;
        rowStudiesText.innerHTML = t.rowStudies;
        rowHoursText.textContent = t.rowHours;
        hoursBadge.textContent = t.hoursReq;
        
        commentsLabel.textContent = t.commentsLabel;
        remarksInput.placeholder = t.commentsPlaceholder;

        if (moreReportsText) {
            moreReportsText.textContent = t.moreReportsQuestion;
        }
        addReportBtn.textContent = (editingIndex >= 0) ? t.updateBtn : t.addBtn;
        
        populateMonthDropdown(lang);
        renderReportsList();
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

    // 4. Handle Role Selection & Hide/Show Submit Button & Action Group
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

            // SHOW action buttons & submit button once a role is selected
            actionGroup.style.display = 'block';
            submitBtn.style.display = 'block';

            // Show Hours ONLY for Pioneer or Missionary roles; Hide for Publisher
            if (['Auxiliary Pioneer', 'Regular Pioneer', 'Special Pioneer', 'Missionary'].includes(selectedRole)) {
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

    // 5. Add / Update Report to Queue Listener
    addReportBtn.addEventListener('click', () => {
        const t = i18n[currentLang];
        const name = nameInput.value.trim();
        const selectedRoleKey = categoryInput.value;

        if (!name) {
            nameInput.reportValidity();
            nameInput.focus();
            return;
        }

        if (!selectedRoleKey) {
            roleSection.classList.add('has-error');
            roleError.style.display = 'block';
            roleSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const roleLocalized = t.roles[selectedRoleKey] || selectedRoleKey;
        const sharedMinistry = sharedMinistryCheckbox.checked ? t.yes : t.no;
        const bibleStudies = bibleStudiesInput.value.trim();
        const hours = hoursInput.value.trim();
        const remarks = remarksInput.value.trim();

        const reportObj = {
            name: name,
            selectedRoleKey: selectedRoleKey,
            roleLocalized: roleLocalized,
            sharedMinistry: sharedMinistry,
            bibleStudies: bibleStudies,
            hours: hours,
            remarks: remarks
        };

        if (editingIndex >= 0) {
            reportsList[editingIndex] = reportObj;
        } else {
            reportsList.push(reportObj);
        }

        resetFormFields();
        renderReportsList();
    });

    // 6. Summary Cards Edit / Delete Delegate Listener
    summaryCardsList.addEventListener('click', (e) => {
        const target = e.target;
        if (!target.classList.contains('card-action-btn')) return;

        const idx = parseInt(target.getAttribute('data-index'), 10);
        if (isNaN(idx) || idx < 0 || idx >= reportsList.length) return;

        const t = i18n[currentLang];

        if (target.classList.contains('card-btn-edit')) {
            const report = reportsList[idx];
            nameInput.value = report.name;
            categoryInput.value = report.selectedRoleKey;

            chipButtons.forEach(c => {
                c.classList.toggle('active', c.getAttribute('data-value') === report.selectedRoleKey);
            });

            roleSection.classList.remove('has-error');
            roleError.style.display = 'none';

            if (['Auxiliary Pioneer', 'Regular Pioneer', 'Special Pioneer', 'Missionary'].includes(report.selectedRoleKey)) {
                hoursRow.style.display = 'table-row';
                hoursInput.required = true;
            } else {
                hoursRow.style.display = 'none';
                hoursInput.required = false;
            }

            sharedMinistryCheckbox.checked = (report.sharedMinistry === t.yes);
            bibleStudiesInput.value = report.bibleStudies;
            hoursInput.value = report.hours;
            remarksInput.value = report.remarks;

            editingIndex = idx;
            addReportBtn.textContent = t.updateBtn;
            addReportBtn.classList.add('is-editing');

            actionGroup.style.display = 'block';
            submitBtn.style.display = 'block';

            nameInput.focus();
            nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (target.classList.contains('card-btn-delete')) {
            reportsList.splice(idx, 1);
            if (editingIndex === idx) {
                resetFormFields();
            } else if (editingIndex > idx) {
                editingIndex--;
            }
            renderReportsList();
        }
    });

    // 7. Form Submission Handling
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const t = i18n[currentLang];
        const month = monthSelect.value;

        // Auto-add currently filled form if user filled it but didn't tap "Add"
        const currentName = nameInput.value.trim();
        const currentRoleKey = categoryInput.value;

        if (currentName && currentRoleKey) {
            if (form.checkValidity()) {
                const roleLocalized = t.roles[currentRoleKey] || currentRoleKey;
                const sharedMinistry = sharedMinistryCheckbox.checked ? t.yes : t.no;
                const bibleStudies = bibleStudiesInput.value.trim();
                const hours = hoursInput.value.trim();
                const remarks = remarksInput.value.trim();

                const reportObj = {
                    name: currentName,
                    selectedRoleKey: currentRoleKey,
                    roleLocalized: roleLocalized,
                    sharedMinistry: sharedMinistry,
                    bibleStudies: bibleStudies,
                    hours: hours,
                    remarks: remarks
                };

                if (editingIndex >= 0) {
                    reportsList[editingIndex] = reportObj;
                } else {
                    reportsList.push(reportObj);
                }
                resetFormFields();
                renderReportsList();
            } else {
                form.reportValidity();
                return;
            }
        }

        if (reportsList.length === 0) {
            if (!currentRoleKey) {
                roleSection.classList.add('has-error');
                roleError.style.display = 'block';
                roleSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
        }

        // Save last entered name for convenience
        if (reportsList.length > 0) {
            localStorage.setItem('jw_report_name', reportsList[reportsList.length - 1].name);
        }

        // Construct formatted report message
        let message = `${t.whatsappTitle}\n`;
        message += `${t.whatsappMonth} ${month}\n\n`;

        if (reportsList.length === 1) {
            const r = reportsList[0];
            message += `${t.whatsappName} ${r.name}\n`;
            message += `${t.whatsappRole} ${r.roleLocalized}\n\n`;
            message += `${t.whatsappShared} ${r.sharedMinistry}\n`;

            if (r.bibleStudies !== '') {
                message += `${t.whatsappStudies} ${r.bibleStudies}\n`;
            }
            if (['Auxiliary Pioneer', 'Regular Pioneer', 'Special Pioneer', 'Missionary'].includes(r.selectedRoleKey) && r.hours !== '') {
                message += `${t.whatsappHours} ${r.hours}\n`;
            }
            if (r.remarks !== '') {
                message += `${t.whatsappComments} ${r.remarks}\n`;
            }
        } else {
            reportsList.forEach((r, idx) => {
                message += `${t.reportNumHeader(idx + 1)}\n`;
                message += `${t.whatsappName} ${r.name}\n`;
                message += `${t.whatsappRole} ${r.roleLocalized}\n\n`;
                message += `${t.whatsappShared} ${r.sharedMinistry}\n`;

                if (r.bibleStudies !== '') {
                    message += `${t.whatsappStudies} ${r.bibleStudies}\n`;
                }
                if (['Auxiliary Pioneer', 'Regular Pioneer', 'Special Pioneer', 'Missionary'].includes(r.selectedRoleKey) && r.hours !== '') {
                    message += `${t.whatsappHours} ${r.hours}\n`;
                }
                if (r.remarks !== '') {
                    message += `${t.whatsappComments} ${r.remarks}\n`;
                }
                if (idx < reportsList.length - 1) {
                    message += `\n`;
                }
            });
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
