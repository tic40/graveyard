# https://www.hackerrank.com/challenges/s10-multiple-linear-regression/problem
from sklearn import linear_model

lm = linear_model.LinearRegression()

num_features, num_inputs = map(int, input().split())
xlst = list()
ylst = list()
for i in range(num_inputs):
  vals = list(map(float, input().split()))
  xlst.append(vals[:-1])
  ylst.append(vals[-1])
lm.fit(xlst,ylst)
num_test = int(input())
xlst = list()
for i in range(num_test):
  xlst.append(list(map(float, input().split())))

pred = lm.predict(xlst)
for p in pred:
  print("%.3f" %p)
