Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  # config.vm.provision :shell, path: "bootstrap.sh"
  config.vm.provision "shell", inline: <<-SHELL
  sudo apt-get update
  sudo apt-get install -y build-essential libssl-dev
  curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
  sudo apt-get install -y nodejs
  sudo npm install -y jasmine-node -g
  sudo apt-get install -y mongodb
  sudo mkdir -p /data/db
  sudo apt-get install -y git
  mkdir /home/vagrant/Projects
  cd /home/vagrant/Projects
  sudo mongod &
  SHELL
  config.vm.network :forwarded_port, guest: 3000, host: 3000
  config.vm.network :forwarded_port, guest: 27017, host: 27017
end


