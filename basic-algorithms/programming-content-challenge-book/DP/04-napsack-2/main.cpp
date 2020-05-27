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
  int dp[n+1][n*100+1];
  REP(j,W*100+1) dp[0][j] = INF;
  dp[0][0] = 0;

  REP(i,n) {
    for(int j = 0; j <= n * 100; j++) {
      if (j < v[i]) dp[i+1][j] = dp[i][j];
      else dp[i+1][j] = min(dp[i][j], dp[i][j-v[i]]+w[i]);
    }
  }
  int ans = 0;
  REP(i,100*n) if (dp[n][i] <= W) ans = i;
  cout << ans << endl;
}