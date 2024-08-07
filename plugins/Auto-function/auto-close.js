import moment from "moment-timezone";
export async function before(m) {
  try {
    moment.tz.setDefault("Asia/Makassar");
    const chat = db.data.chats?.[m.chat];
    const database = db.data.database.autoclose;
    if (m.isBaileys || !m.text || !chat?.autoClose) return false;
    const jadwalClose = [{
      close: "04:00",
      open: "06:00"
    }, {
      close: "12:00",
      open: "13:00"
    }, {
      close: "15:00",
      open: "16:00"
    }, {
      close: "18:00",
      open: "19:00"
    }, {
      close: "00:00",
      open: "04:00"
    }];
    const groupMeta = await this.groupMetadata(m.chat);
    const isRestricted = groupMeta?.restrict;
    const isAnnounced = groupMeta?.announce;
    const now = moment().tz("Asia/Makassar");
    const currentHour = now.hours();
    const currentMinute = now.minutes();
    const schedule = [];
    for (const time of jadwalClose) {
      const [closeHour, closeMinute] = time.close.split(":");
      const [openHour, openMinute] = time.open.split(":");
      schedule.push({
        hour: parseInt(closeHour),
        minute: parseInt(closeMinute),
        action: "announcement",
        message: "menutup"
      });
      schedule.push({
        hour: parseInt(openHour),
        minute: parseInt(openMinute),
        action: "not_announcement",
        message: "membuka"
      });
    }
    database[m.chat] = database[m.chat] || {};
    database[m.chat]["schedule"] = schedule;
    const nextEvent = null;
    for (const {
        hour,
        minute,
        action,
        message
      }
      of schedule) {
      if (currentHour < hour || currentHour === hour && currentMinute < minute) {
        nextEvent = {
          hour: hour,
          minute: minute,
          action: action,
          message: message
        };
        break;
      }
    }
    if (nextEvent) {
      const {
        hour,
        minute,
        message
      } = nextEvent;
      const nextEventTime = moment().tz("Asia/Makassar").set({
        hour: hour,
        minute: minute
      }).format("HH:mm");
      await this.reply(m.chat, `Jadwal berikutnya: Grup akan ${message} pada pukul ${nextEventTime}`, null);
    }
    setInterval(async () => {
      const now = moment().tz("Asia/Makassar");
      const currentHour = now.hours();
      const currentMinute = now.minutes();
      for (const {
          hour,
          minute,
          action,
          message
        }
        of database[m.chat]?.["schedule"] ?? []) {
        if (currentHour === hour && currentMinute === minute) {
          if (action === "not_announcement" && !isRestricted || action === "announcement" && isRestricted && !isAnnounced) {
            try {
              await this.groupSettingUpdate(m.chat, action);
              await this.reply(m.chat, `Grup telah ${message} sesuai jadwal.`, null);
            } catch (error) {
              console.error(error);
            }
          }
        }
      }
    }, 6e4);
  } catch (error) {
    console.error(error);
  }
}