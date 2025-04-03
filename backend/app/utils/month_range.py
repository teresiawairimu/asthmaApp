from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

def month_range():
  today = datetime.today()
  date_only = today.date()

  month_before_date = date_only - relativedelta(months=1)
  print(month_before_date)

  return month_before_date

