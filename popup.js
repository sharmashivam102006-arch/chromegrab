// const colorPickerBtn = document.querySelector("#color-picker");
// const clearAll = document.querySelector(".clear-all");
// const colorList = document.querySelector(".all-colors");
// const formatToggle = document.querySelector("#format-toggle");
// const toastContainer = document.querySelector("#toast");

// let pickedColors = [];
// let currentFormat = 'hex'; // default format

// // Initialize extension by fetching saved data
// chrome.storage.local.get(['savedColors', 'savedFormat'], (result) => {
//     pickedColors = result.savedColors || [];
//     currentFormat = result.savedFormat || 'hex';
//     formatToggle.value = currentFormat;
//     showColor();
// });

// // Helper: Convert HEX to RGB
// const hexToRgb = (hex) => {
//     const r = parseInt(hex.slice(1, 3), 16);
//     const g = parseInt(hex.slice(3, 5), 16);
//     const b = parseInt(hex.slice(5, 7), 16);
//     return `rgb(${r}, ${g}, ${b})`;
// };

// // Helper: Convert HEX to HSL
// const hexToHsl = (hex) => {
//     let r = parseInt(hex.slice(1, 3), 16) / 255;
//     let g = parseInt(hex.slice(3, 5), 16) / 255;
//     let b = parseInt(hex.slice(5, 7), 16) / 255;

//     const max = Math.max(r, g, b), min = Math.min(r, g, b);
//     let h, s, l = (max + min) / 2;

//     if (max === min) {
//         h = s = 0; // achromatic
//     } else {
//         const d = max - min;
//         s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
//         switch (max) {
//             case r: h = (g - b) / d + (g < b ? 6 : 0); break;
//             case g: h = (b - r) / d + 2; break;
//             case b: h = (r - g) / d + 4; break;
//         }
//         h /= 6;
//     }
//     return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
// };

// // Format wrapper
// const formatColor = (hex) => {
//     if (currentFormat === 'rgb') return hexToRgb(hex);
//     if (currentFormat === 'hsl') return hexToHsl(hex);
//     return hex.toLowerCase(); // Hex default
// };

// // Display toast notification
// const showToast = (message) => {
//     toastContainer.innerText = message;
//     toastContainer.classList.remove("hidden");
//     setTimeout(() => toastContainer.classList.add("hidden"), 2000);
// };

// // Copy color and trigger toast
// const copyColor = (hexCode) => {
//     const formattedColor = formatColor(hexCode);
//     navigator.clipboard.writeText(formattedColor).then(() => {
//         showToast(`Copied ${formattedColor}`);
//     }).catch(() => {
//         showToast("Failed to copy!");
//     });
// };

// // Render the colors in the UI
// const showColor = () => {
//     if (!pickedColors.length) {
//         document.querySelector(".picked-colors").classList.add("hide");
//         return;
//     }
    
//     colorList.innerHTML = pickedColors.map(color => {
//         const displayValue = formatColor(color);
//         // Truncate long strings (like HSL/RGB) for UI neatness, but copy full value
//         const uiText = displayValue.length > 9 ? displayValue.substring(0, 9) + '...' : displayValue;
        
//         return `
//             <li class="color" data-color="${color}">
//                 <span class="rect" style="background: ${color};"></span>
//                 <span class="value" title="${displayValue}">${uiText}</span>
//             </li>
//         `;
//     }).join("");
    
//     document.querySelector(".picked-colors").classList.remove("hide");

//     // Re-attach listeners dynamically
//     document.querySelectorAll(".color").forEach(li => {
//         li.addEventListener("click", e => {
//             // grab the raw hex from data attribute, not the truncated text
//             copyColor(e.currentTarget.dataset.color); 
//         });
//     });
// };

// // Handle EyeDropper activation
// const activateEyeDropper = async () => {
//     // Hide body temporarily to avoid popup constraints while picking
//     document.body.style.display = "none";
    
//     try {
//         const eyeDropper = new EyeDropper();
//         const { sRGBHex } = await eyeDropper.open();
//         const formatted = formatColor(sRGBHex);
        
//         navigator.clipboard.writeText(formatted);
//         showToast(`Copied ${formatted}`);

//         // Add to front of array, keep max 12 history items to prevent clutter
//         if (!pickedColors.includes(sRGBHex)) {
//             pickedColors.unshift(sRGBHex);
//             if (pickedColors.length > 12) pickedColors.pop();
            
//             chrome.storage.local.set({ savedColors: pickedColors });
//             showColor();
//         }
//     } catch (error) {
//         // User likely canceled the picker
//         console.log("EyeDropper closed or failed.", error);
//     } finally {
//         document.body.style.display = "block";
//     }
// };

// // Clear history
// const clearAllColors = () => {
//     pickedColors = [];
//     chrome.storage.local.set({ savedColors: pickedColors });
//     document.querySelector(".picked-colors").classList.add("hide");
// };

// // Listeners
// clearAll.addEventListener("click", clearAllColors);
// colorPickerBtn.addEventListener("click", activateEyeDropper);

// formatToggle.addEventListener("change", (e) => {
//     currentFormat = e.target.value;
//     chrome.storage.local.set({ savedFormat: currentFormat });
//     showColor(); // Re-render list with new format
// });


const colorPickerBtn = document.querySelector("#color-picker");
const clearAll = document.querySelector(".clear-all");
const colorList = document.querySelector(".all-colors");
const pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");

// Copying the color code to the clipboard and updating the element text
const copyColor = (elem) => {
    const originalText = elem.dataset.color;
    elem.innerText = "COPIED";
    elem.style.color = "#10b981"; // Turn text green temporarily
    
    navigator.clipboard.writeText(originalText);
    
    setTimeout(() => {
        elem.innerText = originalText;
        elem.style.color = ""; // Revert to default CSS color
    }, 1000);
}

const showColor = () => {
    if(!pickedColors.length) return; 
    
    // Simplified the injected HTML to match the new grid-based CSS
    colorList.innerHTML = pickedColors.map(color => `
        <li class="color">
            <span class="rect" style="background: ${color};"></span>
            <span class="value hex" data-color="${color}">${color}</span>
        </li>
    `).join(""); 
    
    document.querySelector(".picked-colors").classList.remove("hide");

    // Add a click event listener to each color element to copy the color code
    document.querySelectorAll(".color").forEach(li => {
        li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild));
    });
}
showColor();

const activateEyeDropper = () => {
    document.body.style.display = "none";
    
    setTimeout(async () => {
        try {
            const eyeDropper = new EyeDropper();
            const { sRGBHex } = await eyeDropper.open();
            navigator.clipboard.writeText(sRGBHex);

            if(!pickedColors.includes(sRGBHex)) {
                pickedColors.push(sRGBHex);
                localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
                showColor();
            }
        } catch (error) {
            console.log("Color selection canceled.");
        }
        document.body.style.display = "block";
    }, 10);
}

const clearAllColors = () => {
    pickedColors.length = 0;
    localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
    document.querySelector(".picked-colors").classList.add("hide");
}

clearAll.addEventListener("click", clearAllColors);
colorPickerBtn.addEventListener("click", activateEyeDropper);