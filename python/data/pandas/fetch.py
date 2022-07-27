import pandas as pd

url = "https://www.fortunechina.com/fortune500/c/2020-08/10/content_372148.htm"
data = pd.read_html(url)[0]
data.drop("关键数据", axis=1, inplace=True)
# data.to_excel("D:\\top500.xlsx", index=False)
# print(data["国家"].value_counts())
