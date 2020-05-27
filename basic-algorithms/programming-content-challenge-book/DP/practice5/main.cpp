#include <bits/stdc++.h>
using namespace std;
#define REP(i, n) for (int i = 0; i < n; i++)
const int INF = 1001001001;

// 問題 5:　最小個数部分和問題　
// nn 個の正の整数 a[0],a[1],…,a[n−1]a[0],a[1],…,a[n−1] と正の整数 AA が与えられる。これらの整数から何個かの整数を選んで総和が AA にする方法をすべて考えた時、選ぶ整数の個数の最小値を求めよ。AA にすることができない場合は -1 と出力せよ。

int main() {
  int n,A;
  cin >> n;
  vector<int> a(n);
  REP(i,n) cin >> a[i];
  cin >> A;

  int dp[n+1][A+1];
  REP(i,n+1) REP(j,A+1) dp[i][j] = INF;
  dp[0][0] = 0;

  REP(i,n) {
    for(int j = 0; j <= A; j++) {
      dp[i+1][j] = dp[i][j];
      if (j-a[i] >= 0) dp[i+1][j] = min(dp[i+1][j], dp[i][j-a[i]] + 1);
    }
  }
  cout << (dp[n][A] < INF ? dp[n][A] : -1) << endl;
}