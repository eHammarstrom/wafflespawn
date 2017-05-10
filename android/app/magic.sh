#!/bin/bash

KEYSTORE=waffle.jks
ALIAS=waffleStore

keytool -genkey -v -keystore $KEYSTORE -keyalg RSA -keysize 2048 -validity 10000 -alias $ALIAS

keytool -exportcert -list -v -alias $ALIAS -keystore $KEYSTORE
