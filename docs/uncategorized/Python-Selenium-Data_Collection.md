---
title: "Python-Selenium-Data_Collection"
description: "1 Create Bothttps&#x3A;//alibaba-cloud.medium.com/data-collection-bot-with-python-and-selenium-ea8fd28d1cf3"
date: 2021-09-04T06:04:24.235Z
tags: []
---

1 Create Bot
```python
from selenium import webdriver
from datetime import datetime
import time
class Bot():
    def __init__(self,crypto):
        self.browser = webdriver.Firefox()
        ### CRYPTO TO SEARCH FOR
        self.crypto = crypto
        self.price = None
        self.cap = None
        self.volume_24h = None
        self.change_24h = None
    
    def get_crypto_data(self):
        self.browser.get("https://www.coinwatch.com/")
        ### FIND SEARCH FORM AND IMPUT KEY WORD
        print("FINDING SEARCH FORM")
        elem = self.browser.find_element_by_xpath("//html/body/div[1]/div/div/div/div/header/section[3]/div/div/div/div[1]/div/input")
        elem.clear()
        elem.click()
        elem.send_keys(self.crypto)
        elem = self.browser.find_element_by_xpath("//html/body/div[1]/div/div/div/div/header/section[3]/div/div/div/div[1]/div/div/button")
        time.sleep(1)
        elem.click()
        ### GET MARKET DATA
        print("GETTING MARKET DATA")
        time.sleep(5)
        self.price = self.browser.find_element_by_xpath("//html/body/div[1]/div/div/div/div/main/div/div/article/div[1]/div/div[3]/div/div/span").text
        self.cap = self.browser.find_element_by_xpath("//html/body/div[1]/div/div/div/div/main/div/div/article/div[2]/div/main/div[1]/section/div[1]/div/div[2]/div/div[1]/span[2]").text
        self.volume_24h = self.browser.find_element_by_xpath("//html/body/div[1]/div/div/div/div/main/div/div/article/div[2]/div/main/div[1]/section/div[1]/div/div[2]/div/div[2]/span[2]").text
        self.change_24h = self.browser.find_element_by_xpath("//html/body/div[1]/div/div/div/div/main/div/div/article/div[2]/div/main/div[1]/section/div[1]/div/div[2]/div/div[8]/span[2]").text
        print("PRINTING MARKET DATA")
        print("PRICE " + str(self.price))
        print("CAP " + str(self.cap))
        print("24H VOLUME " + str(self.volume_24h))
        print("24H CHANGE " + str(self.change_24h))
        self.browser.close()
        return
    
    def write_file(self):
        time_stamp = str(datetime.now())
        save_file = open(self.crypto + "_market.txt","a")
        save_file.write(self.crypto)
        save_file.write("\n" + time_stamp + "\n")
        save_file.write("\nPRICE: " + str(self.price))
        save_file.write("\nCAP: " + str(self.cap))
        save_file.write("\n24H VOLUME: " + str(self.volume_24h))
        save_file.write("\n24H CHANGE: " + str(self.change_24h) + "\n")
        
        
btc_bot = Bot("BTC")
eth_bot = Bot("ETH")
btc_bot.get_crypto_data()
btc_bot.write_file()
eth_bot.get_crypto_data()
eth_bot.write_file()
```


#### Reference
https://alibaba-cloud.medium.com/data-collection-bot-with-python-and-selenium-ea8fd28d1cf3
