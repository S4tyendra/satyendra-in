# 🖼️ Managing Student Photos

The system can display a student's photo when they tap their card. This guide explains how to add and name these photos.

## 📂 Where to Store Photos
All photos must be placed in the following folder on the system:
`/var/lib/iiitk-nfc/images/`

## 🏷️ How to Name Photos
The system uses the **Student ID** to find the correct photo.
- **Naming Rule**: `STUDENT_ID.png`
- **Example**: If the Student ID is `2021KUEC2001`, the photo file must be named `2021KUEC2001.png`.

## 📏 Image Requirements
For the best appearance on the Kiosk screen:
- **Format**: `.png` (Recommended)
- **Shape**: Square (e.g., 200x200 pixels or 400x400 pixels).
- **Size**: Try to keep file sizes small (under 500KB) to ensure they load quickly.

## 🔄 Updating a Photo
To update a student's photo, simply replace the old file in the `images` folder with a new one using the same name. The system will automatically show the new photo the next time the student taps their card.

## 👤 Default Photo
If a student does not have a photo in the folder, the system will show a default "Generic User" icon.
