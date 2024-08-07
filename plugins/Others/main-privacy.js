import pkg from "@whiskeysockets/baileys";
const {
  WA_DEFAULT_EPHEMERAL
} = pkg;
const handler = async (m, {
  conn,
  args,
  usedPrefix
}) => {
  const validValues = {
    lastseen: ["all", "contacts", "contact_blacklist", "none"],
    online: ["all", "match_last_seen"],
    picture: ["all", "contacts", "contact_blacklist", "none"],
    status: ["all", "contacts", "contact_blacklist", "none"],
    readreceipts: ["all", "none"],
    groupsadd: ["all", "contacts", "contact_blacklist", "none"],
    disappearingmode: [WA_DEFAULT_EPHEMERAL, 0, 86400, 604800, 7776e3]
  };
  const typeKeys = Object.keys(validValues);
  const helpMessage = `Cara Penggunaan: ${usedPrefix}setprivacy [type_number] [value_number]\n\nDaftar Type:\n` + typeKeys.map((type, index) => `${index + 1}. ${type}`).join("\n");
  if (!args[0] || isNaN(args[0]) || args[0] < 1 || args[0] > typeKeys.length) {
    const typeButtons = conn.ctaButton.setBody("Pilih jenis pengaturan privasi di bawah ini:").addSelection("Pilih di sini").makeSections("Pengaturan Privasi", "jenis_privasi");
    for (const [index, type] of typeKeys.entries()) {
      typeButtons.makeRow("", type.charAt(0).toUpperCase() + type.slice(1), `Pilih ${type}`, `.setprivacy ${index + 1}`);
    }
    return typeButtons.run(m.chat, conn, m);
  }
  const typeNumber = parseInt(args[0]);
  const selectedType = typeKeys[typeNumber - 1];
  const validTypeValues = validValues[selectedType];
  const typeHelpMessage = `Cara Penggunaan: ${usedPrefix}setprivacy [type_number] [value_number]\n\nDaftar Value:\n` + validTypeValues.map((value, index) => `${index + 1}. ${value}`).join("\n");
  if (!args[1] || isNaN(args[1]) || args[1] < 1 || args[1] > validTypeValues.length) {
    const valueButtons = conn.ctaButton.setBody(`Pilih nilai untuk ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} di bawah ini:`).addSelection("Pilih di sini").makeSections("Nilai Privasi", "nilai_privasi");
    for (const [index, value] of validTypeValues.entries()) {
      valueButtons.makeRow("", value, `Pilih ${value}`, `.setprivacy ${typeNumber} ${index + 1}`);
    }
    return valueButtons.run(m.chat, conn, m);
  }
  const valueNumber = parseInt(args[1]);
  const selectedValue = validTypeValues[valueNumber - 1];
  const privacyType = selectedType.charAt(0).toUpperCase() + selectedType.slice(1);
  try {
    switch (selectedType) {
      case "lastseen":
        await conn.updateLastSeenPrivacy(selectedValue);
        break;
      case "online":
        await conn.updateOnlinePrivacy(selectedValue);
        break;
      case "picture":
        await conn.updateProfilePicturePrivacy(selectedValue);
        break;
      case "status":
        await conn.updateStatusPrivacy(selectedValue);
        break;
      case "readreceipts":
        await conn.updateReadReceiptsPrivacy(selectedValue);
        break;
      case "groupsadd":
        await conn.updateGroupsAddPrivacy(selectedValue);
        break;
      case "disappearingmode":
        await conn.updateDefaultDisappearingMode(selectedValue);
        break;
    }
    m.reply(`Privacy ${privacyType} telah diubah menjadi ${selectedValue}`);
  } catch {
    m.reply(`Tidak dapat mengubah privacy ${privacyType}`);
  }
};
handler.help = ["setprivacy"];
handler.tags = ["main"];
handler.command = /^(setprivacy)$/i;
export default handler;