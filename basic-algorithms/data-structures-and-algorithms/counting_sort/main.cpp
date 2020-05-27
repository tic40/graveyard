#include <bits/stdc++.h>
using namespace std;
#define REP(i, n) for (int i = 0; i < n; i++)
#define REPR(i, n) for (int i = n; i >= 0; i--)
#define FOR(i, m, n) for (int i = m; i < n; i++)
#define VMAX 10000

int main() {
  int C[VMAX + 1], n, i, j;
  cin >> n;

  unsigned short *A = (unsigned short*)malloc(sizeof(short) * n + 1);
  unsigned short *B = (unsigned short*)malloc(sizeof(short) * n + 1);

  for (i = 0; i <= VMAX; i++) C[i] = 0;

  REP(i, n) {
    cin >> A[i + 1];
    C[A[i + 1]]++;
  }

  for (i = 1; i <= VMAX; i++) C[i] = C[i] + C[i - 1];

  for (j = 1; j <= n; j++) {
    B[C[A[j]]] = A[j];
    C[A[j]]--;
  }

  for (i = 1; i <= n; i++) {
    if (i > 1) cout << " ";
    cout << B[i];
  }

  cout << endl;
  return 0;
}