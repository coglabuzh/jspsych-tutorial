############## Analysis Circle or Square? Task ##############

#install packages 
library(rjson)
library(dplyr)
library(smartr)
library(ggplot2)

json_files <- list.files(pattern = "*.json", path = paste(getwd(),"Downloads", sep = "/"), full.names = T)
word_files <- json_files[grepl("Circle or Square", json_files)]

# Convert the json file to a data frame and filter for behavioral data, correct responses and only experimental trials 
words_result <- read_json_data(word_files[1]) %>% 
  filter(procedure == "experiment")

ggplot(data = words_result,
       aes(y = rt, x = as.factor(animacy), fill = correct)) +
  geom_boxplot()

# average proportion correct
words_result %>% group_by(animacy) %>% summarise(pCorr = mean(correct), n = n())

# mean & sd of correct response times
words_result %>% group_by(animacy) %>%  filter(correct == T) %>%  summarise(meanRT = mean(rt), sdRT = sd(rt))


# Exclude columns we don't need 
words_result <- letter_result %>% 
  select(-c(1:9, 11, 12, 16:29))

# Convert rt to seconds and create a new column for the converted RTs
words_result <- letter_result %>%
  mutate(rt_seconds = rt/ 1000)

# Calculate the mean and standard deviation of the RTs
mean_rt <- mean(words_result$rt_seconds)
sd_rt <- sd(words_result$rt_seconds)

# Create a plot of the RTs
plot_Table <- words_result[, c("trial_number", "rt_seconds")]

ggplot(plot_Table, aes(x = trial_number, y = rt_seconds)) +
  geom_point() + 
  geom_line() +  
  labs(title = "Reaction Time Over Trials",
       x = "Trial Number", 
       y = "Reaction Time (seconds)") +
  ylim(0, 1) +  
  theme_minimal() 
