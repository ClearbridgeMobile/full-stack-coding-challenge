#!/bin/bash
  echo "Please enter root user MySQL password!"
	echo "Note: password will be hidden when typing"
	read -s rootpasswd
	echo "Creating new MySQL database..."
	mysql -uroot -p${rootpasswd} -h'127.0.0.1' < init.sql
	exit