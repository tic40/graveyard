#include <bits/stdc++.h>
using namespace std;
#define REP(i, n) for (int i = 0; i < n; i++)
#define REPR(i, n) for (int i = n; i >= 0; i--)
#define FOR(i, m, n) for (int i = m; i < n; i++)

int n, a[50];

int solve(int i, int b) {
  if (b == 0) return 1;
  if (i >= n) return 0;
  return solve(i + 1, b) || solve(i + 1, b - a[i]);
}

int main() {
  int m, b;
  cin >> n;
  REP(i, n) scanf("%d", &a[i]);
  cin >> m;
  REP(i, m) {
    scanf("%d", &b);
    if (solve(0, b)) cout << "yes" << endl;
    else cout << "no" << endl;
  }
}
