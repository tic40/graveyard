#!/bin/bash

try() {
  input=$(<$1)
  expected=$(<$2)
  resultFile='result'

  if [ -e $resultFile ]; then
    rm result
  fi
  g++ -std=c++14 main.cpp && ./a.out < $1 > $resultFile
  result=$(<$resultFile)
  echo -e "input:\n$input\n"
  if [ "$result" = "$expected" ]; then
    echo -e "result:\n$expected"
  else
    echo -e "$expected expected, but got $result"
    exit 1
  fi
}

try input.txt expected.txt
echo OK!
