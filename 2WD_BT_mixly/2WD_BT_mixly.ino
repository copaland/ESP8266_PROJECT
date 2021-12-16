/*
Bluetooth controlled 2WD Car 프로젝트
USE ESP-WROOM BOARD 20211122
TB6612 Motor driver

D0  16 LED PULLUP 10K
D1  5 
D2  4 
D3  0 FLASH
D4  2    (SDA
D5  14   (SCL
D6  12 R
D7  13 B
D8  15 G PULLDOWN 10K motor
TX  1
RX  3
*/

#include <ESP8266WiFi.h>
#include <SoftwareSerial.h>

// pin settings
#define LED_PIN    16  //D0 
#define TRIG_PIN    5   //D1 ULTRASONIC
#define ECHO_PIN    4   //D2 

//#define OC1_PIN    0   //D3 NOT USE
//#define OC2_PIN    2   //D4 NOT USE

#define AIN_PIN    14   //D5 TB6612
#define APWM_PIN   12   //D6 
#define BPWM_PIN   13   //D7 
#define BIN_PIN    15   //D8 

#define RXD_PIN   3   //D9 BLUETOOTH TX 
#define TXD_PIN   1   //D10 BLUETOOTH RX

volatile char CMD;
volatile int SPEED;
SoftwareSerial BT(RXD_PIN,TXD_PIN);//3,1

void goBack() {
  analogWrite(APWM_PIN,SPEED);//12
  digitalWrite(AIN_PIN,LOW);
  analogWrite(BPWM_PIN,SPEED);
  digitalWrite(BIN_PIN,LOW);
}

void goFront() {
  analogWrite(APWM_PIN,SPEED);//12
  digitalWrite(AIN_PIN,HIGH);
  analogWrite(BPWM_PIN,SPEED);
  digitalWrite(BIN_PIN,HIGH);
}

void goLeft() {
  analogWrite(APWM_PIN,0);
  digitalWrite(AIN_PIN,HIGH);
  analogWrite(BPWM_PIN,SPEED);
  digitalWrite(BIN_PIN,HIGH);
}

void goRight() {
  analogWrite(APWM_PIN,SPEED);
  digitalWrite(AIN_PIN,HIGH);
  analogWrite(BPWM_PIN,0);
  digitalWrite(BIN_PIN,HIGH);
}

void goSelfLeft() {
  analogWrite(APWM_PIN,SPEED);
  digitalWrite(AIN_PIN,LOW);
  analogWrite(BPWM_PIN,SPEED);
  digitalWrite(BIN_PIN,HIGH);
}

void goSelfRight() {
  analogWrite(APWM_PIN,SPEED);
  digitalWrite(AIN_PIN,HIGH);
  analogWrite(BPWM_PIN,SPEED);
  digitalWrite(BIN_PIN,LOW);
}

void stopBrake() {
  analogWrite(APWM_PIN,0);
  digitalWrite(AIN_PIN,LOW);
  analogWrite(BPWM_PIN,0);
  digitalWrite(BIN_PIN,LOW);
}

void setup(){
  SPEED = 0;
  CMD = 's';//STOP
  pinMode(TRIG_PIN, OUTPUT); //5 d1
  pinMode(AIN_PIN, OUTPUT); //14 d5
  pinMode(BIN_PIN, OUTPUT); //15 d8
  pinMode(APWM_PIN, OUTPUT);//12 d6
  pinMode(BPWM_PIN, OUTPUT);//13 d7
  pinMode(LED_PIN, OUTPUT); //16 d0  
  digitalWrite(AIN_PIN, LOW);
  digitalWrite(BIN_PIN, LOW);
  digitalWrite(APWM_PIN, LOW);
  digitalWrite(BPWM_PIN, LOW); 
  digitalWrite(LED_PIN, LOW);
  BT.begin(9600);
  Serial.begin(9600);
}

void loop(){
  if (BT.available() > 0) {
    CMD = BT.read();
    //Serial.println(CMD);
  }
  switch (CMD) {
   case 'F':
    SPEED = 980;
    goFront();
    break;
   case 'B':
    SPEED = 980;
    goBack();
    break;
   case 'L':
    SPEED = 980;
    goLeft();
    break;
   case 'R':
    SPEED = 980;
    goRight();
    break;
   case 'U':
    SPEED = 980;
    goSelfLeft();
    break;
   case 'V':
    SPEED = 980;
    goSelfRight();
    break;
   case 'S':
    SPEED = 0;
    stopBrake();
    break;
   case 'X':
    digitalWrite(LED_PIN,HIGH);
    break;
   case 'x':
    digitalWrite(LED_PIN,LOW);
    break;
   default:
    SPEED = 0;
    stopBrake();
    break;
  }
  delay(10);

}
