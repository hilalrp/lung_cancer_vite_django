import requests

# Endpoint API
url = "http://127.0.0.1:8000/api/predict/"

# File gambar yang akan dikirim
file_path = "D:/Documents/A Skripsi/coba/aca_bd_20x_905.jpg"

# Kirim request POST dengan file gambar
with open(file_path, "rb") as file:
    files = {"image": file}
    response = requests.post(url, files=files)

# Print hasil respons
print("Status Code:", response.status_code)
print("Response JSON:", response.json())