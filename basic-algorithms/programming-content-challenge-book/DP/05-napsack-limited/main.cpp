#include <bits/stdc++.h>
using namespace std;
#define REP(i, n) for (int i = 0; i < n; i++)
const int INF = 1001001001;

int main() {
  int n,k;
  cin >> n;
  vector<int> a(n), m(n);
  REP(i,n) cin >> a[i];
  REP(i,n) cin >> m[i];
  cin >> k;
  bool dp[n+1][k+1];
  REP(i,n+1) REP(j,k+1) dp[i][k] = false;
  dp[0][0] = true;

  REP(i,n) {
    for (int j = 0; j <= k; j++) {
      for (int _k = 0; _k <= m[i] && _k * a[i] <= j; _k++) {
        dp[i+1][j] |= dp[i][j - _k * a[i]];
      }
    }
  }
  cout << (dp[n][k] ? "Yes" : "No") << endl;
}