#include <bits/stdc++.h>
using namespace std;
#define REP(i, n) for (int i = 0; i < n; i++)

int main() {
  int n,W;
  cin >> n;
  vector<int> w(n), v(n);
  REP(i,n) cin >> w[i] >> v[i];
  cin >> W;
  int dp[W+1];
  REP(i,W+1) dp[i] = 0;
  REP(i,n) {
    for (int j = W; j >= w[i]; j--) {
      dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
    }
  }
  cout << dp[W] << endl;
  /*
  int dp[n+1][W+1];
  REP(i,n+1) REP(j,W+1) dp[i][j] = -1;
  REP(j,W+1) dp[0][j] = 0;
  REP(i,n) {
    for(int j = 0; j + w[i] <= W; j++) {
      dp[i+1][j] = max(dp[i+1][j], dp[i][j]);
      if (j + w[i] <= W) {
        dp[i+1][j+w[i]] = max(dp[i+1][j-w[i]], dp[i][j]+v[i]);
      }
    }
  }
  cout << dp[n][W] << endl;
  */
}