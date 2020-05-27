#include <bits/stdc++.h>
using namespace std;
#define REP(i, n) for (int i = 0; i < n; i++)
const int INF = 1001001001;

// 問題 8:　最長共通部分列 (LCS) 問題
// 2つの文字列 SS, TT が与えられる。"abcde" といった文字列の部分文字列とは、"a", "ad", "abe" といったように、文字列から文字を幾つか抜き出して順に繋げてできる文字列のことを言うものとする。このとき、SS と TT の共通の部分文字列となる文字列の長さの最大値を求めよ。

int main() {
  string s,t;
  cin >> s >> t;
  int S = s.size(), T = t.size();

  int dp[S+1][T+1];
  memset(dp, 0, sizeof(dp));

  for (int i = 0; i < S; i++) {
    for (int j = 0; j < T; j++) {
      if (s[i] == t[j]) dp[i+1][j+1] = dp[i][j] + 1;
      dp[i+1][j+1] = max(dp[i+1][j+1], max(dp[i+1][j],dp[i][j+1]));
    }
  }
  cout << dp[S][T] << endl;
}