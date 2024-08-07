import fetch from "node-fetch";
import crypto from "crypto";
import {
  sizeFormatter
} from "human-readable";
const format = sizeFormatter(),
  handler = async (m, {
    conn,
    args,
    text,
    usedPrefix: _p,
    command,
    isROwner
  }) => {
    const domain = "http://43.133.156.76",
      apikey = "ptla_gyH0Dtbew65OealnuYGURRs77z0Y5Yz5I4WYxISMO1a",
      c_apikey = "ptlc_pDEHGmUXUHxY1FKoh5pVd62a9nAK3VTcZk9fBCopD3y";
    switch (command) {
      case "addusr": {
        if (!isROwner) return dfail("rowner", m, conn);
        let t = text.split(",");
        if (t.length < 1) return m.reply(`\n> Perintah :\n${_p + command} nomor/tag`);
        let u = m.quoted ? m.quoted?.sender : t[0] ? t[0]?.replace(/[^0-9]/g, "") + "@s.whatsapp.net" : m.mentionedJid[0],
          dms = nomorown + "@s.whatsapp.net";
        if (!u) return m.reply(`*Format salah!*\n\n> Perintah : ${_p + command} nomer/tag`);
        let d = (await conn.onWhatsApp(u.split("@")[0]))[0] || {},
          profil = d.exists ? crypto.randomBytes(2).toString("hex") : t[2],
          password = d.exists ? crypto.randomBytes(3).toString("hex") : t[3],
          f = await fetch(domain + "/api/application/users", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey
            },
            body: JSON.stringify({
              email: "anu" + profil.toString() + "@gmail.com",
              username: "anu" + profil.toString(),
              first_name: "anu" + profil.toString(),
              last_name: "anu",
              language: "en",
              password: "hehe" + password.toString()
            })
          }),
          data = await f.json();
        if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
        let user = data.attributes;
        await conn.reply(m.chat, `\n*===[ Sukses Membuat Akun ]===*\n\nId: ${user.id}\nUsername: ${user.username}\nDetail Dikirim Ke : @${u.split("@")[0]}`, m, {
          mentions: [u]
        });
        await conn.sendMessage(u, {
          text: `*===[ Pesanan Panel ]===*\n\nId: ${user.id}                \nUsername: ${user.username}\nPassword: hehe${password}\nLogin: http://43.133.156.76\nAktif : 1 Bulan\n`
        }), conn.sendMessage(dms, {
          text: `*===[ Pesanan Panel ]===*\n\nAkun Punya : @${u.split("@")[0]} \nId: ${user.id}\n\nEmail: ${user.email}\nUsername: ${user.username}\nPassword: ${password}\nDibuat: ${user.created_at}\n`
        }), conn.sendMessage(u, {
          text: "*===[ Peringatan ]===*\n\nGunakan Dengan Sebaik Mungkin, Simpan Informasi Akun Karna Jika Hilang Maka Bukan Tanggung Jawab Kami!\n\n- Dilarang Menjual Kembali\n- Dilarang Menyebarkan Akun\n- Dilarang Menggunakan Berlebihan\n- Jika Terjadi Error Segera Lapor\n\n- Garansi 5Hari\n-Admin : 085760451683"
        });
      }
      break;
      case "delusr": {
        if (!isROwner) return dfail("rowner", m, conn);
        let usr = args[0];
        if (!usr) return m.reply("Masukkan ID");
        let f = await fetch(domain + "/api/application/users/" + usr, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey
          }
        });
        if ((f.ok ? {
            errors: null
          } : await f.json()).errors) return m.reply("*User Tidak Terdaftar*");
        m.reply("*Sukses Menghapus User*");
      }
      break;
      case "detusr": {
        let usr = args[0],
          f = await fetch(domain + "/api/application/users/" + usr, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey
            }
          }),
          res = await f.json();
        if (res.errors) return m.reply("*User Tidak Ada*");
        let u = res.attributes;
        m.reply(`*${u.username.toUpperCase()} Detail User*\n\n\`\`\`ID: ${u.id}\nUUID: ${u.uuid}\nUsername: ${u.username}\nEmail: ${u.email}\nName: ${u.first_name} ${u.last_name}\nLanguage: ${u.language}\nAdmin: ${u.root_admin}\nDibuat: ${u.created_at}\`\`\``);
      }
      break;
      case "addsrv": {
        if (!isROwner) return dfail("rowner", m, conn);
        let s = text.split(",");
        if (s.length < 7) return m.reply(`> Perintah :\n\n${_p + command} name,desc,userId,eggId,locId,memory/disk,cpu`);
        let name = s[0],
          desc = s[1] || "",
          usr_id = s[2],
          egg = s[3],
          loc = s[4],
          memo_disk = s[5].split`/`,
          cpu = s[6],
          f1 = await fetch(domain + "/api/application/nests/6/eggs/" + egg, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey
            }
          }),
          startup_cmd = (await f1.json(), "${CMD_RUN}"),
          f = await fetch(domain + "/api/application/servers", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey
            },
            body: JSON.stringify({
              name: name,
              description: desc,
              user: usr_id,
              egg: parseInt(egg),
              docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
              startup: startup_cmd,
              environment: {
                INST: "npm",
                USER_UPLOAD: "0",
                AUTO_UPDATE: "0",
                CMD_RUN: "node index.js"
              },
              limits: {
                memory: memo_disk[0],
                swap: 0,
                disk: memo_disk[1],
                io: 500,
                cpu: cpu
              },
              feature_limits: {
                databases: 0,
                backups: 1,
                allocations: 0
              },
              deploy: {
                locations: [parseInt(loc)],
                dedicated_ip: !1,
                port_range: []
              }
            })
          }),
          res = await f.json();
        if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2));
        let server = res.attributes;
        m.reply(`*== [ Info Server Dibuat ] ==*\n\nType: ${res.object}\nID: ${server.id}\nName: ${server.name}\nDescription: ${server.description}\nMemory: ${0 === server.limits.memory ? "Unlimited" : server.limits.memory} Mb\nDisk: ${0 === server.limits.disk ? "Unlimited" : server.limits.disk} Mb\nCpu: ${server.limits.cpu}%\nDibuat: ${server.created_at}\nExpired: 1 Bulan`);
      }
      break;
      case "delsrv": {
        if (!isROwner) return dfail("rowner", m, conn);
        let srv = args[0];
        if (!srv) return m.reply("ID nya mana?");
        let f = await fetch(domain + "/api/application/servers/" + srv, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey
          }
        });
        if ((f.ok ? {
            errors: null
          } : await f.json()).errors) return m.reply("*Server Tidak Ditemukan*");
        m.reply("*Sukses Menghapus Server*");
      }
      break;
      case "detsrv": {
        let srv = args[0],
          f = await fetch(domain + "/api/application/servers/" + srv, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey
            }
          }),
          res = await f.json();
        if (res.errors) return m.reply("*Server Tidak Ditemukan*");
        let s = res.attributes,
          f2 = await fetch(domain + "/api/client/servers/" + s.uuid.split("-")[0] + "/resources", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + c_apikey
            }
          }),
          t = (await f2.json()).attributes;
        m.reply(`*${s.name.toUpperCase()} Detail Server*\n\n\`\`\`Status: ${t.current_state}\n\nID: ${s.id}\nUUID: ${s.uuid}\nName: ${s.name}\nDesc: ${s.description}\nMemory: ${await format(t.resources.memory_bytes).toString()} / ${0 === s.limits.memory ? "Unlimited" : s.limits.memory + "Mb"}\nDisk: ${await format(t.resources.disk_bytes).toString()} / ${0 === s.limits.disk ? "Unlimited" : s.limits.disk + "Mb"}\nCpu: ${t.resources.cpu_absolute}% / ${0 === s.limits.cpu ? "Unlimited" : s.limits.cpu + "%"}\nDibuat: ${s.created_at}\`\`\``);
      }
      break;
      case "updatesrv": {
        if (!isROwner) return dfail("rowner", m, conn);
        let t = text.split(",");
        if (t.length < 4) return m.reply(`Perintah :\n\n${_p + command} srvId,locId,memory/disk,cpu`);
        let srv = t[0],
          loc = t[1],
          memo_disk = t[2].split`/`,
          cpu = t[3],
          f1 = await fetch(domain + "/api/application/servers/" + srv, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey
            }
          }),
          data = await f1.json(),
          f = await fetch(domain + "/api/application/servers/" + srv + "/build", {
            method: "PATCH",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey
            },
            body: JSON.stringify({
              allocation: parseInt(loc) || data.attributes.allocation,
              memory: memo_disk[0] || data.attributes.limits.memory,
              swap: data.attributes.limits.swap || 0,
              disk: memo_disk[1] || data.attributes.limits.disk,
              io: 500,
              cpu: cpu || data.attributes.limits.cpu,
              threads: null,
              feature_limits: {
                databases: 5,
                allocations: 5,
                backups: 5
              }
            })
          }),
          res = await f.json();
        if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2));
        let server = res.attributes;
        m.reply(`*Update Server Info*\n\nType: ${res.object}\n\nID: ${server.id}\nUUID: ${server.uuid}\nName: ${server.name}\nDesc: ${server.description}\nMemory: ${0 === server.limits.memory ? "Unlimited" : server.limits.memory} Mb\nDisk: ${0 === server.limits.disk ? "Unlimited" : server.limits.disk} Mb\nCpu: ${server.limits.cpu}%\nDibuat: ${server.created_at}\nDiupdate: ${server.updated_at}`);
      }
      break;
      case "startsrv":
      case "stopsrv":
      case "restartsrv": {
        let action = command.replace("srv", "");
        if (!isROwner) return dfail("rowner", m, conn);
        let srv = args[0];
        if (!srv) return m.reply("ID nya mana?");
        let f = await fetch(domain + "/api/client/servers/" + srv + "/power", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + c_apikey
            },
            body: JSON.stringify({
              signal: action
            })
          }),
          res = f.ok ? {
            errors: null
          } : await f.json();
        if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2));
        m.reply(`*Sukses ${action.toUpperCase()} THE SERVER*`);
      }
    }
  };
handler.help = ["addusr", "delusr", "listusr", "detusr", "addsrv", "delsrv", "listsrv", "detsrv", "reinstall", "updatesrv", "startsrv", "stopsrv", "restartsrv"],
  handler.command = ["addusr", "delusr", "listusr", "detusr", "addsrv", "delsrv", "listsrv", "detsrv", "reinstall", "updatesrv", "startsrv", "stopsrv", "restartsrv"],
  handler.tags = ["owner"], handler.owner = !0;
export default handler;