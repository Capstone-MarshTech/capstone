import pandas as pd
import os

current_dir = os.path.dirname(__file__)
input_file_path = os.path.join(current_dir, "../data/demo_original.csv")
output_file_path = os.path.join(current_dir, "../mongodb_uploads/cleaned.csv")

#  read original csv
input_file = input_file_path
output_file = output_file_path


data = pd.read_csv(input_file)

# only keep these columns:
columns_to_keep = ["claim_number",
 "effective_date",
 "cleansed_policyyear",
"total_net_paid",
 "total_net_os",
 "total_net_incurred",
 "open_claim",
"closed_claim",
"zero_value_claim",
"loss_banding",
 "marsh_line_of_business_1",
 "marsh_line_of_business_2"]

#  store the new csv file to mongodb_uploads
selected_data = data[columns_to_keep]
selected_data.to_csv(output_file, index=False)


# feed the mongodb with clean csv
