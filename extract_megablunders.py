# read the pdfs and extract the megablunders using regex 

import re
import pandas as pd

# read the pdfs and extract the megablunders using regex 

# read the pdfs and extract the megablunders using regex 

import os
import PyPDF2

# get all the pdfs in the current directory
pdfs = [f for f in os.listdir() if f.endswith('.pdf')]

# create a dataframe to store the megablunders
megablunders = pd.DataFrame(columns=["original_sentence", "error"])

extract_error = r"ORIGINAL SENTENCE:\s*(.+?)\s*ERROR:\s(\w+)"
# read the pdfs and extract the megablunders using regex 
for pdf in pdfs:
    with open(pdf, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        total_text = ""
        for page in reader.pages:
            total_text += page.extract_text()
        total_text = total_text.replace("\n", " ")
        # match the regex
        matches = re.findall(extract_error, total_text)
        megablunders = pd.concat([megablunders, pd.DataFrame(matches, columns=["original_sentence", "error"])])

megablunders.to_csv("megablunders.csv", index=False)
    
