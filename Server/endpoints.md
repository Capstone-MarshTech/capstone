----------------------------------------------------------------------------------------------------------------
COUNTS - Remember to replace year
----------------------------------------------------------------------------------------------------------------


1. Number of Total Claims - All years
http://localhost:1337/counts/distinct_claims_count

2. Number of Total Claims by Policy Year
http://localhost:1337/counts/distinct_claims_count/2018

3. Number of claims by Policy Year - Open
http://localhost:1337/counts/open_count/2017

4. Number of claims by Policy Year - Closed
http://localhost:1337/counts/closed_count/2018

5. Number of Zero Value Claims by Policy Year
http://localhost:1337/counts/zero_value_count/2017

6. Number of Zero Value Claims By Line Of Busines By Year
http://localhost:1337/counts/zero_value_count_by_line_of_business/2017?marsh_line_of_business_1=Casualty

7. Number of Claims By Line Of Business By Year
http://localhost:1337/counts/distinct_claims_count_by_line_of_business/2018?marsh_line_of_business_1=Casualty

8. Number of Claims By Line Of Business
http://localhost:1337/counts/distinct_claims_count_by_line_of_business?=Casualty&marsh_line_of_business_1=Property

9. Number of Open Claims By Line of Business By Year
http://localhost:1337/counts/open_count_by_line_of_business/2018?marsh_line_of_business_1=Casualty

10. Number of Closed Claims By Line Of Business By Year
http://localhost:1337/counts/closed_count_by_line_of_business/2018?marsh_line_of_business_1=Casualty



----------------------------------------------------------------------------------------------------------------
METRICS - Remember to replace year
----------------------------------------------------------------------------------------------------------------



1. Total Paid by Policy Year
http://localhost:1337/metrics/total_net_paid/2017


2. Largest Claim by Policy Year
http://localhost:1337/metrics/largest_incurred/2017


3. Total Outstanding by Policy Year
http://localhost:1337/metrics/total_outstanding/2017


4. Total Incurred - All Years
http://localhost:1337/metrics/total_incurred

5. Total Incurred by Policy Years
http://localhost:1337/metrics/total_incurred/2018

6. Total Net Paid By Line Of Business By Year
http://localhost:1337/metrics/total_net_paid_by_line_of_business/2018?marsh_line_of_business_1=Casualty

7. Total Outstanding By Line Of Business By Year
http://localhost:1337/metrics/total_outstanding_by_line_of_business/2018?marsh_line_of_business_1=Casualty

8. Total Incurred By Line Of Business
http://localhost:1337/metrics/total_incurred_by_line_of_business?marsh_line_of_business_1=Casualty

9. Total Incurred By Line Of Business By Year
http://localhost:1337/metrics/total_incurred_by_line_of_business?marsh_line_of_business_1=Casualty

10. Largest Incurred by Line Of Business By Year
http://localhost:1337/metrics/largest_incurred_by_line_of_business/2018?marsh_line_of_business_1=Casualty


---------------------------------------------------------------------------------------------------------------
Statistics - Replace the range of amounts
---------------------------------------------------------------------------------------------------------------



1. Largest Claims by Loss Banding 
http://localhost:1337/statistics/largest_claim_by?loss_banding=25,001 to 50,000

2. Largest Claim By Year By Loss Banding
http://localhost:1337/statistics/largest_claim_by/2017?loss_banding=25,001 to 50,000

3. Average Total Incurred by Loss Banding
http://localhost:1337/statistics/average_total_incurred_by?loss_banding=25,001 to 50,000

4. Average Total Incurred By Policy Year By Loss Banding
http://localhost:1337/statistics/average_total_incurred_by/2017?loss_banding=25,001 to 50,000

5. Number of Claims by Loss Banding
http://localhost:1337/statistics/number_of_claims_by?loss_banding=25,001 to 50,000

6. Number Of Claims by Year By Loss Banding
http://localhost:1337/statistics/number_of_claims_by/2017?loss_banding=25,001 to 50,000

7. Total Incurred By Loss Banding
http://http://localhost:1337/statistics/total_incurred_by?loss_banding=100,001 to 250,000

8. Total Incurred By Policy Year By Loss Banding
http://localhost:1337/statistics/total_incurred_by/2017?loss_banding=100,001 to 250,000

9. Loss Banding Values By Year
http://localhost:1337/statistics/loss_banding_values_by/2018

10. Largest Claim by Loss Banding By Product Line
http://localhost:1337/statistics/largest_claim_by_loss_banding_by_product_line?marsh_line_of_business_1=Casualty&loss_banding=50,001 to 100,000

11. Total Incurred By Loss Banding By Product Line
http://localhost:1337/statistics/total_incurred_by_loss_banding_by_product_line?marsh_line_of_business_1=Casualty&loss_banding=50,001 to 100,000

12. Number Of Claims By Loss Banding By Product Line
http://localhost:1337/statistics/number_of_claims_by_loss_banding_by_product_line?marsh_line_of_business_1=Casualty&loss_banding=50,001 to 100,000

13. Average Total Incurred By Loss Banding By Product Line
http://localhost:1337/statistics/average_total_incurred_by_loss_banding_by_product_line?marsh_line_of_business_1=Casualty&loss_banding=50,001 to 100,000


---------------------------------------------------------------------------------------------------------------
Dropdowns
---------------------------------------------------------------------------------------------------------------


1. lients (Dropdown)
http://localhost:1337/dropdowns/clients

2. Years (Dropdown)
http://localhost:1337/dropdowns/years

3. Loss Banding Values (Dropdown)
http://localhost:1337/dropdowns/loss_banding_values

4. Marsh Line Of Business 1 (Dropdown)
http://localhost:1337/dropdowns/marsh_line_of_business_1

5. Marsh Line Of Business 2 (Dropdown)
http://localhost:1337/dropdowns/marsh_line_of_business_2

6. Loss Banding Values By Property Line
http://localhost:1337/dropdowns/loss_banding_values_by_product_line?marsh_line_of_business_1=Motor
