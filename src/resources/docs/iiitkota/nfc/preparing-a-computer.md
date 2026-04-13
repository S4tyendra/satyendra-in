### Preparing a computer for handling NFC

Read every single line before you click or type anything. Do not skip steps.

#### Phase 1: Prepare the USB Drive
1. Get a empty USB drive that is at least 4GB.
2. Go to the official Debian website and download the **NetInst ISO** (Network Installer). It should be a file ending in `.iso`.
3. Download a tool called **Rufus** (if you are on Windows) or **BalenaEtcher** (if on Mac/Linux).
4. Plug the USB into your computer.
5. Open Rufus or Etcher. Select your USB drive. Select the Debian `.iso` file you just downloaded.
6. Click **Start** or **Flash**. Wait until it is 100% finished. Do not pull the USB out early. 

#### Phase 2: Booting into the Installer
1. Shut down the computer completely. 
2. Turn the computer on and **immediately** start tapping the boot menu key repeatedly like a maniac. This is usually `F12`, `F8`, `F2`, or `Del` depending on the laptop brand. 
3. A menu will appear. Use the arrow keys to select your USB drive and hit **Enter**.
4. The Debian installer menu will show up. Use the arrow keys to highlight **Graphical install** and hit **Enter**.

#### Phase 3: The Setup Screens (Click exactly this)
1. **Language:** Select English. Click Continue.
2. **Location:** Select your country. Click Continue.
3. **Keyboard:** Select American English. Click Continue.
4. **Network:** It might ask you to connect to Wi-Fi. Pick your network and enter the password.
5. **Hostname:** Type `debian`. Click Continue.
6. **Domain name:** Leave this **COMPLETELY BLANK**. Click Continue.

#### Phase 4: Passwords and Users (Crucial Step)
1. **Root Password:** **LEAVE THIS COMPLETELY BLANK.** Do not type a single space. Leaving it blank gives your normal user `sudo` privileges automatically. Click Continue.
2. **Full name for the new user:** Type `nfc`. Click Continue.
3. **Username for your account:** Type `nfc`. Click Continue.
4. **Choose a password for the new user:** Type the password(yes, create a strong password and place here. in this docs, i am using `satya` as example. dont copy paste blindly.).
5. **Re-enter password to verify:** Type `satya`. Click Continue.

#### Phase 5: Wiping the Drive (Point of No Return)
1. **Partitioning method:** Select **Guided - use entire disk**. Click Continue.
2. **Select disk to partition:** Select your main hard drive (it will be the one that is NOT your USB). Click Continue.
3. **Partitioning scheme:** Select **All files in one partition**. Click Continue.
4. Select **Finish partitioning and write changes to disk**. Click Continue.
5. It will ask "Write the changes to disks?". **Select YES.** Click Continue. Your old OS is now dead.

#### Phase 6: Package Manager Setup
1. **Scan extra installation media?** Select **NO**. Click Continue.
2. **Use a network mirror?** Select **YES**. Click Continue.
3. Pick your country, then select `deb.debian.org`. Click Continue.
4. **HTTP proxy:** Leave this **COMPLETELY BLANK**. Click Continue.
5. **Participate in package usage survey?** Select **NO**. Click Continue.

#### Phase 7: Software Selection (Do exactly as told)
1. You will see a list of software with checkboxes. 
2. **UNCHECK** "Debian desktop environment".
3. **UNCHECK** "GNOME", "XFCE", or anything else that might be checked under it.
4. **ONLY LEAVE CHECKED:** "Standard system utilities".
5. Nothing else should be checked. Click Continue. Wait for it to install.

#### Phase 8: Finishing the Base Install
1. **Install the GRUB boot loader to your primary drive?** Select **YES**. Click Continue.
2. **Device for boot loader installation:** Do NOT select "Enter device manually". Select the hard drive listed there (it will look like `/dev/sda` or `/dev/nvme0n1`). Click Continue.
3. When it says "Installation complete", **unplug the USB drive from the computer.**
4. Click Continue to reboot.

#### Phase 9: Installing the GUI (LightDM)
1. The computer will turn on and stop at a completely black screen with white text that says `debian login:`. Do not panic.
2. Type `nfc` and hit Enter.
3. It will ask for `Password:`. Type `satya`. **WARNING: It will not show asterisks (*) or dots while you type.** The screen will look like nothing is happening. Just type `satya` and hit Enter.
4. You are now logged in to the terminal. Type exactly this command and hit Enter:
   `sudo apt update`
5. It will ask for your password again. Type `satya` (again, no dots will show) and hit Enter. Wait for it to finish downloading the lists.
6. Type exactly this command and hit Enter:
   `sudo apt install lightdm xfce4 -y`
7. Text will start flying on the screen. Let it run.
8. If a screen pops up asking you to choose a "Default display manager", use the arrow keys to highlight `lightdm` and hit Enter.
9. When the text completely stops and you see the `nfc@debian:~$` prompt again, type this and hit Enter:
   `sudo reboot`

#### Phase 10: You are done
The computer will restart. Instead of a black screen, you will now see the LightDM graphical login screen. Type `satya` to log in. You now have a clean Debian system. 

Now, go to https://github.com/s4tyendra/nfc-gatekeeper and follow the instructions in readme to install the drivers and start the reader system.