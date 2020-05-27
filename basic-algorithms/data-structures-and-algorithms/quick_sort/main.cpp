#include <bits/stdc++.h>
using namespace std;
#define REP(i, n) for (int i = 0; i < n; i++)
#define REPR(i, n) for (int i = n; i >= 0; i--)
#define FOR(i, m, n) for (int i = m; i < n; i++)
#define MAX 100000
#define SENTINEL 2000000000

struct Card {
  char suit;
  int value;
};
struct Card L[MAX / 2 * 2], R[MAX / 2 + 2];

void merge(struct Card A[], int n, int left, int mid, int right) {
  int i, j, k;
  int n1 = mid - left;
  int n2 = right - mid;
  REP(i, n1) L[i] = A[left + i];
  REP(i, n2) R[i] = A[mid + i];
  L[n1].value = R[n2].value = SENTINEL;
  i = j = 0;
  FOR(k, left, right) {
    A[k] = L[i].value <= R[j].value ? L[i++] : R[j++];
  }
}

void mergeSort(struct Card A[], int n, int left, int right) {
  if (left + 1 >= right) return;

  int mid = (left + right) / 2;
  mergeSort(A, n, left, mid);
  mergeSort(A, n, mid, right);
  merge(A, n, left, mid, right);
}

int partition(struct Card A[], int n, int p, int r) {
  int i, j;
  struct Card t, x;
  x = A[r];
  i = p - 1;
  FOR(j, p, r) {
    if (A[j].value <= x.value) {
      i++;
      t = A[i]; A[i] = A[j]; A[j] = t;
    }
  }
  t = A[i + 1]; A[i + 1] = A[r]; A[r] = t;
  return i + 1;
}

void quickSort(struct Card A[], int n, int p, int r) {
  if (p >= r) return;

  int q = partition(A, n, p, r);
  quickSort(A, n, p, q - 1);
  quickSort(A, n, q + 1, r);
}

int main() {
  int n, i, v;
  struct Card A[MAX], B[MAX];
  char S[10];
  int stable = 1;

  cin >> n;
  REP(i, n) {
    cin >> S >> v;
    A[i].suit = B[i].suit = S[0];
    A[i].value = B[i].value = v;
  }
  mergeSort(A, n, 0, n);
  quickSort(B, n, 0, n - 1);

  REP(i, n) if (A[i].suit != B[i].suit) stable = 0;

  if (stable == 1) cout << "Stable";
  else cout << "Not stable";
  cout << endl;

  REP(i, n) printf("%c %d\n", B[i].suit, B[i].value);
}