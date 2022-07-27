%{
min f = -4a+b+7c
c = [-4, 1, 7]'

%}
c = [2; 3; -5]';
A = [1, 1, 1; 
    -2, 5, -1;
    1, 3, 1];
b = [7;-10;12]';
lb = [0, 0, 0];
%lower
ub = [];
%upper
ctype="SLU";
%{
F free
U <=
S =
L >=
D -3 <= 2a+4b+c <= 3
%}
vtype="CCC";
%{
C constant
I integer
%}
sense=1;
%{
sense=1 min f
sense=-1 max f
%}
param.itlim = 10000;

[xmin, fmin, status, extra]=glpk(c, A, b, lb, ub, ctype, vtype, sense, param);

