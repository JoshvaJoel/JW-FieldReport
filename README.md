# 📖 JW Field Service Report (JW FieldReport)

A fast, mobile-optimized web application designed to help Jehovah's Witnesses effortlessly format and submit monthly Field Service Reports via **WhatsApp**.

*Note: This application is available in both **English** and **Tamil**.*

---

## ✨ Features

- **🌐 Bilingual Support**
  - Seamlessly switch between **English** and **Tamil** interfaces.
  - Automatically translates form labels, placeholders, status roles, and WhatsApp report templates.

- **👥 Multi-Report Queue Builder (Batch Entry)**
  - Submit reports for **individuals, families, or groups**.
  - Tap **"More reports? ➕ Add"** to queue multiple reports into a summary list with **Edit ✏️** and **Remove 🗑️** options.
  - Formats all queued reports into a single structured WhatsApp message.

- **📲 Direct WhatsApp Recipient Pre-filling (`?to=...`)**
  - Add the recipient's phone number with country code to the URL (e.g., `?to=919000000000`) for 1-tap direct sharing to your Group Overseer or Congregation Secretary.

- **🏅 Comprehensive Service Status Options**
  - Supports all service categories: **Publisher**, **Auxiliary Pioneer**, **Regular Pioneer**, **Special Pioneer**, and **Missionary**.
  - Automatically toggles and validates the **Hours** field for Pioneers and Missionaries.

- **📅 Smart Month Selection**
  - Automatically calculates the reporting period (Previous Month pre-selected by default alongside Current Month).

- **⚡ Lightweight & Fast**
  - Built with pure HTML5, CSS3, and Vanilla JavaScript. Zero external dependencies, loading instantly on all mobile devices.

- **🔍 Analytics & SEO**
  - Integrated with **Google Tag Manager** (`gtag.js`) & **Microsoft Clarity**.
  - Includes custom `favicon.ico` and `robots.txt`.

---

## 🚀 How to Use

### 1. Single Report Submission
1. Enter your **Name** and select your **Month**.
2. Select your **Service Status** (e.g., *Publisher*, *Regular Pioneer*).
3. Check the box if you participated in ministry, and enter Bible studies and hours (if applicable).
4. Tap **"Submit via WhatsApp"**. WhatsApp will open with your pre-formatted report ready to send!

### 2. Multi-Report / Family Submission
1. Fill out the details for Person #1.
2. Under comments, tap **`More reports? ➕ Add`**.
3. Person #1 is saved into the **Added Reports** queue below, and the form resets for Person #2 (keeping the selected month).
4. Repeat for additional reports, then tap **"Submit X Reports via WhatsApp"**.

### 3. Direct Sharing Link Setup
Share a pre-configured link so reports are sent directly to your phone number:
```text
https://jw-fieldreport.pages.dev/?to=919000000000
```
*(Replace `919000000000` with your phone number including country code).*

---

## 📱 WhatsApp Message Output Formats

### Single Report Format:
```text
*FIELD SERVICE REPORT*
*Month:* July 2026

*Name:* John Doe
*Service Status:* Regular Pioneer

*Participated in Ministry:* Yes
*Bible Studies:* 2
*Hours:* 50
*Comments:* Went out in field service.
```

### Multi-Report Format:
```text
*FIELD SERVICE REPORT*
*Month:* July 2026

*--- Report 1 ---*
*Name:* John Doe
*Service Status:* Regular Pioneer

*Participated in Ministry:* Yes
*Bible Studies:* 2
*Hours:* 50

*--- Report 2 ---*
*Name:* Jane Doe
*Service Status:* Publisher

*Participated in Ministry:* Yes
*Bible Studies:* 1
```

---

## 📂 Project Structure

```text
JW FieldReport/
├── index.html       # Main HTML structure & layout
├── style.css        # Mobile-first CSS design & animations
├── script.js        # Form validation, i18n dictionary, multi-report queue logic
├── favicon.ico      # Application favicon icon
├── robots.txt       # Web crawler indexing configuration
├── LICENSE          # MIT License file
└── README.md        # Project documentation
```

---

## 🛠️ Local Development & Deployment

1. Clone or download the repository.
2. Open `index.html` directly in any web browser.
3. Deploy to static hosting platforms such as **Cloudflare Pages**, **GitHub Pages**, **Vercel**, or **Netlify**.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

It is intended to support personal and congregation field service reporting.
