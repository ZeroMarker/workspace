import pandas as pd
import xlrd

fl_path = r"D:\Dev\top500.xlsx"

df = pd.read_excel(fl_path)

# print(df.head(10))

print(df["国家"].value_counts())
