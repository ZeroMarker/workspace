import pandas as pd

url = "https://www.fortunechina.com/fortune500/c/2022-08/03/content_415683.htm"
data = pd.read_html(url)[0]
data.drop("关键数据", axis=1, inplace=True)
# data.to_excel("D:\\top500.xlsx", index=False)
# print(data["国家"].value_counts())
