#!/bin/bash

env_file=.env


ask() {
	echo ""
	echo "${@:2}"
	read -r -p "$1=" response
	echo "$1='$response'" >> $env_file
}

randomize() {
	rand=`openssl rand -hex 20`
	echo "$1='$rand'" >> $env_file
}

setup() {
	echo "" > $env_file
	ask CAMPUS_ID What is your CAMPUS_ID on the intranet?
	ask FT_UID What is your API client_id for this app?
	ask FT_SECRET What is your API secret for this app?
	echo "POSTGRES_DB='keychain'" >> $env_file
	echo "POSTGRES_USER='keychain'" >> $env_file
	randomize POSTGRES_PASSWORD
	randomize SECRET
	ask NEXTAUTH_URL "What will be the URL of the website e.g: https://keychain.hive.fi (in dev: http://localhost:4001)"
	randomize NEXTAUTH_SECRET
	echo ""
	echo "Thank you! your $env_file is now setup"
}


if [ -f "$env_file" ]; then
	read -r -p "Starting the install.sh will erase your current .env file. Are you sure you want to continue? [y/N] " response

	if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]
	then
		setup
	else
		exit 0;
	fi
fi

