#!/usr/bin/env bash

cp /vagrant/vagrant/git-completion.bash /etc/bash_completion.d
cp /vagrant/vagrant/.bashrc ~/
cp /vagrant/vagrant/bash_completion /etc/bash_completions
cp /vagrant/vagrant/bash_completion_usr /usr/share/bash-completion/bash_completion
cp /vagrant/vagrant/.bash_aliases ~/