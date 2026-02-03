# NFC Gatekeeper Documentation

This system is designed to manage and monitor the entry and exit of students and staff at IIIT Kota using NFC technology.

This documentation is written to be accessible to everyone, from technical administrators to non-technical office staff.

## 📖 Navigation

Use the links below to find the information you need:

- **[System Setup & Deployment](/docs/iiitkota/nfc-main-gate/deployment)**: How to install and configure the system on a new machine.
- **[Frequently Asked Questions (FAQ)](/docs/iiitkota/nfc-main-gate/faq)**: Quick answers to common questions and troubleshooting tips.
- **[Adding New Users](/docs/iiitkota/nfc-main-gate/users/adding)**: A step-by-step guide on how to register new students in the database.
- **[Managing Student Photos](/docs/iiitkota/nfc-main-gate/images)**: How to add and update photos for students.
- **[Querying Entry Logs](/docs/iiitkota/nfc-main-gate/querying)**: How to view and download reports on who entered or exited.
- **[Data Locations](/docs/iiitkota/nfc-main-gate/data/finding)**: A map of where all the important files are stored on the system.

## 🚀 System Overview

The NFC Gatekeeper consists of:
1.  **Hardware**: NFC Readers (ACS ACR122U) connected to a computer.
2.  **Software Backend**: A Python-based server that handles card scans and database management.
3.  **Kiosk Interface**: A user-friendly web interface displayed on a monitor for real-time monitoring.

When a card is tapped, the system identifies the user, logs the time, and provides visual and audio feedback.
