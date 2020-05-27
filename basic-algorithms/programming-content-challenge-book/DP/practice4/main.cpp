#include <bits/stdc++.h>
using namespace std;
#define REP(i, n) for (int i = 0; i < n; i++)
const int INF = 1001001001;
const int MOD = 1000000009;

// 問題 4:　部分和数え上げ問題　
// nn 個の正の整数 a[0],a[1],…,a[n−1]a[0],a[1],…,a[n−1] と正の整数 AA が与えられる。これらの整数から何個かの整数を選んで総和が AA になるようにする方法が何通りあるかを求めよ。
// ただし、答えがとても大きくなる可能性があるので、1,000,000,009 で割った余りで出力せよ。

int main() {
  int n,A;
  cin >> n;
  vector<int> a(n);
  REP(i,n) cin >> a[i];
  cin >> A;

  int dp[n+1][A+1];
  memset(dp, 0, sizeof(dp));
  dp[0][0] = 1;

  REP(i,n) {
    for(int j = 0; j <= A; j++) {
      dp[i+1][j] += dp[i][j];
      if (j-a[i] >= 0) {
        dp[i+1][j] += dp[i][j-a[i]];
      }
      dp[i+1][j] %= MOD;
    }
  }
  cout << dp[n][A] << endl;
}
