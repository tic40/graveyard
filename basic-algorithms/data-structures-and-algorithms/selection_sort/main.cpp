#include <bits/stdc++.h>
using namespace std;
#define REP(i, n) for (int i = 0; i < n; i++)
#define REPR(i, n) for (int i = n; i >= 0; i--)
#define FOR(i, m, n) for (int i = m; i < n; i++)

int selectionSort(int a[], int n) {
  int sw = 0;
  REP(i, n-1) {
    int minj = i;
    FOR(j, i, n) { if (a[j] < a[minj]) minj = j; }
    swap(a[minj], a[i]);
    if (i != minj) sw++;
  }
  return sw;
}

int main() {
  int n, i, j;
  cin >> n;
  int a[n];
  REP(i, n) cin >> a[i];
  int num = selectionSort(a, n);
  REP(i, n) {
    if (i) cout << " ";
    cout << a[i];
  }
  cout << endl << num << endl;
}
