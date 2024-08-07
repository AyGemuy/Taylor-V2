import {
  WABetaInfo
} from "../../lib/info/wabetainfo.js";
export async function before(m) {
  const chat = db.data.chats[m.chat];
  if (m.isBaileys || !m.text || !chat.wabetainfo) return !1;
  try {
    if (this.wabetainfo = this.wabetainfo || {}, 0 === Object.keys(this.wabetainfo).length) {
      const response = new WABetaInfo(),
        wbi = await response.home();
      this.wabetainfo.data = wbi[0], this.wabetainfo.state = !0;
    }
    setInterval(async () => {
      try {
        const response = new WABetaInfo(),
          wabeta = await response.home();
        if (JSON.stringify(wabeta[0]) !== JSON.stringify(this.wabetainfo.data) && (this.wabetainfo.state = !1, !this.wabetainfo.state)) {
          this.wabetainfo.data = wabeta[0];
          const txt = `*${wabeta[0]?.title}*\n\n📅 *Date:* ${wabeta[0]?.date}\n📍 *Category:* ${wabeta[0]?.category}\n🚩 *Excerpt:* ${wabeta[0]?.excerpt}\n💡 *Link:* ${wabeta[0]?.readMoreLink}`;
          await this.reply(m.chat, txt.replaceAll("%p", "```"), null), this.wabetainfo.state = !0;
        }
      } catch (error) {
        console.error(error);
      }
    }, 9e5);
  } catch (error) {
    console.error(error);
  }
}