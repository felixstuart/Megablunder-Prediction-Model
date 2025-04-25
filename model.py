import pandas as pd
from sklearn.calibration import LabelEncoder

# 1. Load the data
df = pd.read_csv('./megablunders.csv')

print(df.head())

# encode the error type 
label_encoder = LabelEncoder()
df['error_type'] = label_encoder.fit_transform(df['error_type'])

# 2. Split the data into training and testing sets
