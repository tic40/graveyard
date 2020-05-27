#include <bits/stdc++.h>
using namespace std;
#define REP(i, n) for (int i = 0; i < n; i++)
#define REPR(i, n) for (int i = n; i >= 0; i--)
#define FOR(i, m, n) for (int i = m; i < n; i++)

int linearSearch(int a[], int n, int key) {
  REP(i, n) if (a[i] == key) return 1;
  return 0;
}

int main() {
  int n, m, cnt = 0;
  cin >> n;
  int a[n];
  REP(i, n) cin >> a[i];
  cin >> m;
  int b[m];
  REP(i, n) cin >> b[i];

  REP(i, m) cnt += linearSearch(a, n, b[i]);
  cout << cnt << endl;
}
