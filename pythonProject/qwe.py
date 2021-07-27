
from sklearn import svm
import pandas as pd
import numpy as np
from joblib import dump, load
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix
from sklearn import metrics
import scikitplot as skplt
from sklearn.model_selection import train_test_split

ABSOLUTE_PATH =r"E:\PycharmProject\bearing_diagnosis"

data_1=pd.read_csv(r"E:\波形和数据\DUANJIEGuzahng.csv",header=0)
data_2=pd.read_csv(r"E:\波形和数据\youceduanjie.csv",header=0)
data_3=pd.read_csv(r"E:\波形和数据\断路.csv",header=0)
data_4=pd.read_csv(r"E:\波形和数据\双端端接故障.csv",header=0)
data_5=pd.read_csv(r"E:\波形和数据\网络正常.csv",header=0)
data_5=data_5.iloc[1:1000001]

def visual():
    x1 = range(len(data_1))
    plt.plot(x1,data_1['CH2'])
    plt.savefig('data1.png')
    plt.close()

    x2 = range(len(data_2))
    plt.plot(x2,data_2['CH2'])
    plt.savefig('data2.png')
    plt.close()

    x3 = range(len(data_3))
    plt.plot(x3,data_3['CH2'])
    plt.savefig('data3.png')
    plt.close()

    x4 = range(len(data_4))
    plt.plot(x4,data_4['CH2'])
    plt.savefig('data4.png')
    plt.close()

    x5 = range(len(data_5))
    plt.plot(x5,data_5['CH2'])
    plt.savefig('data5.png')
    plt.close()
#visual()


data1=np.array(data_1[800000:801000])
data2=np.array(data_2[800000:801000])
data3=np.array(data_3[800000:801000])
data4=np.array(data_4[800000:801000])
data5=np.array(data_5[800000:801000])



print(data1.shape,data2.shape,data3.shape,data4.shape,data5.shape)
#导入数据处理库


L1 = np.zeros((len(data1), 1))
L2 = np.ones((len(data2), 1))
L3 = np.ones((len(data3), 1))
L4 = np.ones((len(data4), 1))
L5 = np.ones((len(data5), 1))
for i in range(len(data3)):
    L3[i] = np.array([2])
for i in range(len(data4)):
    L4[i] = np.array([3])
for i in range(len(data5)):
    L5[i] = np.array([4])

D1 = np.column_stack((data1,L1))
D2 = np.column_stack((data2,L2))
D3 = np.column_stack((data3,L3))
D4 = np.column_stack((data4,L4))
D5 = np.column_stack((data5,L5))

Y = np.row_stack((L1,L2,L3,L4,L5))
Data = np.row_stack((data1,data2,data3,data4,data5))
print(Data.shape)
print(Y.shape)

X_train, X_test, Y_train, Y_test =train_test_split(Data, Y,test_size=0.3)

svm_classifier = svm.SVC(C=1.0, kernel='rbf', decision_function_shape='ovr', gamma=0.01)
svm_classifier.fit(X_train, Y_train)
print("svm:", svm_classifier.score(X_train, Y_train))
print("svm:", svm_classifier.score(X_test, Y_test))

dump(svm_classifier, '3.joblib')       # 保存


clf = load('3.joblib')      # 加载

predicted = clf.predict(X_test)
print(predicted)
