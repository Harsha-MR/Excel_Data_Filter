import pandas as pd
import sys
import json

def get_unique_values(file_path, column):
    # Read the Excel file
    df = pd.read_excel(file_path)
    
    # Get all values for the specified column, including duplicates
    values = df[column].tolist()
    
    # Remove any NaN values and convert to strings
    values = [str(val) for val in values if pd.notna(val)]
    
    # Sort the values
    values.sort()
    
    return values

if __name__ == "__main__":
    file_path = sys.argv[1]
    column = sys.argv[2]
    
    result = get_unique_values(file_path, column)
    print(json.dumps(result)) 