# ❓ Frequently Asked Questions (FAQ)

This page contains answers to common questions about using and troubleshooting the NFC Gatekeeper system.

---

### 1. What should I do if a card is not being scanned?
If you tap a card and nothing happens (no beep, no change on the screen):
- **Check the Reader**: Ensure the NFC reader's light is on (usually green or blue).
- **Check the Connection**: Make sure the USB cable is firmly plugged into the computer.
- **Restart the Service**: If the reader is fine but the app isn't responding, a technician may need to restart the backend service (see the [Deployment Guide](/docs/iiitkota/nfc-mess/deployment)).
- **Wait a Moment**: The system has a 3-second "cooldown" to prevent accidental double-scans. Wait a few seconds and try again.

### 2. The screen says "Student not found". What does this mean?
This means the card was successfully read, but the Student ID on the card does not exist in our main list.
- **Action**: You may need to add this student to the database. Follow the [Adding Users](/docs/iiitkota/nfc-mess/users/adding) guide.

### 3. How do I change which reader is "IN" and which is "OUT"?
1. Click the **⚙️ Admin Config** button at the bottom right of the screen.
2. Select the correct reader for the "IN Reader" and "OUT Reader" dropdowns.
3. The system will save these settings automatically.

### 4. Why is the "Guest User" appearing?
The Student ID `IIITKOTAUSER` is reserved for guests. If this card is tapped, it will show up as "Guest User" on the screen.

### 5. How do I record an entry if someone forgot their card?
Use the **Manual Authentication Form** in the center of the screen:
1. Select the student's **Year** and **Department**.
2. Type in their **Roll Number**.
3. Click **Log IN** or **Log OUT**.
Note: This will only work if the student is already in the database.

### 6. Where can I see the logs from yesterday?
The system creates new log files every month. To view historical data, you need to access the database files in the [Data Folder](/docs/iiitkota/nfc-mess/data/finding).
