#include <bits/stdc++.h>
using namespace std;
#define REP(i, n) for (int i = 0; i < n; i++)
#define REPR(i, n) for (int i = n; i >= 0; i--)
#define FOR(i, m, n) for (int i = m; i < n; i++)

int bubbleSort(int a[], int n) {
  int swapNum = 0;
  bool flag = true;
  for (int i = 0; flag; i++) {
    flag = false;
    for (int j = n - 1; j >= i + 1; j--) {
      if (a[j] < a[j - 1]) {
        swap(a[j], a[j - 1]);
        flag = true;
        swapNum++;
      }
    }
  }
  return swapNum;
}

int main() {
  int n;
  cin >> n;
  int a[n];
  REP(i, n) cin >> a[i];
  int swapNum = bubbleSort(a, n);
  REP(i, n) {
    if (i) cout << " ";
    cout << a[i];
  }
  cout << endl << swapNum << endl;
}
