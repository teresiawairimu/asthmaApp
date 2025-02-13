from faker import Faker
import random

fake = Faker()

for i in range(10):
  first_name = fake.first_name()
  last_name = fake.last_name()
  username = f"{last_name.lower()}{random.randint(1, 99)}"
  email = f"{last_name.lower()}{first_name.lower()}@{fake.free_email_domain()}"
  password = fake.password(length= 10, special_chars=True, digits=True, upper_case=True, lower_case=True)
  print(f"Name: {first_name} {last_name}")
  print(f"Email: {email}")
  print(f"password: {password}")
  print(f"username: {username}")