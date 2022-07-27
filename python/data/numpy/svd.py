import numpy as np

A = np.mat([[1, 2, 3], [4, 5, 6]])

U, s, V = np.linalg.svd(A)

print(A)
print(U)
print(s)
print(V)
