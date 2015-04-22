#!/usr/bin/env bash

# Remove leading and trailing whitespace chars.
trim() {
    local var=$@
    var="${var#"${var%%[![:space:]]*}"}"   # remove leading whitespace characters
    var="${var%"${var##*[![:space:]]}"}"   # remove trailing whitespace characters
    echo -n "$var"
}

installNode () {
	
	wget http://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz
	tar -C /usr/local --strip-components 1 -xzf node-v${NODE_VERSION}-linux-x64.tar.gz

}

NODE_VERSION=$(trim ${1:-0.12.2})

installNode