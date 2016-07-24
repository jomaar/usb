# usb
## Test project for the following IoT scenario
* connect one or more digital measurement equipment like a Mitutoyo caliper preferably to a Raspberry Pi or any other USB-enabled hardware
* this hardware runs a simple http webserver
** to select the measuring protocol for the object to be inspected
** and a target server/database to upload the captured data
** on pressing the data button of the measuring equipment captured data will be sent to and stored at the target

## Framework and Infrastructure
* node.js
* USB-API: https://github.com/nonolith/node-usb
