import fetch from "node-fetch";
const handler = async (m, {
  conn,
  isOwner,
  usedPrefix,
  command,
  args
}) => {
  let text, ListVoice = ["af-ZA-AdriNeural", "af-ZA-WillemNeural", "am-ET-AmehaNeural", "am-ET-MekdesNeural", "ar-AE-FatimaNeural", "ar-AE-HamdanNeural", "ar-BH-AliNeural", "ar-BH-LailaNeural", "ar-DZ-AminaNeural", "ar-DZ-IsmaelNeural", "ar-EG-SalmaNeural", "ar-EG-ShakirNeural", "ar-IQ-BasselNeural", "ar-IQ-RanaNeural", "ar-JO-SanaNeural", "ar-JO-TaimNeural", "ar-KW-FahedNeural", "ar-KW-NouraNeural", "ar-LB-LaylaNeural", "ar-LB-RamiNeural", "ar-LY-ImanNeural", "ar-LY-OmarNeural", "ar-MA-JamalNeural", "ar-MA-MounaNeural", "ar-OM-AbdullahNeural", "ar-OM-AyshaNeural", "ar-QA-AmalNeural", "ar-QA-MoazNeural", "ar-SA-HamedNeural", "ar-SA-ZariyahNeural", "ar-SY-AmanyNeural", "ar-SY-LaithNeural", "ar-TN-HediNeural", "ar-TN-ReemNeural", "ar-YE-MaryamNeural", "ar-YE-SalehNeural", "az-AZ-BabekNeural", "az-AZ-BanuNeural", "bg-BG-BorislavNeural", "bg-BG-KalinaNeural", "bn-BD-NabanitaNeural", "bn-BD-PradeepNeural", "bn-IN-BashkarNeural", "bn-IN-TanishaaNeural", "bs-BA-GoranNeural", "bs-BA-VesnaNeural", "ca-ES-AlbaNeural", "ca-ES-EnricNeural", "ca-ES-JoanaNeural", "cs-CZ-AntoninNeural", "cs-CZ-VlastaNeural", "cy-GB-AledNeural", "cy-GB-NiaNeural", "da-DK-ChristelNeural", "da-DK-JeppeNeural", "de-AT-IngridNeural", "de-AT-JonasNeural", "de-CH-JanNeural", "de-CH-LeniNeural", "de-DE-AmalaNeural", "de-DE-BerndNeural", "de-DE-ChristophNeural", "de-DE-ConradNeural", "de-DE-ElkeNeural", "de-DE-GiselaNeural", "de-DE-KasperNeural", "de-DE-KatjaNeural", "de-DE-KillianNeural", "de-DE-KlarissaNeural", "de-DE-KlausNeural", "de-DE-LouisaNeural", "de-DE-MajaNeural", "de-DE-RalfNeural", "de-DE-TanjaNeural", "el-GR-AthinaNeural", "el-GR-NestorasNeural", "en-AU-AnnetteNeural", "en-AU-CarlyNeural", "en-AU-DarrenNeural", "en-AU-DuncanNeural", "en-AU-ElsieNeural", "en-AU-FreyaNeural", "en-AU-JoanneNeural", "en-AU-KenNeural", "en-AU-KimNeural", "en-AU-NatashaNeural", "en-AU-NeilNeural", "en-AU-TimNeural", "en-AU-TinaNeural", "en-AU-WilliamNeural", "en-CA-ClaraNeural", "en-CA-LiamNeural", "en-GB-AbbiNeural", "en-GB-AlfieNeural", "en-GB-BellaNeural", "en-GB-ElliotNeural", "en-GB-EthanNeural", "en-GB-HollieNeural", "en-GB-LibbyNeural", "en-GB-MaisieNeural", "en-GB-MiaNeural", "en-GB-NoahNeural", "en-GB-OliverNeural", "en-GB-OliviaNeural", "en-GB-RyanNeural", "en-GB-SoniaNeural", "en-GB-ThomasNeural", "en-HK-SamNeural", "en-HK-YanNeural", "en-IE-ConnorNeural", "en-IE-EmilyNeural", "en-IN-NeerjaNeural", "en-IN-PrabhatNeural", "en-KE-AsiliaNeural", "en-KE-ChilembaNeural", "en-NG-AbeoNeural", "en-NG-EzinneNeural", "en-NZ-MitchellNeural", "en-NZ-MollyNeural", "en-PH-JamesNeural", "en-PH-RosaNeural", "en-SG-LunaNeural", "en-SG-WayneNeural", "en-TZ-ElimuNeural", "en-TZ-ImaniNeural", "en-US-AIGenerate1Neural", "en-US-AIGenerate2Neural", "en-US-AmberNeural", "en-US-AnaNeural", "en-US-AriaNeural", "en-US-AshleyNeural", "en-US-BlueNeural", "en-US-BrandonNeural", "en-US-ChristopherNeural", "en-US-CoraNeural", "en-US-DavisNeural", "en-US-ElizabethNeural", "en-US-EricNeural", "en-US-GuyNeural", "en-US-JacobNeural", "en-US-JaneNeural", "en-US-JasonNeural", "en-US-JennyMultilingualNeural", "en-US-JennyMultilingualV2Neural", "en-US-JennyNeural", "en-US-MichelleNeural", "en-US-MonicaNeural", "en-US-NancyNeural", "en-US-RogerNeural", "en-US-RyanMultilingualNeural", "en-US-SaraNeural", "en-US-SteffanNeural", "en-US-TonyNeural", "en-ZA-LeahNeural", "en-ZA-LukeNeural", "es-AR-ElenaNeural", "es-AR-TomasNeural", "es-BO-MarceloNeural", "es-BO-SofiaNeural", "es-CL-CatalinaNeural", "es-CL-LorenzoNeural", "es-CO-GonzaloNeural", "es-CO-SalomeNeural", "es-CR-JuanNeural", "es-CR-MariaNeural", "es-CU-BelkysNeural", "es-CU-ManuelNeural", "es-DO-EmilioNeural", "es-DO-RamonaNeural", "es-EC-AndreaNeural", "es-EC-LuisNeural", "es-ES-AbrilNeural", "es-ES-AlvaroNeural", "es-ES-ArnauNeural", "es-ES-DarioNeural", "es-ES-EliasNeural", "es-ES-ElviraNeural", "es-ES-EstrellaNeural", "es-ES-IreneNeural", "es-ES-LaiaNeural", "es-ES-LiaNeural", "es-ES-NilNeural", "es-ES-SaulNeural", "es-ES-TeoNeural", "es-ES-TrianaNeural", "es-ES-VeraNeural", "es-GQ-JavierNeural", "es-GQ-TeresaNeural", "es-GT-AndresNeural", "es-GT-MartaNeural", "es-HN-CarlosNeural", "es-HN-KarlaNeural", "es-MX-BeatrizNeural", "es-MX-CandelaNeural", "es-MX-CarlotaNeural", "es-MX-CecilioNeural", "es-MX-DaliaNeural", "es-MX-GerardoNeural", "es-MX-JorgeNeural", "es-MX-LarissaNeural", "es-MX-LibertoNeural", "es-MX-LucianoNeural", "es-MX-MarinaNeural", "es-MX-NuriaNeural", "es-MX-PelayoNeural", "es-MX-RenataNeural", "es-MX-YagoNeural", "es-NI-FedericoNeural", "es-NI-YolandaNeural", "es-PA-MargaritaNeural", "es-PA-RobertoNeural", "es-PE-AlexNeural", "es-PE-CamilaNeural", "es-PR-KarinaNeural", "es-PR-VictorNeural", "es-PY-MarioNeural", "es-PY-TaniaNeural", "es-SV-LorenaNeural", "es-SV-RodrigoNeural", "es-US-AlonsoNeural", "es-US-PalomaNeural", "es-UY-MateoNeural", "es-UY-ValentinaNeural", "es-VE-PaolaNeural", "es-VE-SebastianNeural", "et-EE-AnuNeural", "et-EE-KertNeural", "eu-ES-AinhoaNeural", "eu-ES-AnderNeural", "fa-IR-DilaraNeural", "fa-IR-FaridNeural", "fi-FI-HarriNeural", "fi-FI-NooraNeural", "fi-FI-SelmaNeural", "fil-PH-AngeloNeural", "fil-PH-BlessicaNeural", "fr-BE-CharlineNeural", "fr-BE-GerardNeural", "fr-CA-AntoineNeural", "fr-CA-JeanNeural", "fr-CA-SylvieNeural", "fr-CH-ArianeNeural", "fr-CH-FabriceNeural", "fr-FR-AlainNeural", "fr-FR-BrigitteNeural", "fr-FR-CelesteNeural", "fr-FR-ClaudeNeural", "fr-FR-CoralieNeural", "fr-FR-DeniseNeural", "fr-FR-EloiseNeural", "fr-FR-HenriNeural", "fr-FR-JacquelineNeural", "fr-FR-JeromeNeural", "fr-FR-JosephineNeural", "fr-FR-MauriceNeural", "fr-FR-YvesNeural", "fr-FR-YvetteNeural", "ga-IE-ColmNeural", "ga-IE-OrlaNeural", "gl-ES-RoiNeural", "gl-ES-SabelaNeural", "gu-IN-DhwaniNeural", "gu-IN-NiranjanNeural", "he-IL-AvriNeural", "he-IL-HilaNeural", "hi-IN-MadhurNeural", "hi-IN-SwaraNeural", "hr-HR-GabrijelaNeural", "hr-HR-SreckoNeural", "hu-HU-NoemiNeural", "hu-HU-TamasNeural", "hy-AM-AnahitNeural", "hy-AM-HaykNeural", "id-ID-ArdiNeural", "id-ID-GadisNeural", "is-IS-GudrunNeural", "is-IS-GunnarNeural", "it-IT-BenignoNeural", "it-IT-CalimeroNeural", "it-IT-CataldoNeural", "it-IT-DiegoNeural", "it-IT-ElsaNeural", "it-IT-FabiolaNeural", "it-IT-FiammaNeural", "it-IT-GianniNeural", "it-IT-ImeldaNeural", "it-IT-IrmaNeural", "it-IT-IsabellaNeural", "it-IT-LisandroNeural", "it-IT-PalmiraNeural", "it-IT-PierinaNeural", "it-IT-RinaldoNeural", "ja-JP-AoiNeural", "ja-JP-DaichiNeural", "ja-JP-KeitaNeural", "ja-JP-MayuNeural", "ja-JP-NanamiNeural", "ja-JP-NaokiNeural", "ja-JP-ShioriNeural", "jv-ID-DimasNeural", "jv-ID-SitiNeural", "ka-GE-EkaNeural", "ka-GE-GiorgiNeural", "kk-KZ-AigulNeural", "kk-KZ-DauletNeural", "km-KH-PisethNeural", "km-KH-SreymomNeural", "kn-IN-GaganNeural", "kn-IN-SapnaNeural", "ko-KR-BongJinNeural", "ko-KR-GookMinNeural", "ko-KR-InJoonNeural", "ko-KR-JiMinNeural", "ko-KR-SeoHyeonNeural", "ko-KR-SoonBokNeural", "ko-KR-SunHiNeural", "ko-KR-YuJinNeural", "lo-LA-ChanthavongNeural", "lo-LA-KeomanyNeural", "lt-LT-LeonasNeural", "lt-LT-OnaNeural", "lv-LV-EveritaNeural", "lv-LV-NilsNeural", "mk-MK-AleksandarNeural", "mk-MK-MarijaNeural", "ml-IN-MidhunNeural", "ml-IN-SobhanaNeural", "mn-MN-BataaNeural", "mn-MN-YesuiNeural", "mr-IN-AarohiNeural", "mr-IN-ManoharNeural", "ms-MY-OsmanNeural", "ms-MY-YasminNeural", "mt-MT-GraceNeural", "mt-MT-JosephNeural", "my-MM-NilarNeural", "my-MM-ThihaNeural", "nb-NO-FinnNeural", "nb-NO-IselinNeural", "nb-NO-PernilleNeural", "ne-NP-HemkalaNeural", "ne-NP-SagarNeural", "nl-BE-ArnaudNeural", "nl-BE-DenaNeural", "nl-NL-ColetteNeural", "nl-NL-FennaNeural", "nl-NL-MaartenNeural", "pl-PL-AgnieszkaNeural", "pl-PL-MarekNeural", "pl-PL-ZofiaNeural", "ps-AF-GulNawazNeural", "ps-AF-LatifaNeural", "pt-BR-AntonioNeural", "pt-BR-BrendaNeural", "pt-BR-DonatoNeural", "pt-BR-ElzaNeural", "pt-BR-FabioNeural", "pt-BR-FranciscaNeural", "pt-BR-GiovannaNeural", "pt-BR-HumbertoNeural", "pt-BR-JulioNeural", "pt-BR-LeilaNeural", "pt-BR-LeticiaNeural", "pt-BR-ManuelaNeural", "pt-BR-NicolauNeural", "pt-BR-ValerioNeural", "pt-BR-YaraNeural", "pt-PT-DuarteNeural", "pt-PT-FernandaNeural", "pt-PT-RaquelNeural", "ro-RO-AlinaNeural", "ro-RO-EmilNeural", "ru-RU-DariyaNeural", "ru-RU-DmitryNeural", "ru-RU-SvetlanaNeural", "si-LK-SameeraNeural", "si-LK-ThiliniNeural", "sk-SK-LukasNeural", "sk-SK-ViktoriaNeural", "sl-SI-PetraNeural", "sl-SI-RokNeural", "so-SO-MuuseNeural", "so-SO-UbaxNeural", "sq-AL-AnilaNeural", "sq-AL-IlirNeural", "sr-Latn-RS-NicholasNeural", "sr-Latn-RS-SophieNeural", "sr-RS-NicholasNeural", "sr-RS-SophieNeural", "su-ID-JajangNeural", "su-ID-TutiNeural", "sv-SE-HilleviNeural", "sv-SE-MattiasNeural", "sv-SE-SofieNeural", "sw-KE-RafikiNeural", "sw-KE-ZuriNeural", "sw-TZ-DaudiNeural", "sw-TZ-RehemaNeural", "ta-IN-PallaviNeural", "ta-IN-ValluvarNeural", "ta-LK-KumarNeural", "ta-LK-SaranyaNeural", "ta-MY-KaniNeural", "ta-MY-SuryaNeural", "ta-SG-AnbuNeural", "ta-SG-VenbaNeural", "te-IN-MohanNeural", "te-IN-ShrutiNeural", "th-TH-AcharaNeural", "th-TH-NiwatNeural", "th-TH-PremwadeeNeural", "tr-TR-AhmetNeural", "tr-TR-EmelNeural", "uk-UA-OstapNeural", "uk-UA-PolinaNeural", "ur-IN-GulNeural", "ur-IN-SalmanNeural", "ur-PK-AsadNeural", "ur-PK-UzmaNeural", "uz-UZ-MadinaNeural", "uz-UZ-SardorNeural", "vi-VN-HoaiMyNeural", "vi-VN-NamMinhNeural", "wuu-CN-XiaotongNeural", "wuu-CN-YunzheNeural", "yue-CN-XiaoMinNeural", "yue-CN-YunSongNeural", "zh-CN-XiaochenNeural", "zh-CN-XiaohanNeural", "zh-CN-XiaomengNeural", "zh-CN-XiaomoNeural", "zh-CN-XiaoqiuNeural", "zh-CN-XiaoruiNeural", "zh-CN-XiaoshuangNeural", "zh-CN-XiaoxiaoNeural", "zh-CN-XiaoxuanNeural", "zh-CN-XiaoyanNeural", "zh-CN-XiaoyiNeural", "zh-CN-XiaoyouNeural", "zh-CN-XiaozhenNeural", "zh-CN-YunfengNeural", "zh-CN-YunhaoNeural", "zh-CN-YunjianNeural", "zh-CN-YunxiNeural", "zh-CN-YunxiaNeural", "zh-CN-YunyangNeural", "zh-CN-YunyeNeural", "zh-CN-YunzeNeural", "zh-CN-henan-YundengNeural", "zh-CN-liaoning-XiaobeiNeural", "zh-CN-shaanxi-XiaoniNeural", "zh-CN-shandong-YunxiangNeural", "zh-CN-sichuan-YunxiNeural", "zh-HK-HiuGaaiNeural", "zh-HK-HiuMaanNeural", "zh-HK-WanLungNeural", "zh-TW-HsiaoChenNeural", "zh-TW-HsiaoYuNeural", "zh-TW-YunJheNeural", "zu-ZA-ThandoNeural", "zu-ZA-ThembaNeural"],
    lister = ListVoiceArray(ListVoice),
    query = `Input query!\n\n*Example:*\n${usedPrefix + command} [angka]|[teks]\n\n*Pilih angka yg ada*\n` + String.fromCharCode(8206).repeat(4001) + lister.map((v, index) => "  " + (index + 1) + ". " + v).join("\n");
  if (args.length >= 1) text = args.slice(0).join(" ");
  else {
    if (!m.quoted || !m.quoted?.text) throw query;
    text = m.quoted?.text;
  }
  let [atas, bawah] = text.split("|");
  if (!atas) return m.reply(query);
  if (!bawah) return m.reply(query);
  const {
    short,
    long
  } = getParts(ListVoice, atas);
  m.reply(wait + "\n" + long.replace(/(.+)-(.+)-(.+)Neural/, "$3 ($1-$2)"));
  try {
    let res = await generateVoice(short, long, bawah);
    res && await conn.sendFile(m.chat, res, "audio.mp3", "", m, !0, {
      mimetype: "audio/mp4",
      ptt: !0,
      waveform: [100, 0, 100, 0, 100, 0, 100],
      contextInfo: adReplyS.contextInfo
    });
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["micmonster"], handler.tags = ["misc"], handler.command = /^(micmonster|micmonsterget|micmonsterlist)$/i;
export default handler;

function getParts(array, index) {
  if (isNaN(index) && (index = Number(index), isNaN(index))) return "Indeks harus berupa nomor";
  const text = array[index - 1];
  return {
    short: getLanguage(text),
    long: text
  };
}

function getLanguage(text) {
  return text.split("-").slice(0, 2).join("-");
}

function ListVoiceArray(array) {
  return array.map(item => `${item.replace(/(.+)-(.+)-(.+)Neural/, "$3 ($1-$2)")} ( ${item.split("-")[0]} )`);
}
async function generateVoice(Locale = "id-ID", Voice = "id-ID-ArdiNeural", Query) {
  const formData = new FormData();
  formData.append("locale", Locale), formData.append("content", `<voice name="${Voice}">${Query}</voice>`),
    formData.append("ip", "46.161.194.33");
  const response = await fetch("https://app.micmonster.com/restapi/create", {
    method: "POST",
    body: formData
  });
  return Buffer.from(("data:audio/mpeg;base64," + await response.text()).split(",")[1], "base64");
}