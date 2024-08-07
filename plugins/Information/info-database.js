import _ from "lodash";
const handler = async (m, {
  conn
}) => {
  try {
    const {
      users
    } = db.data;
    const totalUsers = _.keys(users).length;
    const interactingUsers = _.sumBy(_.values(users), user => user.registered ? 1 : 0);
    const bannedUsers = _.sumBy(_.values(users), user => user.banned ? 1 : 0);
    const premiumUsers = _.sumBy(_.values(users), user => user.premium ? 1 : 0);
    const newsletterMetadata = await conn.newsletterMetadata("invite", "0029VaGPJX78KMqdHoamtJ22");
    const totalFollowers = newsletterMetadata.thread_metadata.subscribers_count;
    const percentFollowers = (totalFollowers / totalUsers * 100).toFixed(2);
    const message = `
📊 *DATABASE BOT* 🤖

*Total User:* ${totalUsers}
*User Registered:* ${interactingUsers} (${(interactingUsers / totalUsers * 100).toFixed(2)}%)
*User Banned:* ${bannedUsers} (${(bannedUsers / totalUsers * 100).toFixed(2)}%)
*User Premium:* ${premiumUsers} (${(premiumUsers / totalUsers * 100).toFixed(2)}%)
*Total pengikut newsletter:* ${totalFollowers} (${percentFollowers}% dari total user)
`;
    await conn.reply(m.chat, message, m);
  } catch (error) {
    console.error(error);
    await m.reply("Terjadi kesalahan saat mengambil informasi database.");
  }
};
handler.help = ["database", "user"];
handler.tags = ["info"];
handler.command = /^(database|jumlahdatabase|user)$/i;
handler.limit = true;
export default handler;