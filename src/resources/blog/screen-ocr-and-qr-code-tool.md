---
title: CaptureTextScreen - Screen OCR and QR Code Tool
date: March 31, 2025
slug: screen-ocr-and-qr-code-tool
status: Published
tags: Python, System Optimization, Ubuntu
type: Post
ogDescription: "Automating data capture with Python. How to build a screen-region OCR and QR code scanner for rapid workflow optimization on Linux."
summary: "Automating data capture with Python. How to build a screen-region OCR and QR code scanner for rapid workflow optimization on Linux."

---

This tool allows you to quickly select an area of your screen, extract any text using Optical Character Recognition (OCR), and decode any QR codes found within that area.

Inspired by the convenience of features like Android's "Circle to Search", this script provides a fast way to grab information visually from your screen without needing to manually retype or handle QR codes separately.

It saves the captured image and the extracted text/QR data to a history folder for later reference.

![image.png](/blog-images/screen-ocr-and-qr-code-tool/image.png)

## Features

- Select any rectangular region on your screen.
- Performs OCR (Text Recognition) on the selected image using Tesseract.
- Detects and decodes QR codes within the selected image using ZBar.
- Displays the captured screenshot, OCR text, and QR code data in a simple GUI.
- Saves captures and results to a history folder (`~/.cache/capturetextscreen`).
- Browse past captures via a history sidebar in the GUI.

## Installation (Linux - Debian/Ubuntu based)

Follow these steps to install the necessary dependencies and the script.

**1. System Prerequisites:**

You need several system packages installed first. Open a terminal and run:

```bash
sudo apt update
sudo apt install python3 python3-pip git # Basic Python and Pip
sudo apt install gnome-screenshot        # For taking the screenshot
sudo apt install tesseract-ocr           # The OCR engine
sudo apt install libzbar0                # Library needed for QR code scanning
sudo apt install python3-tk              # Base GUI library (often needed by CustomTkinter)

```

**2. Get the Script:**

Copy the [Python code provided here](https://gist.github.com/S4tyendra/b6a186749c9709164b845fe8f60d42ae#file-screenshot_ocr-py) and save it to a file on your system. A common place is in your home directory or a dedicated scripts folder.

[CaptureTextScreen: Screen OCR and QR Code Tool - quickly select an area of your screen, extract any text using Optical Character Recognition (OCR), and decode any QR codes found within that area.](https://gist.github.com/s4tYeNdRa/b6a186749c9709164b845fe8f60d42ae#file-screenshot_ocr-py)

Example: Save the code as `~/screen_ocr.py`

Make the script executable:

```bash
chmod +x ~/screen_ocr.py
```

**3. Install Python Libraries:**

The script requires several Python libraries. Install them using `pip`:

```bash
pip install Pillow pyzbar pytesseract customtkinter
```

*(Note: If `pip` defaults to Python 2 on your system, you might need to use `pip3` instead).*

## Usage

**1. Running Directly:**

You can run the script directly from your terminal:

```bash
python3 ~/screen_ocr.py
```

*(Adjust the path `~/screen_ocr.py` if you saved the script elsewhere).*

This will immediately trigger the `gnome-screenshot` area selection tool. Select the desired area on your screen. Once selected, the script will process the image and open a window showing the screenshot, the extracted OCR text, and any detected QR codes.

**2. Setting up a Keyboard Shortcut (Recommended):**

For maximum convenience, assign a keyboard shortcut to run the script. The exact steps depend on your Desktop Environment (GNOME, KDE Plasma, XFCE, etc.), but generally involve:

- Opening your system's Keyboard Settings or Custom Shortcuts panel.
- Adding a new custom shortcut.
- Giving it a name (e.g., "Capture Screen Text").
- Setting the **Command** to execute the script using its full path and the correct Python interpreter.

**Important:** You need the *full path* to your Python 3 executable and the *full path* to your script.

- Find your Python 3 path: `which python3` (e.g., `/usr/bin/python3`)
- Find your script's full path (e.g., `/home/your_username/screen_ocr.py`)

Example Command for the shortcut:

```
/usr/bin/python3 /home/your_username/screen_ocr.py
```

**(Remember to replace `/home/your_username/screen_ocr.py` with the actual full path to where you saved the script!)**

- Assigning your desired key combination (e.g., `Ctrl+Shift+C`, `Super+C`, etc.).

Now, whenever you press your chosen keyboard shortcut, the screen area selection will start, followed by the results window.

**3. Using the Results Window:**

- The captured screenshot is shown at the top (resized to fit).
- Extracted text is shown in the "OCR Text" tab.
- Detected QR code data is shown in the "QR Codes" tab.
- The sidebar on the left shows previous captures (History). Click on an entry to load its results.
- Click "Close" or close the window when finished.

**History:**

Captured images and their corresponding text/QR results are stored in:
`~/.cache/capturetextscreen/`

---

> Enjoy 🥳
>