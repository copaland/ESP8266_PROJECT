'use strict';
goog.provide('Blockly.Blocks.esp8266kiki');
goog.require('Blockly.Blocks');

Blockly.Blocks.esp8266kiki.HUE = 100;

Blockly.Blocks.esp8266kiki_begin = {
  init: function() {
    this.setColour(Blockly.Blocks.esp8266kiki.HUE);
    this.appendValueInput("ssid")
        .appendField(Blockly.MIXLY_ESP8266KIKI_BEGIN)
		.appendField(Blockly.MIXLY_ESP8266KIKI_SSID)
        .setCheck(String);
    this.appendValueInput("password")
        .appendField(Blockly.MIXLY_ESP8266KIKI_PASSWORD)
		.setAlign(Blockly.ALIGN_RIGHT)
        .setCheck(String);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
  }
};

Blockly.Blocks['esp8266kiki_local_ip'] = {
  init: function() {
    this.setColour(Blockly.Blocks.esp8266kiki.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP8266KIKI_LOCALIP);
    this.setOutput(true, 'IPAddress');
  }
};

Blockly.Blocks['esp8266kiki_client_connect_host']={
  init: function() {
    this.setColour(Blockly.Blocks.esp8266kiki.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP8266KIKI_CLINET_CONNECT_HOST)
		.appendField(this.newQuote_(true))
        .appendField(new Blockly.FieldTextInput('mixly.org'), 'HOST')
        .appendField(this.newQuote_(false));
	this.appendValueInput('PORT')
		.setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_ESP8266KIKI_CLINET_PORT);
    this.setOutput(true, Number);
	this.setInputsInline(true);
  },
  newQuote_: function(open) {
    if (open == this.RTL) {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
    } else {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
    }
    return new Blockly.FieldImage(file, 12, 12, '"');
  }
}

Blockly.Blocks['esp8266kiki_client_connected'] = {
  init: function() {
    this.setColour(Blockly.Blocks.esp8266kiki.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP8266KIKI_CLINET_CONNECTED);
    this.setOutput(true, Number);
  }
};

Blockly.Blocks['esp8266kiki_client_available'] = {
  init: function() {
    this.setColour(Blockly.Blocks.esp8266kiki.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP8266KIKI_CLINET_AVAILABLE);
    this.setOutput(true, Number);
  }
};

Blockly.Blocks['esp8266kiki_client_read'] = {
  init: function() {
    this.setColour(Blockly.Blocks.esp8266kiki.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP8266KIKI_CLINET_READ);
    this.setOutput(true, Number);
  }
};

Blockly.Blocks['esp8266kiki_client_print'] = {
  init: function() {
    this.setColour(Blockly.Blocks.esp8266kiki.HUE);
	this.appendValueInput('TEXT')
		.setCheck(String)
        .appendField(Blockly.MIXLY_ESP8266KIKI_CLINET_PRINT);
	this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks['esp8266kiki_client_println'] = {
  init: function() {
    this.setColour(Blockly.Blocks.esp8266kiki.HUE);
	this.appendValueInput('TEXT')
		.setCheck(String)
        .appendField(Blockly.MIXLY_ESP8266KIKI_CLINET_PRINTLN);
	this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.esp8266kiki_server_handleClient = {
  init: function() {
    this.setColour(Blockly.Blocks.esp8266kiki.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP8266KIKI_CLINET_SERVER_HANDLE);
	this.setOutput(false, null);
	this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

/*
//Esp8266kiki_motor
var MOTOR_TYPE = [
["M1", "1"],
["M2", "2"],
["TB6612FNG", "TB6612FNG"]
];
Blockly.Blocks.Esp8266kiki_motor = {
  init: function () {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_ESP8266KIKI_MOTOR)
    .appendField(new Blockly.FieldDropdown(MOTOR_TYPE), "MOTOR_TYPE");
    this.appendDummyInput("")
    this.appendValueInput("PIN1")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_ESP8266KIKI_MOTOR_DIR_PIN+"1");
    //this.appendValueInput("PIN2")
    //.setCheck(Number)
    //.setAlign(Blockly.ALIGN_RIGHT)
    //.appendField(Blockly.MIXLY_ESP8266KIKI_MOTOR_DIR_PIN+"2");
    this.appendValueInput("PIN_EN")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("EN"+Blockly.MIXLY_PIN);
    this.appendValueInput('speed')
    .setCheck(Number)
    .appendField(Blockly.MIXLY_ESP8266KIKI_MOTOR_SPEED);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.esp8266kiki_ap_or_sta = {
  init: function() { 
    this.appendDummyInput()  
    .appendField(new Blockly.FieldImage("../../media/wifi_udp.PNG", 25, 25, "*"))
    .appendField(Blockly.MIXLY_SETUP+" Web Server");
    this.appendDummyInput()  
    .appendField(Blockly.MIXLY_ESP8266KIKI_HTML_MODE+":")
    .appendField(new Blockly.FieldDropdown([["STA","STA"],["AP","AP"]]), "mode");
    this.appendValueInput("SSID")
    .setCheck(String);
    .appendField("WIFI "+Blockly.MIXLY_ESP8266KIKI_HTML_NAME);
    this.appendValueInput("PSK")
    .setCheck(String);
    .appendField("WIFI "+Blockly.MIXLY_ESP8266KIKI_HTML_PASSWORD);
    this.appendValueInput("IP")
    .setCheck(String);
    .appendField(Blockly.MIXLY_esp8266kiki_LINK_DEVICE+" IP");
    this.appendValueInput("SUBNET")
    .setCheck(String);
    .appendField(Blockly.MIXLY_ESP8266KIKI_LINK_DEVICE+" SUBNET");    
    this.appendValueInput("PORTNUM")
    .setCheck(String);
    .appendField(Blockly.MIXLY_ESP8266KIKI_CLINET_PORT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.esp8266kiki.HUE);
    this.setHelpUrl("");
  }
};
*/