#!/bin/bash

trap 'exit 0' SIGINT

log_file=""
timestamp="$(date +%Y-%m-%d--%Hh%Mm%Ss)"

if test "$1" != ""; then
    log_file="$1"
else
    log_file="${timestamp}.log"
fi

echo Saving output to file $log_file
echo ""
echo "$timestamp" > "$log_file"

if test -e "$log_file"; then
    log_file="$log_file" bash -c 'npm run start >> "$log_file"' &
    tail -f "$log_file"
fi

