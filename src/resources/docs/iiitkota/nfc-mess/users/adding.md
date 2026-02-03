# 👤 Adding New Users to the System

To ensure that the system recognizes students and displays their names and photos, they must be added to the internal database.

## 🛠️ Requirements
- Access to the computer running the Gatekeeper.
- A tool to edit SQLite databases (like **DB Browser for SQLite**).

---

## 📝 Step-by-Step Guide

### 1. Locate the Students Database
The main list of students is stored in a file called `students.db`.
- **Location**: `/var/lib/iiitk-nfc/databases/students.db`

### 2. Open the Database
Open `students.db` using your database editing tool. You will see a table named `students`.

### 3. Add a New Row
To add a student, you need to provide two pieces of information:
- **ID**: This is the Student ID (e.g., `2021KUEC2001`). This MUST match exactly what is written on the NFC card.
- **NAME**: The student's full name (e.g., `John Doe`).

### 4. Save Your Changes
In your database tool, make sure to click **Write Changes** or **Save** to ensure the new student is added permanently.

### 5. (Optional) Add a Photo
If you want the student's photo to appear on the screen, follow the [Managing Student Photos](/docs/iiitkota/nfc-main-gate/images) guide.

---

## 💡 Important Notes
- **Case Sensitivity**: Student IDs should generally be in ALL CAPS to avoid confusion.
- **Duplicates**: The system will not allow two students to have the same ID.
- **Card Format**: The Student ID is read from a specific part of the NFC card. If you are issuing new cards, ensure they are programmed correctly.
