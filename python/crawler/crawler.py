from bs4 import BeautifulSoup
from lxml import html
import xml
import requests
import pyppeteer

url = "https://movie.douban.com/chart"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'}
f = requests.get(url, headers=headers)			# Get该网页从而获得该HTML内容
print(f.status_code)
soup = BeautifulSoup(f.content, 'lxml')		# 用lxml解析器解析该网页的内容， 好像f.txt也是返回的html
# print(f.content.decode())		# 尝试打印出网页内容，看是否获取成功
# content = soup.find_all('div', class_="p12")	# 尝试获取节点，因为class和关键字冲突，所以改名class_

print(soup.title)
print(soup.title.text)

# for k in soup.find_all('div', class_='name'):
# 	print(k.find_all('a').string)
