import matplotlib
import numpy as np
import pandas as pd
from sklearn import

range_m = np.logspace(2, 6, 5, base = 2).astype(int)
best_m = 0
min_scores = 10000
scores_m = []
for m in range_m:
    kf = KFold(n_splits=5,shuffle=True)
    clf = RandomForestClassifier(n_estimators = 1000 ,max_depth = m,random_state = 4)
    scores = 0
    for train_index, test_index in kf.split(X_train):
          #print("Train:", train_index, "Validation:",test_index)
        clf.fit(X_train[train_index], Y_train[train_index])
#         pred = clf.predict(X_train[test_index])
#         scores += log_loss(Y_train[test_index], pred) / 5
#     scores_m.append(scores)
#     if scores < min_scores:
#         min_scores = scores
#         best_m = m
#
# print(best_m, min_scores)  # 打印随机森林的树的最佳数量和其损失值
# print(scores_m)  # 打印不同数量树的随机森林模型的损失值
