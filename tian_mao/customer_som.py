
import pandas as pd
from SOM import SOM
from sklearn import metrics
ABSOLUTE_PATH=r'E:\PycharmProject\tian_mao'
#读取数据集
f=open(ABSOLUTE_PATH+r"\resources\customer.csv")
customer_data = pd.read_csv(f,header=0)
X = customer_data.iloc[100000:110000, [1,2,4]]  # #表示我们取特征空间中的4个维度

print(X)
som = SOM(1, 3,3, n_iterations=10, alpha=0.1)
som.train(X)
