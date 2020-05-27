#include <bits/stdc++.h>
using namespace std;
#define REP(i, n) for (int i = 0; i < n; i++)
const int INF = 1001001001;

// 問題 1:　最大和問題
// n 個の整数 a[0],a[1],…,a[n−1]a[0],a[1],…,a[n−1] が与えられる。これらの整数から何個かの整数を選んで総和をとったときの、総和の最大値を求めよ。また、何も選ばない場合の総和は 0 であるものとする。

int main() {
  int n;
  cin >> n;
  vector<int> a(n);
  REP(i,n) cin >> a[i];

  int dp[n+1];
  dp[0] = 0;
  REP(i,n) {
    dp[i+1] = max(dp[i], dp[i] + a[i]);
  }
  cout << dp[n] << endl;
}