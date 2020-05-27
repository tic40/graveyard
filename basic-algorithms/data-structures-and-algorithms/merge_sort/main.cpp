#include <bits/stdc++.h>
using namespace std;
#define REP(i, n) for (int i = 0; i < n; i++)
#define REPR(i, n) for (int i = n; i >= 0; i--)
#define FOR(i, m, n) for (int i = m; i < n; i++)
#define MAX 500000
#define SENTINEL 2000000000

int L[MAX/2+2], R[MAX/2+2];
int cnt;

void merge(int A[], int n, int left, int mid, int right) {
  int n1 = mid - left;
  int n2 = right - mid;
  REP(i, n1) L[i] = A[left + i];
  REP(i, n2) R[i] = A[mid + i];
  L[n1] = R[n2] = SENTINEL;
  int i = 0, j = 0;
  for(int k = left; k < right; k++) {
    cnt++;
    A[k] = (L[i] <= R[j]) ? L[i++] : R[j++];
  }
}

void mergeSort (int A[], int n, int left, int right) {
  if (left + 1 < right) {
    int mid = (left + right) / 2;
    mergeSort(A, n, left, mid);
    mergeSort(A, n, mid, right);
    merge(A, n, left, mid, right);
  }
}

int main() {
  int A[MAX], n;
  cnt = 0;
  cin >> n;
  REP(i, n) cin >> A[i];
  mergeSort(A, n, 0, n);
  REP(i, n) {
    if (i) cout << " ";
    cout << A[i];
  }
  cout << endl << cnt << endl;
  return 0;
}
