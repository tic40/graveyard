#include <bits/stdc++.h>
using namespace std;
#define REP(i, n) for (int i = 0; i < n; i++)
const int INF = 1001001001;

// 問題 3:　部分和問題　
// nn 個の正の整数 a[0],a[1],…,a[n−1]a[0],a[1],…,a[n−1] と正の整数 AA が与えられる。これらの整数から何個かの整数を選んで総和が AA になるようにすることが可能か判定せよ。可能ならば "YES" と出力し、不可能ならば "NO" と出力せよ。

int main() {
  int n,A;
  cin >> n;
  vector<int> a(n);
  REP(i,n) cin >> a[i];
  cin >> A;

  bool dp[n+1][A+1];
  memset(dp, 0, sizeof(dp));
  dp[0][0] = true;

  REP(i,n) {
    for (int j = 0; j <= A; j++) {
      dp[i+1][j] |= dp[i][j];
      if (j-a[i] >= 0) dp[i+1][j] |= dp[i][j-a[i]];
    }
  }

  cout << (dp[n][A] ? "YES" : "NO") << endl;
}