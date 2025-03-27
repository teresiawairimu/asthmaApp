from datetime import datetime
from dateutil import parser


def parse_date_string(date_string):
  """"""

  try:
    tz_parts = date_string.split("UTC")
    if len(tz_parts) > 1:
      tz_offset = tz_parts[1].strip()
      date_part = tz_parts[0].strip()
      if date_part.endswith("at"):
        date_part = date_part[:-2].strip()

      formats = [
        "%B %d, %Y %I:%M:%S %p",
        "%B %d, %Y",
        "%Y-%m-%d %H:%M:%S",
        "%Y-%m-%d"
      ]

      for fmt in formats:
        try:
          dt = datetime.strptime(date_part, fmt)
          return dt
        except ValueError:
          continue
      
    return parser.parse(date_string)
  except Exception as e:
    raise ValueError(f"Could not parse date string: {date_string}, error: {str(e)}")