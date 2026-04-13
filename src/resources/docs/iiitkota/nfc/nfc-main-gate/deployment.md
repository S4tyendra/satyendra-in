# 🛠️ System Deployment Guide

This guide explains how to set up the NFC Gatekeeper system on a fresh Debian 12 (Bookworm) computer. This process is usually performed once by a technician.

## 📋 Prerequisites

Before you begin, ensure you have:
- A computer running **Debian 12**.
- At least one **ACS ACR122U NFC Reader**.
- Internet connection for downloading necessary software.

---


For detailed documentation, read the gude at the repo: https://github.com/S4tyendra/nfc-gatekeeper/

---

## 🏗️ Step 1: Preparing the Operating System

We need to prepare the computer so it doesn't interfere with the NFC readers.

1.  **Blacklist conflicting drivers**: The computer has built-in drivers that try to talk to the NFC reader. We need to disable them so our specialized software can take control.
2.  **Install dependencies**: We need to install several tools like `pcscd` (which talks to the reader), `python3` (which runs our app), and `chromium` (which shows the screen).

```bash
# Example commands (for technicians)
sudo apt update
sudo apt install -y pcscd chromium lightdm
```

## 📂 Step 2: Setting up Data Folders

The system needs a specific place to store its data. We use `/var/lib/iiitk-nfc/` for this.

- **Databases**: Located at `/var/lib/iiitk-nfc/databases/`.
- **Images**: Located at `/var/lib/iiitk-nfc/images/`.

You must ensure that the user running the app has permission to read and write to these folders.

## 🚀 Step 3: Starting the Backend

The backend is a Python application that stays running in the background. It is managed by a "systemd service," which means it starts automatically when the computer turns on.

If you need to restart it manually:
```bash
sudo systemctl restart nfc-gatekeeper
```

## 🖥️ Step 4: Setting up the Kiosk (The Screen)

The system is designed to run as a "Kiosk." This means that when the computer starts, it automatically logs in and opens a full-screen browser showing the entry/exit portal.

- **Auto-login**: Configured in `lightdm`.
- **Auto-start browser**: A special file in `~/.config/autostart/` tells the computer to open Chromium in `--kiosk` mode.

## ✅ Step 5: Final Check

Once everything is set up, you should:
1.  Plug in the NFC readers.
2.  Check the "Admin Config" (cog icon) in the web portal to assign which reader is for **IN** and which is for **OUT**.
3.  Test a card tap to ensure it shows up on the screen.
