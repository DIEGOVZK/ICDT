// REF: https://www.w3schools.com/howto/howto_html_include.asp
// Function to import HTML snippets into main HTML file 
function includeHTML() {

    // Helper variables
    var z, i, elmnt, file, xhttp;

    // Loop through a collection of all HTML elements:
    z = document.getElementsByTagName("*");

    // Loop through all HTML elements
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];

        // Search for elements with a certain atrribute:
        file = elmnt.getAttribute("include-html");

        if (file) {

            // Make an HTTP request using the 
            // attribute value as the file name:
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }

                    // Remove the attribute, and call this function once more:
                    elmnt.removeAttribute("include-html");
                    includeHTML();
                }
            }

            // Finish and exit
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}

// Function to be executed after the DOM 
// initialyzes everything on the page,
// and maps all elements
(function (window, document, undefined) {

    window.onload = init;

    function init() {
        document.getElementById("reload-usb").onclick = update_usb_list
        document.getElementById("select-usb").onclick = selected_port
    }

})(window, document, undefined);


// Function to map the serial port via python
// then lists all ports in the select element
function update_usb_list() {

    eel.SerialList()().then(av_usb => {

        // Gets the list element and resets the list
        var usbSelList = document.getElementById("usb_select_list");
        while (usbSelList.options.length > 0) {
            usbSelList.remove(usbSelList.options.length - 1);
        }

        // For each new device scanned in the usb port
        // creates a new option in the USB list element
        av_usb.forEach(element => {

            let text = String(element[0]) + " - " + String(element[1])
            let value = String(element[0])

            let opt = document.createElement('option');
            opt.text = text;
            opt.value = value;
            usbSelList.add(opt, null);

        });

        // If no USB devices are detected
        // Fills the list with "No USB"
        if (av_usb.length == 0) {

            let opt = document.createElement('option');
            opt.text = "No USB";
            opt.value = "No USB";
            usbSelList.add(opt, null);
        }
    });
}

// Function to give python the selected port
function selected_port() {

    // Gets the selected value from the list
    var usbSelList = document.getElementById("usb_select_list");
    let com = String(usbSelList.value)

    // Try starting USB, and redirects if OK
    eel.openSerialPort(com)().then(status => {
        if (status == 1) { window.location.href = "./app.html" }
        else if (status == 0) { window.alert("Unable to open " + com) }
    });
}