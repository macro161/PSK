#!/bin/bash

curl --silent http://localhost:8080/office/ | python -mjson.tool
