import urllib.request, json

url = "https://velvet-and-void.onrender.com/api/auth/forgot"
data = json.dumps({"email": "thexzeditorofficial@gmail.com"}).encode()
req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"}, method="POST")
try:
    with urllib.request.urlopen(req, timeout=15) as r:
        print("STATUS:", r.status)
        print("BODY:", r.read().decode())
except urllib.error.HTTPError as e:
    print("HTTP ERROR:", e.code)
    print("BODY:", e.read().decode())
except Exception as e:
    print("ERROR:", e)
