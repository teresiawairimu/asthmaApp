from datetime import datetime, timedelta

def get_month_start_end(month_range:str):
  start = datetime.strptime(month_range, "%Y-%m")
  
  if start.month == 12:
    end = start.replace(year=start.year + 1, month=1, day=1) - timedelta(days=1)
  else:
    end = start.replace(month=start.month + 1, day=1) - timedelta(days=1)
  return start.date(), end.date()
