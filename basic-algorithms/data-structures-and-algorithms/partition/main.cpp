#include <bits/stdc++.h>
using namespace std;
#define REP(i, n) for (int i = 0; i < n; i++)
#define REPR(i, n) for (int i = n; i >= 0; i--)
#define FOR(i, m, n) for (int i = m; i < n; i++)
#define MAX 100000

int A[MAX];
int n;

int pertition(int p, int r) {
  int x = A[r], tmp;
  int i = p - 1;
  FOR(j, p, r) {
    if (A[j] <= x) {
      i++;
      tmp = A[i]; A[i] = A[j]; A[j] = tmp;
    }
  }
  tmp = A[i+1]; A[i+1] = A[r]; A[r] = tmp;
  return i+1;
}

int main() {
  int q;
  cin >> n;
  REP(i, n) cin >> A[i];
  q = pertition(0, n-1);

  REP(i, n) {
    if (i) cout << " ";
    if (i == q) cout << "[";
    cout << A[i];
    if (i == q) cout << "]";
  }
  cout << endl;
}