from datetime import datetime, timedelta

def get_current_month_range():
  today = datetime.today()
  start = today.replace(day=1)
  
  if start.month == 12:
    end = start.replace(year=start.year + 1, month=1, day=1) - timedelta(days=1)
  else:
    end = start.replace(month=start.month + 1, day=1) - timedelta(days=1)
  return start.date(), end.date()
