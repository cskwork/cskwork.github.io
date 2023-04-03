---
title: "Python-Selenium-Scheduled_Registration"
description: "1 Create Bot2 Write SChedulerhttps&#x3A;//alibaba-cloud.medium.com/data-collection-bot-with-python-and-selenium-ea8fd28d1cf3"
date: 2021-09-04T06:02:48.151Z
tags: []
---

1 Create Bot
```python
pip install selenium

from selenium import webdriver
driver = webdriver.Chrome(insert_webdriver_path_here)
driver.get(insert_target_url_here)
login_link = driver.find_element_by_id(“loginLink”)

login_link.click()
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_condition as EC

username_field = WebDriverWait(driver, 1).until(
    EC.element_to_be_clickable((By.ID, “username”))
)
username.send_keys(insert_username_here)

register_btn = driver.find_element_by_xpath(“//*[id=’mainContent’]/ … /div[1]/small[contains(text(), ‘insert_text_to_match_here’]/../../div[2]/button”)

```

2 Write SCheduler
```python
pip install pywin32
parser.add_argument(‘-t’, type=str, help=’Gym slot starting time in format 00:00’)
python main.py -t 12:30
args = parser.parse_args
time = args.t
python scheduler.py --u tjmontfo --pw ******** --d 05/05/2021 --flr ernie -t 16:00

```


#### Reference
https://tmonty.tech/create-an-automated-web-bot-with-selenium-in-python
