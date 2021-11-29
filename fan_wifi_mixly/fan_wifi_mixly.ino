#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

IPAddress localIp(192, 168, 4, 1);
IPAddress subnet(255, 255, 255, 0);
ESP8266WebServer server(8080);

volatile int CMD;
volatile int speed;

void handleNotFound() {
  server.send(404, "text/plain", "404: Not found");
}

void handleActionRequest() {
  if (!server.hasArg("type")) {
    server.send(404, "text/plain", "Action: undefined");
    return;


  }
  String type = server.arg("type");
  if (type.equals("1")) {
    server.send(200, "text/plain", "Action 1");
    speed = 1;

  } else if (type.equals("2")) {
    server.send(200, "text/plain", "Action 2");
    speed = 2;
  } else if (type.equals("3")) {
    server.send(200, "text/plain", "Action 3");
    speed = 3;
  } else if (type.equals("0")) {
    server.send(200, "text/plain", "Action 0");
    speed = 0;
  } else {
    server.send(404, "text/plain", "Undefined");

  }
}

void fan_speed() {
  switch (speed) {
   case 0:
    digitalWrite(16,LOW);
    analogWrite(4,0);
    break;
   case 1:
    digitalWrite(16,HIGH);
    analogWrite(4,400);
    break;
   case 2:
    digitalWrite(16,HIGH);
    analogWrite(4,700);
    break;
   case 3:
    digitalWrite(16,HIGH);
    analogWrite(4,1000);
    break;
  }
}

void handleMoveRequest() {
  if (!server.hasArg("dir")) {
    server.send(404, "text/plain", "Action: undefined");
    return;


  }
  String dir = server.arg("dir");
}

void setup(){
  WiFi.mode(WIFI_AP);
  WiFi.softAPConfig(localIp, localIp, subnet);
  WiFi.softAP("IoT-AP", "12345678");
  Serial.begin(9600);
  server.on("/move", HTTP_GET, handleMoveRequest);
  server.on("/action", HTTP_GET, handleActionRequest);
  server.onNotFound(handleNotFound);
  server.begin();
  Serial.println();
  Serial.println("Local ip: " + WiFi.localIP().toString());

  pinMode(4, OUTPUT);
  pinMode(16, OUTPUT);
  CMD = 'S';
  speed = 0;
  digitalWrite(4,LOW);
  digitalWrite(16,HIGH);
}

void loop(){
  server.handleClient();
  fan_speed();
  delay(1);

}