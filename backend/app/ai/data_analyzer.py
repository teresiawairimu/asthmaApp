import datetime



def retrieveDateRange():
  today = datetime.datetime.today()
  date_only = today.date()

  day_of_the_week = today.weekday()

  start_of_the_week = date_only - datetime.timedelta(days=day_of_the_week)
  end_of_the_week = date_only + datetime.timedelta(days=(6 - day_of_the_week))
  print("Start of the week", start_of_the_week)
  print("end", end_of_the_week)
  return start_of_the_week, end_of_the_week