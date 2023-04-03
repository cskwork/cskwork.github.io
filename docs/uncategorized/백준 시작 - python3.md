---
title: "백준 시작 - python3"
description: " REF https://www.acmicpc.net/"
date: 2021-09-25T00:22:57.373Z
tags: ["algorithm"]
---

``` python
#----- 사칙연산
import sys

def N10998():
    a, b = [int(a) for a in input().split()]
    print(a * b)

def N1088():
    a, b = [int(a) for a in input().split()]
    print(a / b)

def N10869():
    a, b = [int(a) for a in input().split()]
    print(a + b)
    print(a - b)
    print(a * b)
    print(int(a / b))
    print(a % b)

def N10430():
    A, B, C = map(int, input().split())
    # A, B, C = [int(A) for A in input().split()]
    print((A + B) % C)
    print(((A % C) + (B % C)) % C)
    print((A * B) % C)
    print(((A % C) * (B % C)) % C)

def N2588():
    A = int(input())
    B = input()
    print(A * int(B[2]))
    print(A * int(B[1]))
    print(A * int(B[0]))
    print(A * int(B))

# ---- if
def N1330():
    a, b = map(int, input().split())
    if(a > b):
        print('>')
    elif(a < b):
        print('<')
    else:
        print('==')

def N2753():
    a = int(input())
    if( (a % 4 == 0) and (a % 100 !=0) or (a % 400 ==0) ):
        print(1)
    else:
        print(0)

def N14681():
    x = int(input())
    y = int(input())
    if(x>0 and y>0):
        print(1)
    elif(x<0 and y>0):
        print(2)
    elif(x<0 and y<0):
        print(3)
    else:
        print(4)

def N2884():
    h, m = map(int, input().split())
    if(m >= 45):
        m-=45
    elif(m < 45):
        m = 60 - (45 - m)
        if(h!=0):
            h-=1
        else:
            h=23
    print(h, m)

#----- for 루프

def N10950():
    t = int(input())
    for i in range(0,t):
        a, b = map(int, input().split())
        print(a+b)

def N15552():
    # import sys
    t = int(input())
    for i in range(0,t):
        a, b = map(int, sys.stdin.readline().split())
        print(a+b)

def N11021():
    # import sys
    t = int(input())
    for i in range(0,t):
        a, b = map(int, sys.stdin.readline().split())
        print('Case #'+str(i+1)+':',a,'+',b,'=', a+b)

def N10871():
    n, x = map(int, input().split())
    a = list(map(int, input().split()))
    for i in a:
        if( i < x ):
            print(i, end = ' ') # print without new line

#----- while 루프

def N10952():
    # import sys
    while 1:
        try:
            a, b = map(int, sys.stdin.readline().split())
            print(a + b)
        except:
            break

def N1110():
    n = input()
    if(int(n) < 10):
        n+='0'
    orgN = int(n)
    count = int()
    while(1):
        sum = str(int(n[0]) + int(n[1]))
        n = n[1] + sum[-1]
        count += 1
        if( int(n) == orgN ):
            print(count)
            break

if __name__ == '__main__':
    N1110()
    # N10952()
    # N10871()
    # N11021()
    # N15552()
    # N10950()
    # N2884()
    # N14681()
    # N2753()
    # N10998()
    # N1088()
    # N10869()
    # N10430()
    # N2588()
    # N1330()
```

### REF
https://www.acmicpc.net/