#include <bits/stdc++.h>
using namespace std;
#define REP(i, n) for (int i = 0; i < n; i++)

int main() {
  int n,m;
  cin >> n >> m;
  string s, t;
  cin >> s >> t;
  int dp[n+1][m+1];
  REP(i,n+1) REP(j,m+1) dp[i][j] = 0;

  REP(i,n) {
    for(int j = 0; j < m; j++) {
      if (s[i] == t[j]) dp[i+1][j+1] = dp[i][j]+1;
      else dp[i+1][j+1] = max(dp[i][j+1],dp[i+1][j]);
    }
  }
  cout << dp[n][m] << endl;
}