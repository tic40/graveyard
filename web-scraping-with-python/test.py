from urllib.request import urlopen
from bs4 import BeautifulSoup

#url = "http://www.pythonscraping.com/pages/page3.html"
url = "https://www.hackerrank.com/domains/tutorials/cracking-the-coding-interview"
html = urlopen(url)
bsObj = BeautifulSoup(html)

#for item in bsObj.findAll("h4",{"class":"challengecard-title"}):
for item in bsObj.findAll("h4"):
    print (item)
