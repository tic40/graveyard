## install pip

```zsh
$ wget https://bootstrap.pypa.io/get-pip.py
$ python get-pip.py
```

## install pyenv

```zsh
$ git clone https://github.com/yyuu/pyenv.git ~/.pyenv
```

### PATH setting for pyenv

add the below to ~/.bash_profile
```zsh
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
```
### reload bashrc
```zsh
$ source ~/.bashrc
```

### install specific python version via pyenv
```zsh
$ pyenv --version
pyenv 1.0.10-24-gacbd736

# show installable version list
$ pyenv install --list
...
  stackless-3.3.5
  stackless-3.4.1
  stackless-3.4.2

# install specific version from the installable version list
$ pyenv install {version}

# set the version as global
$ pyenv global {version}

$ pyenv version
{version} (set by /home/uorat/.pyenv/version)

# make sure the python version
$ python -V
Python {version}
```


## install beautifulsoup4
```zsh
$ pip install beautifulsoup4
```

## make sure to complete installing BeautifulSoup
```zsh
$ python
>>> from bs4 import BeautifulSoup
```

#### completed if no error occurs!
