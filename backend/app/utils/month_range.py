from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

def month_range():
  today = datetime.today()
  end_date = today.date()

  start_date = end_date - relativedelta(months=1)
  print(start_date)

  return start_date, end_date

