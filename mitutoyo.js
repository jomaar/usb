var usb = require("usb");
 
// Gib mir eine Liste alle Mitutoyo-Geräte
var devs = usb.findByIds(4071,16385);

//console.log(usb.getDeviceList());
//console.log(devs);
 
// Gib mir das erste Gerät in der Liste
if (Array.isArray(devs)) {
  var dev = devs[0];
}
else {
  var dev = devs;
}

//console.log(dev);

//console.log(dev.deviceDescriptor);

dev.open();
 
// Gib mir das erste Interface des Geräts
  if (Array.isArray(dev.interfaces)) {
    var int0 = dev.interfaces[0];
  }
  else {
    var int0 = dev.interfaces;
  }
 
// Hier prüfen ob das Device noch irgendwo gebunden ist,
// wenn ja kurz abkoppeln :)
if(int0.isKernelDriverActive()){
   console.log("Releasing driver");
   int0.detachKernelDriver();
}
 
// Das Interface gehört nun meinem Prozess
int0.claim();
 
// Gib mir den Eingabeendpunkt (da kommen die Daten usw)
var int0in = int0.endpoints[0];
 
// Gib mir den Ausgabeendpunkt (darein kommen die Befehle)
// var int0out = int0.endpoints[1];

// Binde das "data"-Event an den Eingabeendpunkt
// Sobald der Controller Daten senden stehen diese in "chunk"
var display = "";

int0in.on("data",function(chunk) {
  
  //console.log(chunk);
  var digit = chunk[2];
  //console.log("chunk[2]: " + digit);
  switch(digit) {
    case 0x56: 
      display = display.concat("-");
      break;
    case 0x62:
      display = display.concat("0");
      break;
    case 0x59:
      display = display.concat("1");
      break;
    case 0x5a:
      display = display.concat("2");
      break;
    case 0x5b:
      display = display.concat("3");
      break;
    case 0x5c:
      display = display.concat("4");
      break;
    case 0x5d:
      display = display.concat("5");
      break;
    case 0x5e:
      display = display.concat("6");
      break;
    case 0x5f:
      display = display.concat("7");
      break;
    case 0x60:
      display = display.concat("8");
      break;
    case 0x61:
      display = display.concat("9");
      break;
    case 0x63:
      display = display.concat(",");
      break;
    case 0x28:
      console.log(display);
      display = "";
      break;
  }
  // console.log("");
});
 
// Starte den Datentransfer für beide Endpunkte
int0in.startPoll(1,16);
//int0out.startStream(2, 32);
 
// Sende den Befehl "alle Leds im Kreis blinken" an den Ausgabeendpunkt
//nt0out.write(new Buffer([0x01,0x03,0x0A]));
