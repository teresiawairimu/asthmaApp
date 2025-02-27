from faker import Faker
import random
import pandas as pd

fake = Faker()

def generate_fake_users(num_users=10):
    data = {
        "first_name": [fake.first_name() for i in range(num_users)],
        "last_name" : [fake.last_name() for i in range(num_users)],
    }
    data["display_name"] = [f"{data['last_name'][i].lower()}{random.randint(1, 99)}" for i in range(num_users)]
    data["email"] = [f"{data['last_name'][i].lower()}{data['first_name'][i].lower()}@{fake.free_email_domain()}" for i in range(num_users)]
    data["password"] = [fake.password(length= 10, special_chars=True, digits=True, upper_case=True, lower_case=True) for i in range(num_users)]
  
    return pd.DataFrame(data)

num_users = 10

df = generate_fake_users(num_users)
df.to_csv("fake_users.csv", index=False)  




      #print(f"Name: {first_name} {last_name}")
      #print(f"Email: {email}")
      #print(f"password: {password}")
      #print(f"username: {username}")
      #return pd.DataFrame(data)


