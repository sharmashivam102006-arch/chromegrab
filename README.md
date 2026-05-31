# ChromaGrab

A lightweight Manifest V3 Chrome extension for pixel-perfect color picking, format conversion, and persistent color history.

## Features

* 🎯 Native EyeDropper API color sampling
* 🎨 Instant HEX, RGB, and HSL conversion
* 📋 One-click clipboard copying
* 🕒 Persistent history of the last 12 colors
* ⚡ Fast, dependency-free implementation
* 🔒 Privacy-focused local storage only
* 🧩 Built entirely with Manifest V3

## Files

* `manifest.json` – Extension configuration
* `popup.html` – Extension popup interface
* `popup.css` – Popup styling
* `popup.js` – Color picker and history logic

## Installation

1. Download or clone this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer Mode**.
4. Click **Load unpacked**.
5. Select the ChromaGrab project folder.

## Usage

1. Click the ChromaGrab extension icon.
2. Start the color picker.
3. Select any pixel on a webpage.
4. Copy the generated HEX, RGB, or HSL value.
5. Access previously selected colors from the history panel.

## Privacy

ChromaGrab does not collect, transmit, or store personal data externally. All color history is stored locally within the browser.

## License

MIT License
