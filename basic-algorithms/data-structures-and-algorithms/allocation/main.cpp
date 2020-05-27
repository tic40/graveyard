#include <bits/stdc++.h>
using namespace std;
#define REP(i, n) for (int i = 0; i < n; i++)
#define REPR(i, n) for (int i = n; i >= 0; i--)
#define FOR(i, m, n) for (int i = m; i < n; i++)
#define MAX 100000
typedef long long ll;

int n, k;
ll T[MAX];

int check(ll p) {
  int i = 0;
  REP(j, k) {
    ll s = 0;
    while (s + T[i] <= p) {
      s += T[i];
      i++;
      if (i == n) return n;
    }
  }
  return i;
}

int solve() {
  ll left = 0, mid;
  ll right = 100000 * 10000; // 荷物の個数 * 1個当りの最大重量
  while (right - left > 1) {
    mid = (left + right) / 2;
    int v = check(mid); // mid == P を決めて何個詰めるかチェック
    if (v >= n) right = mid;
    else left = mid;
  }
  return right;
}

int main() {
  cin >> n >> k;
  REP(i, n) cin >> T[i];
  cout << solve() << endl;
}
