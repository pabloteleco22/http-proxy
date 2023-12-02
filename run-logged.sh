#!/bin/bash

trap 'exit 0' SIGINT

log_file=""

if test "$1" != ""; then
    log_file="$1"
else
    log_file="$(date +%Y-%m-%dT%Hh%Mm%Ss).log"
fi

echo $log_file

if test -e "$log_file"; then
    rm "$log_file"
fi

touch "$log_file"

if test -e "$log_file"; then
    log_file="$log_file" bash -c 'npm run start > "$log_file"' &
    tail -f "$log_file"
fi

