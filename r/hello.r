data <- read.csv("../dataset/stu.csv", encoding="UTF-8")

z = scale(data[2:4])

score = apply(z, 1, mean)

scoredata = cbind(data, score)

y = quantile(score, c(0.8, 0.6, 0.4, 0.2))

scoredata$grade [score >= y[1]] <- "A"
scoredata$grade [score >= y[2] & score < y[1]] <- "B"
scoredata$grade [score >= y[3] & score < y[2]] <- "C"
scoredata$grade [score >= y[4] & score < y[3]] <- "D"
scoredata$grade [score < y[4]] <- "E"

name = strsplit((scoredata$studentname), " ")

lastname = sapply(name, "[", 2)
firstname = sapply(name, "[", 1)

scoredata2 = cbind(firstname, lastname, scoredata[, -1])

scoredata3 = scoredata2[order(lastname, firstname),]

scoredata3
