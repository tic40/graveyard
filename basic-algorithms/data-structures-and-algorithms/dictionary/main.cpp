#include <bits/stdc++.h>
using namespace std;
#define REP(i, n) for (int i = 0; i < n; i++)
#define REPR(i, n) for (int i = n; i >= 0; i--)
#define FOR(i, m, n) for (int i = m; i < n; i++)
#define M 1046527
string H[M];

int getChar(char ch) {
  if (ch == 'A') return 1;
  if (ch == 'C') return 2;
  if (ch == 'G') return 3;
  if (ch == 'T') return 4;
  return 0;
}

long long getKey(string str) {
  long long sum = 0, p = 1;
  for (long long i = 0; i < str.size(); i++) {
    sum += p*(getChar(str[0]));
    p *= 5;
  }
  return sum;
}

int h1(int key) { return key % M; }
int h2(int key) { return 1 + (key % (M -1) ); }

bool insert(string str) {
  long long key, h;
  key = getKey(str);
  for (long long i = 0; ; i++) {
    h = (h1(key) + i * h2(key)) % M;
    if (H[h] == str) return true;
    else if (H[h].size() == 0) {
      H[h] = str;
      return false;
    }
  }
  return false;
}

bool find(string str) {
  long long key, h;
  key = getKey(str);
  for (long long i = 0; ; i++) {
    h = (h1(key) + i * h2(key)) % M;
    if (H[h] == str) return true;
    else if (H[h].size() == 0) return false;
  }
  return false;
}

int main() {
  int n;
  string str, com;
  REP(i, M) H[i] = "";
  cin >> n;

  REP(i, n) {
    cin >> com >> str;
    if (com[0] == 'i') insert(str);
    else {
      string result = find(str) ? "yes" : "no";
      cout << result << endl;
    }
  }
}
