import requests
import hashlib
import time
import base64
import json

challenge_url = "https://backend.discord.id/challenge"
lookup_url = "https://backend.discord.id/lookup"

discord_id = "ID_here" # coloque aqui o ID do discord da pessoa | enter the person's Discord ID here
token = "bot token here" # enter your Discord bot token here | insira seu token do bot do Discord aqui (REQUIRED | OBRIGATÓRIO)

headers = {
    "User-Agent": "Mozilla/5.0 (Linux; Android 10)",
    "Origin": "https://discord.id",
    "Referer": "https://discord.id/"
}

res = requests.get(challenge_url, headers=headers)
data = res.json()

challenge = data["challenge"]
salt = data["salt"]
max_number = data["maxNumber"]
signature = data["signature"]

start = time.time()
number_found = None

for i in range(max_number):

    tests = [
        f"{salt}{i}",
        f"{salt}:{i}",
        f"{i}{salt}",
        f"{challenge}{i}{salt}",
        f"{salt}{challenge}{i}",
        f"{i}:{salt}"
    ]

    for t in tests:
        hashed = hashlib.sha256(t.encode()).hexdigest()

        if hashed == challenge:
            number_found = i
            break

    if number_found is not None:
        break

took = int((time.time() - start) * 1000)

if number_found is None:
    print("Número não encontrado | Number not found")
    exit()

result = {
    "algorithm": "SHA-256",
    "challenge": challenge,
    "number": number_found,
    "salt": salt,
    "signature": signature,
    "took": took
}

proof = base64.b64encode(
    json.dumps(result, separators=(",", ":")).encode()
).decode()

payload = {
    "discord_id": discord_id,
    "proof": proof,
    "token": token
}

lookup_headers = {
  'User-Agent': "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36",
  'Accept-Encoding': "gzip, deflate, br, zstd",
  'Content-Type': "application/json",
  'sec-ch-ua-platform': "\"Android\"",
  'sec-ch-ua': "\"Chromium\";v=\"140\", \"Not=A?Brand\";v=\"24\", \"Google Chrome\";v=\"140\"",
  'sec-ch-ua-mobile': "?1",
  'origin': "https://discord.id",
  'sec-fetch-site': "same-site",
  'sec-fetch-mode': "cors",
  'sec-fetch-dest': "empty",
  'referer': "https://discord.id/",
  'accept-language': "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
  'priority': "u=1, i"
}

response = requests.post(
    lookup_url,
    data=json.dumps(payload),
    headers=lookup_headers
)

data = response.json()
print(json.dumps(data, indent=2, ensure_ascii=False))