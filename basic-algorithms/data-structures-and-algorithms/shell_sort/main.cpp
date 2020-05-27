#include <bits/stdc++.h>
using namespace std;
#define REP(i, n) for (int i = 0; i < n; i++)
#define REPR(i, n) for (int i = n; i >= 0; i--)
#define FOR(i, m, n) for (int i = m; i < n; i++)
vector<int> G;
long long cnt;

void insertionSort(int a[], int n, int g) {
  FOR(i, g, n) {
    int v = a[i];
    int j = i - g;
    while (j >= 0 && a[j] > v) {
      a[j+g] = a[j];
      j -= g;
      cnt++;
    }
    a[j+g] = v;
  }
}

void shellSort(int a[], int n) {
  // generate G = { 1,4,13,40... }
  int h = 1;
  while (h <= n) {
    if (h > n) break;
    G.push_back(h);
    h = 3*h + 1;
  }

  // 逆順にG[i] = g を指定する
  for (int i = G.size() - 1; i >= 0; i--) {
    insertionSort(a, n, G[i]);
  }
}

int main() {
  int n;
  cin >> n;
  int a[n];
  REP(i, n) cin >> a[i];
  cnt = 0;

  shellSort(a, n);

  cout << G.size() << endl;

  for (int i = G.size() - 1; i >= 0; i--) {
    cout << G[i];
    if (i) cout << " ";
  }
  cout << endl << cnt << endl;
  REP(i, n) cout << a[i] << endl;
}
