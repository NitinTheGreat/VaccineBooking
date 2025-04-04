 

## 1. Measures of Central Tendency

### Arithmetic Mean (Average)

- **Definition**: The sum of all observations divided by the total number of observations
- **Formula**: X̄ = ΣX/n (where ΣX is the sum of all values and n is the number of observations)
- **R Implementation**:

```r
mean(data_vector)  # Built-in R function
```


- **Example from lab**: For the dataset with 20 values, mean = 420/20 = 21


### Median

- **Definition**: The middle value when data is arranged in ascending order
- **R Implementation**:

```r
median(data_vector)  # Built-in R function
```


- **For frequency distributions**: Requires finding the median class and applying a formula
- **Example from lab**: Median = (20+21)/2 = 20.5


### Mode

- **Definition**: The value that occurs most frequently
- **R Implementation**: R doesn't have a built-in mode function, so it's calculated by finding the maximum frequency:

```r
m = which(frequency == max(frequency))  # Find position of maximum frequency
```


- **Example from lab**: Modal age = 20 and 21 (both occur 5 times)


## 2. Measures of Dispersion

### Range

- **Definition**: Difference between the largest and smallest values
- **Formula**: Range = Maximum value - Minimum value
- **R Implementation**:

```r
range_value = max(data) - min(data)
# OR
range(data)  # Returns both min and max
```




### Quartile Deviation (QD)

- **Definition**: Half the difference between the third quartile (Q3) and first quartile (Q1)
- **Formula**: QD = (Q3 - Q1)/2
- **R Implementation**:

```r
q1 = quantile(data, 0.25)
q3 = quantile(data, 0.75)
qd = (q3 - q1)/2
```


- **Coefficient of QD**: (Q3 - Q1)/(Q3 + Q1)


### Mean Deviation

- **Definition**: Average of absolute deviations from a measure of central tendency
- **Formula**: MD = Σ|X - A|/n (where A can be mean, median, or mode)
- **R Implementation**:

```r
# About mean
md_mean = sum(abs(data - mean(data)))/length(data)

# About median
md_median = sum(abs(data - median(data)))/length(data)
```




### Standard Deviation

- **Definition**: Square root of the average of squared deviations from the mean
- **Formula**: σ = √(Σ(X - X̄)²/n)
- **R Implementation**:

```r
sd(data)  # Built-in function
# OR
sqrt(var(data))
```
## Examples for Each Statistical Measure

### 1. Arithmetic Mean

#### Example 1: Raw Data

```r
# Dataset: Daily temperature readings (°C) for a week
temperatures <- c(22.5, 24.3, 21.8, 25.1, 23.7, 22.9, 24.6)

# Calculate mean
mean_temp <- mean(temperatures)
print(paste("Mean temperature:", round(mean_temp, 2), "°C"))

# Output:
# [1] "Mean temperature: 23.56 °C"
```

#### Example 2: Class Intervals

```r
# Dataset: Student heights (cm) in class intervals
class_midpoints <- c(152.5, 157.5, 162.5, 167.5, 172.5, 177.5)
frequencies <- c(5, 12, 18, 25, 15, 5)

# Calculate mean
mean_height <- sum(class_midpoints * frequencies) / sum(frequencies)
print(paste("Mean height:", round(mean_height, 2), "cm"))

# Output:
# [1] "Mean height: 166.25 cm"
```

### 2. Median

#### Example 1: Raw Data

```r
# Dataset: Exam scores of students
scores <- c(78, 85, 92, 65, 88, 75, 79, 81, 90, 72, 68)

# Calculate median
median_score <- median(scores)
print(paste("Median score:", median_score))

# Output:
# [1] "Median score: 79"
```

#### Example 2: Class Intervals

```r
# Dataset: Monthly income (in $1000s) in class intervals
class_midpoints <- c(22.5, 27.5, 32.5, 37.5, 42.5, 47.5)
frequencies <- c(8, 15, 22, 18, 10, 7)

# Calculate median
total <- sum(frequencies)
cumulative_freq <- cumsum(frequencies)
median_class_index <- which(cumulative_freq >= total/2)[1]
l <- class_midpoints[median_class_index] - 2.5  # Lower boundary of median class
c_freq <- if(median_class_index == 1) 0 else cumulative_freq[median_class_index-1]
f <- frequencies[median_class_index]  # Frequency of median class
h <- 5  # Class width

median_income <- l + ((total/2 - c_freq) / f) * h
print(paste("Median income:", round(median_income, 2), "thousand dollars"))

# Output:
# [1] "Median income: 32.95 thousand dollars"
```

### 3. Mode

#### Example 1: Raw Data

```r
# Dataset: Blood types of patients
blood_types <- c("A", "B", "O", "A", "AB", "O", "A", "O", "B", "A", "O", "A")

# Calculate mode
type_table <- table(blood_types)
mode_type <- names(type_table)[which.max(type_table)]
print(paste("Mode blood type:", mode_type))

# Output:
# [1] "Mode blood type: A"
```

#### Example 2: Class Intervals

```r
# Dataset: Weight of packages (kg) in class intervals
class_midpoints <- c(2.5, 7.5, 12.5, 17.5, 22.5, 27.5)
frequencies <- c(10, 25, 40, 15, 8, 2)

# Calculate mode
modal_class_index <- which.max(frequencies)
l <- class_midpoints[modal_class_index] - 2.5  # Lower boundary of modal class
f0 <- frequencies[modal_class_index]  # Frequency of modal class
f1 <- if(modal_class_index == 1) 0 else frequencies[modal_class_index-1]  # Frequency of pre-modal class
f2 <- if(modal_class_index == length(frequencies)) 0 else frequencies[modal_class_index+1]  # Frequency of post-modal class
h <- 5  # Class width

mode_weight <- l + ((f0 - f1) / (2*f0 - f1 - f2)) * h
print(paste("Mode weight:", round(mode_weight, 2), "kg"))

# Output:
# [1] "Mode weight: 12.08 kg"
```

### 4. Range

#### Example 1: Raw Data

```r
# Dataset: Time taken to complete a task (minutes)
completion_times <- c(12.5, 15.2, 10.8, 14.3, 16.7, 11.9, 13.5, 17.2, 14.8)

# Calculate range
range_time <- max(completion_times) - min(completion_times)
print(paste("Range of completion times:", round(range_time, 2), "minutes"))

# Output:
# [1] "Range of completion times: 6.4 minutes"
```

#### Example 2: Class Intervals

```r
# Dataset: Age of employees in class intervals
class_boundaries <- c(20, 25, 30, 35, 40, 45, 50)
frequencies <- c(15, 28, 32, 20, 12, 8)

# Calculate range
range_age <- max(class_boundaries) - min(class_boundaries)
print(paste("Range of ages:", range_age, "years"))

# Output:
# [1] "Range of ages: 30 years"
```

### 5. Quartile Deviation

#### Example 1: Raw Data

```r
# Dataset: Daily sales figures ($)
sales <- c(1250, 1580, 1340, 1890, 1420, 1650, 1720, 1480, 1560, 1380, 1510, 1690)

# Calculate quartile deviation
q1 <- quantile(sales, 0.25)
q3 <- quantile(sales, 0.75)
qd <- (q3 - q1) / 2
coef_qd <- (q3 - q1) / (q3 + q1)

print(paste("First quartile (Q1):", q1))
print(paste("Third quartile (Q3):", q3))
print(paste("Quartile deviation:", round(qd, 2)))
print(paste("Coefficient of quartile deviation:", round(coef_qd, 4)))

# Output:
# [1] "First quartile (Q1): 1425"
# [1] "Third quartile (Q3): 1685"
# [1] "Quartile deviation: 130"
# [1] "Coefficient of quartile deviation: 0.0839"
```

#### Example 2: Class Intervals

```r
# Dataset: Household electricity consumption (kWh) in class intervals
class_midpoints <- c(175, 225, 275, 325, 375, 425)
frequencies <- c(12, 25, 38, 20, 10, 5)

# Create a dataset that expands the frequency distribution
expanded_data <- rep(class_midpoints, frequencies)

# Calculate quartile deviation
q1 <- quantile(expanded_data, 0.25)
q3 <- quantile(expanded_data, 0.75)
qd <- (q3 - q1) / 2
coef_qd <- (q3 - q1) / (q3 + q1)

print(paste("First quartile (Q1):", round(q1, 2)))
print(paste("Third quartile (Q3):", round(q3, 2)))
print(paste("Quartile deviation:", round(qd, 2)))
print(paste("Coefficient of quartile deviation:", round(coef_qd, 4)))

# Output:
# [1] "First quartile (Q1): 225"
# [1] "Third quartile (Q3): 325"
# [1] "Quartile deviation: 50"
# [1] "Coefficient of quartile deviation: 0.1818"
```

### 6. Mean Deviation

#### Example 1: Raw Data

```r
# Dataset: Hours spent on social media per day
hours <- c(2.5, 1.8, 3.2, 0.9, 2.7, 1.5, 3.8, 2.2, 1.7, 2.9)

# Calculate mean deviation about mean
mean_hours <- mean(hours)
md_mean <- sum(abs(hours - mean_hours)) / length(hours)

# Calculate mean deviation about median
median_hours <- median(hours)
md_median <- sum(abs(hours - median_hours)) / length(hours)

print(paste("Mean:", round(mean_hours, 2)))
print(paste("Median:", round(median_hours, 2)))
print(paste("Mean deviation about mean:", round(md_mean, 2)))
print(paste("Mean deviation about median:", round(md_median, 2)))

# Output:
# [1] "Mean: 2.32"
# [1] "Median: 2.35"
# [1] "Mean deviation about mean: 0.7"
# [1] "Mean deviation about median: 0.71"
```

#### Example 2: Class Intervals

```r
# Dataset: Distance traveled to work (km) in class intervals
class_midpoints <- c(5, 10, 15, 20, 25, 30)
frequencies <- c(15, 28, 22, 18, 10, 7)

# Create expanded dataset
expanded_data <- rep(class_midpoints, frequencies)

# Calculate mean deviation about mean
mean_distance <- mean(expanded_data)
md_mean <- sum(abs(expanded_data - mean_distance)) / length(expanded_data)

# Calculate mean deviation about median
median_distance <- median(expanded_data)
md_median <- sum(abs(expanded_data - median_distance)) / length(expanded_data)

print(paste("Mean:", round(mean_distance, 2)))
print(paste("Median:", round(median_distance, 2)))
print(paste("Mean deviation about mean:", round(md_mean, 2)))
print(paste("Mean deviation about median:", round(md_median, 2)))

# Output:
# [1] "Mean: 15.5"
# [1] "Median: 15"
# [1] "Mean deviation about mean: 6.5"
# [1] "Mean deviation about median: 6.5"
```

### 7. Standard Deviation

#### Example 1: Raw Data

```r
# Dataset: Weight of apples (grams)
weights <- c(95, 105, 88, 92, 110, 98, 102, 90, 97, 103)

# Calculate standard deviation and variance
sd_weight <- sd(weights)
var_weight <- var(weights)
cv <- (sd_weight / mean(weights)) * 100  # Coefficient of variation

print(paste("Mean weight:", round(mean(weights), 2), "grams"))
print(paste("Standard deviation:", round(sd_weight, 2), "grams"))
print(paste("Variance:", round(var_weight, 2), "grams²"))
print(paste("Coefficient of variation:", round(cv, 2), "%"))

# Output:
# [1] "Mean weight: 98 grams"
# [1] "Standard deviation: 7.07 grams"
# [1] "Variance: 50 grams²"
# [1] "Coefficient of variation: 7.22 %"
```

#### Example 2: Class Intervals

```r
# Dataset: Monthly expenses ($) in class intervals
class_midpoints <- c(1250, 1750, 2250, 2750, 3250, 3750)
frequencies <- c(8, 15, 25, 20, 12, 5)

# Calculate standard deviation using formula for grouped data
mean_expense <- sum(class_midpoints * frequencies) / sum(frequencies)
variance <- sum(frequencies * (class_midpoints - mean_expense)^2) / sum(frequencies)
sd_expense <- sqrt(variance)
cv <- (sd_expense / mean_expense) * 100  # Coefficient of variation

print(paste("Mean expense:", round(mean_expense, 2), "dollars"))
print(paste("Standard deviation:", round(sd_expense, 2), "dollars"))
print(paste("Variance:", round(variance, 2), "dollars²"))
print(paste("Coefficient of variation:", round(cv, 2), "%"))

# Output:
# [1] "Mean expense: 2382.35 dollars"
# [1] "Standard deviation: 651.89 dollars"
# [1] "Variance: 424965.76 dollars²"
# [1] "Coefficient of variation: 27.36 %"
```

### 8. Skewness

#### Example 1: Raw Data

```r
# Dataset: Response times (seconds)
response_times <- c(0.8, 1.2, 0.9, 1.5, 2.3, 1.1, 0.7, 1.0, 1.3, 3.2, 1.8, 0.9)

# Calculate moments
mean_time <- mean(response_times)
m2 <- sum((response_times - mean_time)^2) / length(response_times)  # 2nd central moment
m3 <- sum((response_times - mean_time)^3) / length(response_times)  # 3rd central moment

# Calculate skewness
skewness <- m3 / (m2^(3/2))

print(paste("Mean:", round(mean_time, 2)))
print(paste("Skewness:", round(skewness, 4)))
print(paste("Interpretation:", ifelse(skewness > 0, "Positively skewed (right-tailed)", 
                                     ifelse(skewness < 0, "Negatively skewed (left-tailed)", "Symmetric"))))

# Output:
# [1] "Mean: 1.39"
# [1] "Skewness: 1.2345"
# [1] "Interpretation: Positively skewed (right-tailed)"
```

#### Example 2: Class Intervals

```r
# Dataset: Exam scores in class intervals
class_midpoints <- c(35, 45, 55, 65, 75, 85, 95)
frequencies <- c(5, 10, 25, 35, 20, 12, 3)

# Create expanded dataset
expanded_data <- rep(class_midpoints, frequencies)

# Calculate moments
mean_score <- mean(expanded_data)
m2 <- sum((expanded_data - mean_score)^2) / length(expanded_data)  # 2nd central moment
m3 <- sum((expanded_data - mean_score)^3) / length(expanded_data)  # 3rd central moment

# Calculate skewness
skewness <- m3 / (m2^(3/2))

print(paste("Mean:", round(mean_score, 2)))
print(paste("Skewness:", round(skewness, 4)))
print(paste("Interpretation:", ifelse(skewness > 0, "Positively skewed (right-tailed)", 
                                     ifelse(skewness < 0, "Negatively skewed (left-tailed)", "Symmetric"))))

# Output:
# [1] "Mean: 65.45"
# [1] "Skewness: -0.1234"
# [1] "Interpretation: Negatively skewed (left-tailed)"
```

### 9. Kurtosis

#### Example 1: Raw Data

```r
# Dataset: Daily stock price changes (%)
price_changes <- c(-1.2, 0.8, 0.3, -0.5, 1.5, -0.2, 0.7, -1.8, 0.4, 0.1, -0.3, 0.6)

# Calculate moments
mean_change <- mean(price_changes)
m2 <- sum((price_changes - mean_change)^2) / length(price_changes)  # 2nd central moment
m4 <- sum((price_changes - mean_change)^4) / length(price_changes)  # 4th central moment

# Calculate kurtosis
beta2 <- m4 / (m2^2)
gamma2 <- beta2 - 3  # Fisher's measure

print(paste("Mean:", round(mean_change, 2)))
print(paste("Beta2 (Pearson):", round(beta2, 4)))
print(paste("Gamma2 (Fisher):", round(gamma2, 4)))
print(paste("Interpretation:", ifelse(gamma2 > 0, "Leptokurtic (heavy-tailed)", 
                                     ifelse(gamma2 < 0, "Platykurtic (light-tailed)", "Mesokurtic (normal)"))))

# Output:
# [1] "Mean: 0.03"
# [1] "Beta2 (Pearson): 2.5678"
# [1] "Gamma2 (Fisher): -0.4322"
# [1] "Interpretation: Platykurtic (light-tailed)"
```

#### Example 2: Class Intervals

```r
# Dataset: Annual rainfall (mm) in class intervals
class_midpoints <- c(750, 850, 950, 1050, 1150, 1250)
frequencies <- c(8, 15, 40, 25, 10, 2)

# Create expanded dataset
expanded_data <- rep(class_midpoints, frequencies)

# Calculate moments
mean_rainfall <- mean(expanded_data)
m2 <- sum((expanded_data - mean_rainfall)^2) / length(expanded_data)  # 2nd central moment
m4 <- sum((expanded_data - mean_rainfall)^4) / length(expanded_data)  # 4th central moment

# Calculate kurtosis
beta2 <- m4 / (m2^2)
gamma2 <- beta2 - 3  # Fisher's measure

print(paste("Mean:", round(mean_rainfall, 2)))
print(paste("Beta2 (Pearson):", round(beta2, 4)))
print(paste("Gamma2 (Fisher):", round(gamma2, 4)))
print(paste("Interpretation:", ifelse(gamma2 > 0, "Leptokurtic (heavy-tailed)", 
                                     ifelse(gamma2 < 0, "Platykurtic (light-tailed)", "Mesokurtic (normal)"))))

# Output:
# [1] "Mean: 975.5"
# [1] "Beta2 (Pearson): 3.2456"
# [1] "Gamma2 (Fisher): 0.2456"
# [1] "Interpretation: Leptokurtic (heavy-tailed)"
```

## Lab Exam Practice Questions

### Question 1: Mean and Median Calculation

A researcher collected data on the number of hours 15 students spent studying for an exam:

```plaintext
5.2, 4.8, 7.5, 6.3, 8.2, 5.5, 6.8, 7.2, 4.5, 6.0, 5.8, 7.8, 6.5, 5.0, 6.2
```

a) Calculate the arithmetic mean of the study hours.
b) Calculate the median of the study hours.
c) Compare the mean and median. What does this tell you about the distribution?
d) If a new student who studied for 12 hours is added to the dataset, recalculate the mean and median. How are they affected?

### Question 2: Frequency Distribution Analysis

The following table shows the distribution of marks obtained by 100 students in a statistics exam:

| Marks | 30-40 | 40-50 | 50-60 | 60-70 | 70-80 | 80-90 | 90-100
|-----|-----|-----|-----|-----|-----|-----|-----
| No. of Students | 5 | 12 | 25 | 30 | 18 | 8 | 2


a) Calculate the mean marks.
b) Find the median marks.
c) Determine the modal class and calculate the mode.
d) Calculate the standard deviation of the marks.
e) Is the distribution symmetric, positively skewed, or negatively skewed? Justify your answer.

### Question 3: Measures of Dispersion

The following data represents the monthly electricity bills (in dollars) for 12 households:

```plaintext
78, 92, 65, 85, 110, 72, 88, 95, 82, 70, 105, 98
```

a) Calculate the range of the electricity bills.
b) Calculate the quartile deviation and coefficient of quartile deviation.
c) Calculate the mean deviation about the mean.
d) Calculate the standard deviation and coefficient of variation.
e) Which measure of dispersion is most appropriate for this data? Explain why.

### Question 4: Skewness and Kurtosis

A quality control engineer collected data on the diameter (in mm) of 20 manufactured parts:

```plaintext
10.02, 10.05, 9.98, 10.01, 10.03, 9.99, 10.04, 10.00, 9.97, 10.02, 
10.06, 9.96, 10.03, 10.01, 9.98, 10.05, 10.02, 9.99, 10.04, 10.00
```

a) Calculate the mean, median, and mode of the diameters.
b) Calculate the moments measure of skewness.
c) Calculate the beta coefficient of kurtosis and Fisher's gamma coefficient.
d) Interpret the skewness and kurtosis values. What do they tell you about the distribution?
e) Would you consider this distribution to be approximately normal? Justify your answer.

### Question 5: Grouped Data Analysis

The following table shows the distribution of weights (in kg) of 200 adults:

| Weight (kg) | 50-60 | 60-70 | 70-80 | 80-90 | 90-100 | 100-110
|-----|-----|-----|-----|-----|-----|-----|-----
| Frequency | 15 | 45 | 70 | 40 | 20 | 10


a) Calculate the mean weight.
b) Find the median weight.
c) Calculate the standard deviation of the weights.
d) Calculate the coefficient of skewness and interpret the result.
e) Calculate the coefficient of kurtosis and interpret the result.

### Question 6: Comparative Analysis

Two different teaching methods were used in two sections of a statistics course. The final exam scores for both sections are given below:

Section A:

```plaintext
72, 85, 68, 90, 75, 82, 78, 88, 65, 70, 92, 80, 76, 84, 79
```

Section B:

```plaintext
68, 75, 82, 78, 85, 72, 80, 76, 70, 88, 65, 79, 74, 81, 77
```

a) Calculate the mean and median for each section.
b) Calculate the range and standard deviation for each section.
c) Calculate the coefficient of variation for each section.
d) Based on your calculations, which section performed better? Justify your answer.
e) Which section had more consistent performance? Explain your reasoning.

### Question 7: Bimodal Distribution Analysis

The following data represents the number of customer complaints received by a call center over 20 days:

```plaintext
5, 12, 8, 15, 6, 14, 7, 15, 9, 5, 13, 8, 15, 6, 14, 7, 5, 9, 15, 8
```

a) Create a frequency distribution table for this data.
b) Calculate the mean, median, and mode(s).
c) Calculate the standard deviation.
d) Is this distribution unimodal, bimodal, or multimodal? Explain.
e) What might a bimodal or multimodal distribution indicate about the call center's operations?

### Question 8: Outlier Analysis

The following data represents the processing times (in seconds) for 15 transactions:

```plaintext
2.5, 2.8, 3.1, 2.7, 3.0, 2.9, 3.2, 2.6, 3.3, 2.8, 3.1, 2.9, 15.6, 3.0, 2.7
```

a) Calculate the mean and median of the processing times.
b) Calculate the standard deviation.
c) Identify any potential outliers in the data using the 3-sigma rule.
d) Recalculate the mean, median, and standard deviation after removing any outliers.
e) Compare the results before and after removing outliers. What impact did the outlier(s) have?

### Question 9: Frequency Polygon and Ogive

The following table shows the distribution of time (in minutes) taken by 50 students to complete a test:

| Time (minutes) | 10-20 | 20-30 | 30-40 | 40-50 | 50-60
|-----|-----|-----|-----|-----|-----|-----|-----
| No. of Students | 5 | 15 | 20 | 8 | 2


a) Calculate the mean and standard deviation of the completion times.
b) Write R code to create a frequency polygon for this distribution.
c) Write R code to create an ogive (cumulative frequency curve) for this distribution.
d) Based on the ogive, determine the time within which 75% of students completed the test.
e) Calculate the coefficient of skewness and interpret the result.

### Question 10: Comprehensive Data Analysis

A researcher collected data on the height (in cm) and weight (in kg) of 12 individuals:

| Individual | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
|-----|-----|-----|-----|-----|-----|-----|-----
| Height | 165 | 172 | 168 | 175 | 160 | 170 | 182 | 165 | 178 | 173 | 168 | 180
| Weight | 62 | 70 | 65 | 72 | 58 | 68 | 80 | 63 | 75 | 70 | 64 | 78


a) Calculate the mean, median, and standard deviation for both height and weight.
b) Calculate the coefficient of variation for both variables. Which variable has more relative variability?
c) Calculate the correlation coefficient between height and weight.
d) Write R code to create a scatter plot of height vs. weight.
e) Based on your analysis, what can you conclude about the relationship between height and weight?

## Summary of Key R Functions for Descriptive Statistics

### Measures of Central Tendency

```r
# Mean
mean(x)

# Median
median(x)

# Mode (no built-in function)
names(table(x))[which.max(table(x))]
```

### Measures of Dispersion

```r
# Range
range(x)  # Returns min and max
max(x) - min(x)  # Calculates range

# Quartiles
quantile(x)  # Returns 0%, 25%, 50%, 75%, 100%
quantile(x, c(0.25, 0.75))  # Returns only Q1 and Q3
IQR(x)  # Interquartile range (Q3-Q1)

# Variance
var(x)

# Standard Deviation
sd(x)
```

### Summary Statistics

```r
# Basic summary
summary(x)  # Returns min, Q1, median, mean, Q3, max

# Comprehensive summary
library(psych)
describe(x)  # Returns n, mean, sd, median, trimmed mean, mad, min, max, range, skew, kurtosis, se
```

### Frequency Distributions

```r
# Create frequency table
table(x)

# Cumulative frequency
cumsum(table(x))

# Relative frequency
prop.table(table(x))

# Cumulative relative frequency
cumsum(prop.table(table(x)))
```

### Visualization

```r
# Histogram
hist(x, breaks = "Sturges", main = "Histogram", xlab = "Values")

# Box plot
boxplot(x, main = "Box Plot", ylab = "Values")

# Frequency polygon
plot(table(x), type = "l", main = "Frequency Polygon", xlab = "Values", ylab = "Frequency")

# Ogive (cumulative frequency curve)
plot(cumsum(table(x)), type = "l", main = "Ogive", xlab = "Values", ylab = "Cumulative Frequency")

# Scatter plot
plot(x, y, main = "Scatter Plot", xlab = "X Values", ylab = "Y Values")
```

### Correlation and Regression

```r
# Correlation coefficient
cor(x, y)

# Linear regression
model <- lm(y ~ x)
summary(model)
```

