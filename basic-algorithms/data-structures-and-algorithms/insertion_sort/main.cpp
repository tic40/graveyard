#include <bits/stdc++.h>
using namespace std;
#define REP(i, n) for (int i = 0; i < n; i++)
#define REPR(i, n) for (int i = n; i >= 0; i--)
#define FOR(i, m, n) for (int i = m; i < n; i++)

void trace(int a[], int n) {
  int i;
  REP(i, n) {
    if (i > 0) cout << " ";
    cout << a[i];
  }
  cout << endl;
}

void insertionSort(int a[], int n) {
  int j, i, v;
  FOR(i, 1, n) {
    v = a[i];
    j = i - 1;
    while (j >= 0 && a[j] > v) {
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = v;
    trace(a, n);
  }
}

int main() {
  int n, i, j;
  cin >> n;
  int a[n];
  REP(i, n) cin >> a[i];
  trace(a, n);
  insertionSort(a, n);
}
