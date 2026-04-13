# 📂 Finding Data on the System

This page provides a map of where all the important files and folders are located for the NFC Gatekeeper.

## 📍 Root Data Directory
The primary folder for all system data is:
`/var/lib/iiitk-nfc/`

---

## 🗄️ Sub-Directories

### 1. `/var/lib/iiitk-nfc/databases/`
This folder contains all the information recorded by the system.
- **`students.db`**: The master list of all registered students and staff.
- **`in-YYYY-MM.db`**: Monthly records of entries.
- **`out-YYYY-MM.db`**: Monthly records of exits.
- **`logs-YYYY-MM.db`**: Internal system logs and error messages.
- **`reader_config.json`**: Saves which NFC reader is assigned to IN and OUT.

### 2. `/var/lib/iiitk-nfc/images/`
This folder contains student photos.
- Photos must be named `STUDENT_ID.png`.
- **`guest.png`**: The photo shown for the Guest User.

---

## 🛠️ Application Files (For Technicians)
The code that runs the system is located in:
`/opt/nfc-gatekeeper/`

- **`main.py`**: The main backend server.
- **`index.html`**: The user interface code.
- **`config.py`**: System settings and paths.

---

## 📝 Summary for Administrators
If you need to **back up** the system, the most important folder to copy is `/var/lib/iiitk-nfc/`. This contains all your student records, photos, and history.
