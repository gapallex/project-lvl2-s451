[![Build Status](https://travis-ci.org/gapallex/project-lvl2-s451.svg?branch=master)](https://travis-ci.org/gapallex/project-lvl2-s451)
[![Maintainability](https://api.codeclimate.com/v1/badges/3012706339fa1def016e/maintainability)](https://codeclimate.com/github/gapallex/project-lvl2-s451/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3012706339fa1def016e/test_coverage)](https://codeclimate.com/github/gapallex/project-lvl2-s451/test_coverage)

*hexlet project #2*

# gendiff
*Compares two configuration files and shows a difference*

## How to install
    npm install -g gendiff-gapallex

## How to use
    gendiff [option] <firstConfig> <secondConfig>

## Options
    Options:
      -V, --version        output the version number
      -f, --format [type]  Output format. Types: "plain", "json" or (default: "tree")
      -h, --help           output usage information

## API
    import genDiff from 'gendiff-gapallex';
    genDiff(firstFilePath, secondFilePath, format);
*Format: 'tree', 'plain' or 'json'*

### .json
[![asciicast](https://asciinema.org/a/hZlc9WDqp3NHd12bohQnSyGty.svg)](https://asciinema.org/a/hZlc9WDqp3NHd12bohQnSyGty)

### .yml
[![asciicast](https://asciinema.org/a/0bTdINxvTk1JXrqn2Bq63KuzF.svg)](https://asciinema.org/a/0bTdINxvTk1JXrqn2Bq63KuzF)

### .ini
[![asciicast](https://asciinema.org/a/NChEZisrOxouocqKlv5jQPzZF.svg)](https://asciinema.org/a/NChEZisrOxouocqKlv5jQPzZF)

### treeLike
[![asciicast](https://asciinema.org/a/UegBUJMCRAKgZZZSvLRnSIBCa.svg)](https://asciinema.org/a/UegBUJMCRAKgZZZSvLRnSIBCa)

### plainLike 
[![asciicast](https://asciinema.org/a/5i6hgqTagOK4iKmdKURvWDFWw.svg)](https://asciinema.org/a/5i6hgqTagOK4iKmdKURvWDFWw)

### jsonLike
[![asciicast](https://asciinema.org/a/262oJLjvsyBcFb0VVewENIT73.svg)](https://asciinema.org/a/262oJLjvsyBcFb0VVewENIT73)
