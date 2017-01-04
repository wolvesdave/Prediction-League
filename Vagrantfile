Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  # config.vm.provision :shell, path: "bootstrap.sh"
  config.vm.provision "shell", inline: <<-SHELL
  sudo apt-get update
  sudo apt-get install -y build-essential libssl-dev
  curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
  sudo apt-get install -y nodejs
  sudo npm install -y jasmine-node -g
  sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
  echo "deb [ arch=amd64 ] http://repo.mongodb.com/apt/ubuntu trusty/mongodb-enterprise/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-enterprise.list
  sudo apt-get update
  sudo apt-get install -y mongodb-enterprise
  sudo mkdir -p /data/db
  sudo apt-get install -y git
  mkdir /home/vagrant/Projects
  cd /home/vagrant/Projects
  sudo mongod &
  SHELL
  config.vm.network :forwarded_port, guest: 3000, host: 3000
  config.vm.network :forwarded_port, guest: 27017, host: 27017
end
