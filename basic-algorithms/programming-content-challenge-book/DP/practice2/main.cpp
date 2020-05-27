#include <bits/stdc++.h>
using namespace std;
#define REP(i, n) for (int i = 0; i < n; i++)
const int INF = 1001001001;

// 問題 2:　ナップサック問題
// nn 個の品物があり、ii 番目の品物のそれぞれ重さと価値が weight[i],value[i]weight[i],value[i] となっている (i=0,1,...,n−1i=0,1,...,n−1)。
// これらの品物から重さの総和が W を超えないように選んだときの、価値の総和の最大値を求めよ。

int main() {
  int n,W;
  cin >> n;
  vector<int> w(n),v(n);
  REP(i,n) cin >> w[i] >> v[i];
  cin >> W;

  int dp[n+1][W+1];
  REP(i,n+1) REP(j,W+1) dp[i][j] = 0;

  REP(i,n) {
    for(int j = 0; j <= W; j++) {
      if (j-w[i] < 0) dp[i+1][j] = dp[i][j];
      else dp[i+1][j] = max(dp[i][j], dp[i][j-w[i]] + v[i]);
    }
  }
  cout << dp[n][W] << endl;
}