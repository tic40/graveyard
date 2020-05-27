#include <bits/stdc++.h>
using namespace std;
#define REP(i, n) for (int i = 0; i < n; i++)
#define REPR(i, n) for (int i = n; i >= 0; i--)
#define FOR(i, m, n) for (int i = m; i < n; i++)

int binarySearch(int a[], int n, int key) {
  int left = 0, right = n;
  while (left < right) {
    int mid = (left + right) / 2;
    if (a[mid] == key) return 1;
    else if (key < a[mid]) right = mid;
    else left = mid;
  }
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

  REP(i, m) cnt += binarySearch(a, n, b[m]);
  cout << cnt << endl;
}
