# -*- mode: ruby -*-
# vi: set ft=ruby :
#
VAGRANTFILE_API_VERSION = "2"

ENV['VAGRANT_DEFAULT_PROVIDER'] ||= 'docker'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  DOCKER_IMAGE_REPO = "mtbvang"
  DOCKER_IMAGE_NAME = "ubuntu-vagrant"
  DOCKER_IMAGE_TAG = "14.04"

  DOCKER_SYNC_FOLDER_HOST = "/home/dev/code"
  DOCKER_SYNC_FOLDERL_GUEST = "/vagrant_data"
  DOCKER_CMD = ["/usr/sbin/sshd", "-D", "-e"]
    
  DOCKER_NAMESPACE_PREFIX = "learn"

  # Create symlinks to access graph files
  config.vm.provision "shell", inline: "mkdir -p /var/lib/puppet/state/graphs && ln -sf /vagrant/build /var/lib/puppet/state/graphs"

  # Boostrap docker containers with shell provisioner.
  config.vm.provision "shell" do |s|
    s.path = "vagrant/bootstrap.sh"
    s.args = "3.7.5-1"
  end

  config.vm.define "dev" do |d|
    d.vm.hostname = "dev.local"
    
    d.vm.provision "shell" do |s|
      s.path = "vagrant/provision.sh"
      s.args = "0.12.2"
    end

    d.vm.provider "docker" do |d|
      d.cmd     = DOCKER_CMD
      d.image   = "#{DOCKER_IMAGE_REPO}/#{DOCKER_IMAGE_NAME}:#{DOCKER_IMAGE_TAG}"
      d.has_ssh = true
      d.privileged = true
      d.name = "#{DOCKER_NAMESPACE_PREFIX}-dev"
    end
  end

end
