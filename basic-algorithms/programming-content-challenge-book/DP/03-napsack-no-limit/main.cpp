#include <bits/stdc++.h>
using namespace std;
#define REP(i, n) for (int i = 0; i < n; i++)
const int INF = 1001001001;

int main() {
  int n,W;
  cin >> n;
  vector<int> w(n), v(n);
  REP(i,n) cin >> w[i] >> v[i];
  cin >> W;
  int dp[W+1];
  REP(i,W+1) dp[i] = 0;

  REP(i,n) {
    for(int j = w[i]; j <= W; j++) {
      dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
    }
  }
  cout << dp[W] << endl;

/*
  int dp[n+1][W+1];
  REP(i,n+1) REP(j,W+1) dp[i][j] = -INF;
  REP(i,W+1) dp[0][i] = 0;

  REP(i,n) {
    for (int j = 0; j <= W; j++) {
      for(int k = 0; k * w[i] <= j; k++) {
        dp[i+1][j] = max(dp[i+1][j], dp[i][j-k*w[i]] + k*v[i]);
      }
    }
  }
  cout << dp[n][W] << endl;
*/
}