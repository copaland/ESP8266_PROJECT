'use strict';
goog.provide('Blockly.Arduino.esp8266kiki');
goog.require('Blockly.Arduino');
/*
Blockly.Arduino.esp8266kiki_begin = function() {
  var ssid = Blockly.Arduino.valueToCode(this, 'ssid',Blockly.Arduino.ORDER_ATOMIC);
  var password = Blockly.Arduino.valueToCode(this, 'password', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_ESP8266WiFi'] = '#include <ESP8266WiFi.h>';
  Blockly.Arduino.definitions_['var_WiFiClient_wificlient'] = 'WiFiClient wificlient;';
  var code = "WiFi.begin(" + ssid + "," + password +");\n";
  return code;
};
*/
Blockly.Arduino.esp8266kiki_begin = function() {
  var SSID = Blockly.Arduino.valueToCode(this, 'ssid',Blockly.Arduino.ORDER_ATOMIC);
  var PSWD = Blockly.Arduino.valueToCode(this, 'password', Blockly.Arduino.ORDER_ATOMIC);

	Blockly.Arduino.definitions_['define_ESP8266WiFi'] = '#include <ESP8266WiFi.h>';
	Blockly.Arduino.definitions_['define_ESP8266WebServer'] = '#include <ESP8266WebServer.h>';
	Blockly.Arduino.definitions_['var_declare_localip'] = 'IPAddress localIp(192, 168, 4, 1);';
	Blockly.Arduino.definitions_['var_declare_subnet'] = 'IPAddress subnet(255, 255, 255, 0);';
	Blockly.Arduino.definitions_['var_declare_ESP8266Server'] = 'ESP8266WebServer server(8080);\n';
	
  Blockly.Arduino.setups_['setup_wifi_ap'] = 'WiFi.mode(WIFI_AP);\n'
    + '  WiFi.softAPConfig(localIp, localIp, subnet);\n' 
    + '  WiFi.softAP('+SSID+', '+PSWD+');\n'
    + '  Serial.begin(9600);\n'
    + '  server.on("/move", HTTP_GET, handleMoveRequest);\n'
    + '  server.on("/action", HTTP_GET, handleActionRequest);\n'
    + '  server.onNotFound(handleNotFound);\n'
    + '  server.begin();\n'
    + '  Serial.println();\n'
    + '  Serial.println("Local ip: " + WiFi.localIP().toString());\n';
//var code = 'server.handleClient();\n';
//+ '  WiFi.softAP(" + ssid + "," + password +");\n'
  var code = '';
  return code;

};

Blockly.Arduino.esp8266kiki_local_ip = function() {
  Blockly.Arduino.definitions_['define_ESP8266WiFi'] = '#include <ESP8266WiFi.h>';
  var code = "WiFi.localIP()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.esp8266kiki_client_connect_host = function() {
  var PORT = Blockly.Arduino.valueToCode(this, 'PORT',Blockly.Arduino.ORDER_ATOMIC);
  var SERVER = Blockly.Arduino.quote_(this.getFieldValue('HOST'));
  var code='wificlient.connect('+SERVER+','+PORT+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.esp8266kiki_client_connected = function() {
  var code = "wificlient.connected()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.esp8266kiki_client_available = function() {
  var code = "wificlient.available()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.esp8266kiki_client_read = function() {
  var code = "wificlient.read()";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.esp8266kiki_client_print = function() {
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT',Blockly.Arduino.ORDER_ATOMIC)|| '\"\"';
  var code = 'wificlient.print('+TEXT+');\n';
  return code;
};

Blockly.Arduino.esp8266kiki_client_println = function() {
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT',Blockly.Arduino.ORDER_ATOMIC)|| '\"\"';
  var code = 'wificlient.println('+TEXT+');\n';
  return code;
};

Blockly.Arduino.esp8266kiki_server_handleClient = function() {
  var code = "server.handleClient();\n";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/*
Blockly.Arduino.esp8266kiki_motor = function () {
  var PIN1 = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var MOTOR_TYPE = Blockly.Arduino.valueToCode(this, 'MOTOR_TYPE', Blockly.Arduino.ORDER_ATOMIC);
  var PIN_EN = Blockly.Arduino.valueToCode(this, 'PIN_EN', Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var code = 'setMotor'+ MOTOR_TYPE + '(' + PIN1 + ', ' + PIN_EN + ', ' + speed + ');\n';
  Blockly.Arduino.setups_['setup_output_' + PIN1 + '_S'] = 'pinMode(' + PIN1 + ', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_' + PIN_EN + '_D'] = 'pinMode(' + PIN_EN + ', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_' + PIN1 + '_S_W'] = 'digitalWrite(' + PIN1 + ', LOW);';
  Blockly.Arduino.setups_['setup_output_' + PIN_EN + '_D_W'] = 'digitalWrite(' + PIN_EN + ', LOW);';
  var funcName = 'setMotor' + MOTOR_TYPE ;
  var code2 = 'void ' + funcName + '(int dirpin1, int speedpin, int speed) {\n'
  + '  if (speed == 0) {\n'
  + '    digitalWrite(dirpin1, LOW);\n'
  + '    analogWrite(speedpin, 0);\n'
  + '  } else if (speed > 0) {\n'
  + '    digitalWrite(dirpin1, HIGH);\n'
  + '    analogWrite(speedpin, speed);\n'
  + '  } else {\n'
  + '    digitalWrite(dirpin1, LOW);\n'
  + '    analogWrite(speedpin, -speed);\n'
  + '  }\n'
  + '}\n';
  Blockly.Arduino.definitions_[funcName] = code2;
  return code;

};

Blockly.Arduino.esp8266kiki_motor = function () {
  var PIN1 = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var PIN2 = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var PIN_EN = Blockly.Arduino.valueToCode(this, 'PIN_EN', Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var code = 'setMotor(' + PIN1 + ', ' + PIN2 + ', ' + PIN_EN + ', ' + speed + ');\n';
  Blockly.Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_S'] = 'pinMode(' + PIN1 + ', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_D'] = 'pinMode(' + PIN2 + ', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_S_W'] = 'digitalWrite(' + PIN1 + ', LOW);';
  Blockly.Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_D_W'] = 'digitalWrite(' + PIN2 + ', LOW);';
  var funcName = 'setMotor';
  var code2 = 'void ' + funcName + '(int dirpin1, int dirpin2, int speedpin, int speed) {\n'
  + '  digitalWrite(dirpin2,!digitalRead(dirpin1));\n'
  + '  if (speed == 0) {\n'
  + '    digitalWrite(dirpin1, LOW);\n'
  + '    analogWrite(speedpin, 0);\n'
  + '  } else if (speed > 0) {\n'
  + '    digitalWrite(dirpin1, LOW);\n'
  + '    analogWrite(speedpin, speed);\n'
  + '  } else {\n'
  + '    digitalWrite(dirpin1, HIGH);\n'
  + '    analogWrite(speedpin, -speed);\n'
  + '  }\n'
  + '}\n';
  Blockly.Arduino.definitions_[funcName] = code2;
  return code;

};

Blockly.Arduino.esp8266kiki_ap_or_sta = function() {
  var dropdown_mode = this.getFieldValue('mode');
  var value_SSID = Blockly.Arduino.valueToCode(this, 'SSID', Blockly.Arduino.ORDER_ATOMIC);
  var value_PSK = Blockly.Arduino.valueToCode(this, 'PSK', Blockly.Arduino.ORDER_ATOMIC);
  var value_IP = Blockly.Arduino.valueToCode(this, 'IP', Blockly.Arduino.ORDER_ATOMIC);
  var value_SUBNET = Blockly.Arduino.valueToCode(this, 'SUBNET', Blockly.Arduino.ORDER_ATOMIC);
  var value_PORTNUM = Blockly.Arduino.valueToCode(this, 'PORTNUM', Blockly.Arduino.ORDER_ATOMIC);
  value_IP = value_IP.replace(new RegExp(/\./g), ",");
  var board_type = JSFuncs.getPlatform();
  if(board_type.match(RegExp(/ESP8266/)) != null)
    Blockly.Arduino.definitions_['include_ESP8266WiFi'] = '#include <ESP8266WiFi.h>';
  else
    Blockly.Arduino.definitions_['include_WiFi'] = '#include <WiFi.h>';
  Blockly.Arduino.setups_['setup_serial_Serial'] = 'Serial.begin(9600);';
  if(dropdown_mode == 'STA')
  {
    Blockly.Arduino.definitions_['include_ESP8266WebServer'] = '#include <ESP8266WebServer.h>';
    Blockly.Arduino.definitions_['define_STASSID'] = '#define STASSID '+value_SSID+'';
    Blockly.Arduino.definitions_['define_STAPSK'] = '#define STAPSK '+value_PSK+'';
    Blockly.Arduino.definitions_['var_declare_ESP8266ip'] = 'IPAddress ESP8266ip('+value_IP+');';
    Blockly.Arduino.definitions_['var_declare_ESP8266net'] = 'IPAddress ESP8266net('+value_SUBNET+');';   
    Blockly.Arduino.definitions_['var_declare_localPort'] = 'unsigned int localPort = '+value_PORTNUM+';';
    Blockly.Arduino.definitions_['var_declare_incomingPacket'] = 'char incomingPacket[537];';
    Blockly.Arduino.definitions_['var_declare_CMD'] = 'char CMD;';
    Blockly.Arduino.definitions_['var_declare_Http'] = 'ESP8266WebServer server(localPort);';
    Blockly.Arduino.setups_['setup_wifi_sta'] = 'WiFi.mode(WIFI_STA);\n'
    + '  WiFi.begin(STASSID, STAPSK);\n'
    + '  while(WiFi.status() != WL_CONNECTED){\n'
    + '    Serial.print(".");\n'
    + '    delay(200);\n'
    + '  }\n'
    + '  delay(500);\n'
    + '  Serial.print("Connected! IP address: ");\n'
    + '  Serial.println(WiFi.localIP());\n'
    + '  Serial.printf("Web server on port  ", localPort);\n'
    + '  server.on("/move", HTTP_GET, handleMoveRequest);\n'
    + '  server.on("/action", HTTP_GET, handleActionRequest);\n'
    + '  server.onNotFound(handleNotFound);\n'
    + '  server.begin();\n'
  }
  else
  {
    Blockly.Arduino.definitions_['include_ESP8266WebServer'] = '#include <ESP8266WebServer.h>';
    Blockly.Arduino.definitions_['var_declare_AP_NameChar'] = 'const char AP_NameChar[] = '+value_SSID+';';
    Blockly.Arduino.definitions_['var_declare_WiFiAPPSK'] = 'const char WiFiAPPSK[] = '+value_PSK+';';
    Blockly.Arduino.definitions_['var_declare_ESP8266ip'] = 'IPAddress ESP8266ip('+value_IP+');';
    Blockly.Arduino.definitions_['var_declare_ESP8266net'] = 'IPAddress ESP8266net('+value_SUBNET+');';
    Blockly.Arduino.definitions_['var_declare_localPort'] = 'unsigned int localPort = '+value_PORTNUM+';';
    Blockly.Arduino.definitions_['var_declare_incomingPacket'] = 'char incomingPacket[537];';
    Blockly.Arduino.definitions_['var_declare_CMD'] = 'char CMD;';
    Blockly.Arduino.definitions_['var_declare_Udp'] = 'ESP8266WebServer server(localPort);';
    Blockly.Arduino.setups_['setup_wifi_ap'] = 'WiFi.mode(WIFI_AP);\n'
    + '  WiFi.softAPConfig(ESP8266ip, ESP8266ip,ESP8266net);\n' 
    + '  WiFi.softAP(AP_NameChar, WiFiAPPSK);\n'
    + '  server.on("/move", HTTP_GET, handleMoveRequest);\n'
    + '  server.on("/action", HTTP_GET, handleActionRequest);\n'
    + '  server.onNotFound(handleNotFound);\n'
    + '  server.begin();\n'
    + '  Serial.println();\n'
    + '  Serial.println("Started ap. Local ip: " + WiFi.localIP().toString());';
  }
  var code = 'server.handleClient();\n';
  return code;
};
*/