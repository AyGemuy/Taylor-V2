import axios from "axios";
import crypto from "crypto";
import md5 from "md5";
const handler = async (m, {
  conn,
  text,
  args,
  usedPrefix,
  command
}) => {
  let effecttxt = ["ai_painting", "ai_painting_anime_entry", "ai_painting_anime_img_entry", "ai_painting_anime_video_entry", "ai_painting_anime_zplan_entry", "ai_painting_children_day", "ai_painting_children_day_entry", "ai_painting_children_day_prefetch", "ai_painting_familyname", "ai_painting_familyname_degrade", "ai_painting_familyname_entry", "ai_painting_familyname_get_unlock_status", "ai_painting_familyname_postprocess", "ai_painting_familyname_prefetch", "ai_painting_familyname_unlock_style", "ai_painting_graduate", "ai_painting_graduate_entry", "ai_painting_graduate_entry_test", "ai_painting_graduate_prefetch", "ai_painting_graduate_s2", "ai_painting_graduate_s2_degrade", "ai_painting_graduate_s2_entry", "ai_painting_graduate_s2_prefetch", "ai_painting_graduate_test", "ai_painting_house_entry", "ai_painting_house_prefetch", "ai_painting_midautumn", "ai_painting_midautumn_degrade", "ai_painting_midautumn_entry", "ai_painting_midautumn_prefetch", "ai_painting_nationalday", "ai_painting_nationalday_degrade", "ai_painting_nationalday_entry", "ai_painting_nationalday_prefetch", "ai_painting_nationalday_query_count", "ai_painting_peach_blossom", "ai_painting_peach_blossom_degrade", "ai_painting_peach_blossom_entry", "ai_painting_peach_blossom_prefetch", "ai_painting_peach_blossom_user_info", "ai_painting_prefetch", "ai_painting_spring_entry", "ai_painting_spring_img_entry", "ai_painting_spring_test_entry", "ai_painting_spring_video_entry", "aiplay_ai_painting", "aiplay_ai_painting_anime_entry", "aiplay_ai_painting_children_day_entry", "aiplay_ai_painting_children_day_entry_xworld", "aiplay_ai_painting_children_day_prefetch", "aiplay_ai_painting_cyberpunk", "aiplay_ai_painting_cyberpunk_xworld", "aiplay_ai_painting_graduate_entry", "aiplay_ai_painting_graduate_prefetch", "aiplay_ai_painting_graduate_s2_entry", "aiplay_ai_painting_graduate_s2_entry_xworld", "aiplay_ai_painting_graduate_s2_prefetch", "aiplay_ai_painting_midautumn_entry", "aiplay_ai_painting_midautumn_prefetch", "aiplay_ai_painting_peach_blossom_entry", "aiplay_ai_painting_peach_blossom_entry_xworld", "aiplay_ai_painting_peach_blossom_prefetch", "aiplay_ai_painting_prefetch", "aiplay_ai_painting_xworld", "anime_filter_ugatit", "baby_face_safetest", "bachelor_funny_video", "bald_fuwa", "become_child_entry", "become_child_entry_img", "become_child_mix_entry", "become_disney_entry", "become_disney_entry_ws", "blythe_doll", "blythe_doll_halloween", "body_detect", "cameraproperty_ai_painting_520", "cameraproperty_ai_painting_peach_blossom", "cameraproperty_ar_bg", "cameraproperty_test", "cartoon_multi_person", "cartoon_multi_person", "cartoon_multi_person_inference", "comic2real", "deep_face_3d", "deep_face_3d_v2", "different_dimension_me_img_entry", "different_dimension_me_uinfo", "disney_baby_inference", "disney_baby_safetest", "disney_face", "disney_face_inference", "disney_face_safetest", "dog_cat_detection", "expression_migration_cpu", "expression_migration_cpu_dance", "expression_migration_cpu_nocrop", "expression_migration_cpu_safetest", "expression_package_cpu_demo", "expression_package_demo_entry", "face_matching_entry_crop", "face_recognition", "face_rect_detect", "face_swap_cpu", "face_swap_cpu_goddessday", "face_swap_cpu_halloween", "face_swap_cpu_nationalday", "face_swap_cpu_nationalday_v2", "face_swap_cpu_newmodel_ptunative", "face_swap_cpu_test", "face_swap_cpu_v2", "face_swap_entry", "face_swap_entry_goddessday", "face_swap_entry_halloween", "face_swap_entry_menghualu", "face_swap_entry_nationalday", "face_swap_entry_test", "font_generate", "font_generate_520", "funny_video_dance", "funny_video_new", "funny_video_safetest", "gender_classify", "gender_classify", "h5_april_fool", "hair_segmentation", "hand_painting", "head_segmentation", "head_segmentation_onnx", "head_segmentation_single", "hok_destiny_hero", "hok_destiny_hero_img", "image_feature_homology", "image_feature_homology", "image_feature_homology", "image_restore", "imgs2ttf", "inspiration_3d_album", "inspiration_ai_painting_anime", "inspiration_ai_painting_cyberpunk", "inspiration_anime_hairstyle", "inspiration_anime_hairstyle_2nd", "inspiration_anime_hairstyle_2nd_entry", "inspiration_anime_hairstyle_entry", "inspiration_april_fool", "inspiration_april_fool_no_cover", "inspiration_camera_move_3d_entry", "inspiration_chenlun", "inspiration_comic", "inspiration_expression_cpu", "inspiration_expression_entry", "inspiration_face_swap_cpu", "inspiration_face_swap_entry", "inspiration_face_swap_entry_clj", "inspiration_face_swap_entry_xhcl", "inspiration_face_swap_famous_painting_entry", "inspiration_face_swap_famous_painting_img_ver_entry", "inspiration_face_swap_worldcup_img_ver_entry", "inspiration_gan_expression", "inspiration_head_segmentation_single", "inspiration_oil_painting", "inspiration_original_painting_comic", "inspiration_original_painting_comic_lv2", "inspiration_original_painting_comic_triple", "inspiration_portrait_segmentation", "inspiration_portrait_shadow", "inspiration_pose_trans_ultraman", "inspiration_rainbow_rain", "inspiration_semi_conv", "inspiration_sketch_generation", "inspiration_slam_dunk_gan", "inspiration_slam_dunk_gan_2022", "inspiration_spring_ar", "inspiration_spring_stylegan", "inspiration_spring_stylegan_filter", "inspiration_spring_stylegan_simple", "inspiration_star_face_matching", "inspiration_wangzhe_original_painting", "inspiration_wangzhe_original_painting_haiyue", "inspiration_wangzhe_original_painting_img", "inspiration_wireframe_ar", "inspiration_xmas_card", "inspiration_young", "inspiration_zplan_qq_pta", "jordan_style", "land_segmentation", "lts_blythe", "lts_cartoon_multi_person", "lts_disney_baby_face", "lts_pokemon", "lts_tiandao", "lts_wangzhe_face", "lts_watercolor_multi_person", "lts_zhigan3d", "m8_different_dimension_me_img_entry", "merge_mask", "mqq_facial_recog", "oil_painting", "partner_student_id_card", "partner_student_id_card_entry", "partner_student_id_card_entry_test", "partner_student_id_card_prefetch", "partner_student_id_card_preset", "partner_student_id_card_preset_v2", "partner_student_id_card_strategy", "partner_student_id_card_test", "photo3d", "photo3d_inference", "portrait_segmentation", "portrait_segmentation_for_pose_trans", "pose_trans_2022_world_cup", "pose_trans_pre_check", "pose_trans_render", "pose_trans_winter_olymics_2022_post", "pose_trans_winter_olympics_2022", "pose_trans_winter_olympics_2022_h5_entry", "post_pose_trans", "scene_classify", "scene_classify_kuaishan", "scene_classify_kuaishan_v221", "scene_classify_no_face", "sky_segmentation", "slam_dunk_h5_entry", "sod_segmentation", "studio_ai_painting_cyberpunk", "studio_anime_hairstyle_2nd_entry", "studio_camera_move_3d_entry", "studio_face_swap_entry", "studio_face_swap_worldcup_img_ver_entry", "studio_original_painting_comic_triple", "studio_portrait_segmentation", "studio_slam_dunk_gan", "studio_xmas_card", "style_trans", "u_info", "valentine_card", "watercolor_multi_person", "watercolor_multi_person", "watercolor_multi_person_inference", "wx_moments", "x_world_segmentation", "x_world_user_info", "x_world_user_info_test", "young", "zhongqiu_huahao", "zhongqiu_yueyuan"];
  if (!text) return m.reply("*Example:* .qq 2 (Reply image)\nPilih nomor yg ada \n\n" + effecttxt.map((v, index) => "\n" + (index + 1) + ". " + v.split("_").join(" ")).join(""));
  if (!Number(text)) return m.reply("Angka saja");
  if (Number(text) > 245) return m.reply("Angka lebih");
  if (Number(text) < 1) return m.reply("Angka kurang");
  let q = m.quoted ? m.quoted : m,
    mime = (q.msg || q).mimetype || q.mediaType || "";
  if (!/image/g.test(mime)) throw `Balas/Kirim Gambar Dengan Perintah ${usedPrefix + command}!`;
  m.react(wait);
  let image = await q?.download(),
    anime = await JadiAnime(image, effecttxt[text - 1]),
    vid = anime.video_urls,
    img = anime.img_urls,
    res = [];
  vid && img ? res = [...vid, ...img] : img ? res = [...img] : vid && (res = [...vid]);
  let list = res.map((url, index) => `*${index + 1}.* ${url}`).join("\n\n");
  m.reply(`Daftar hasil konversi:\n\n${list}`);
};
handler.help = ["qq", "qqtu"].map(v => v + " (Balas foto)"), handler.tags = ["tools"],
  handler.command = /^qq|qqtu$/i, handler.limit = !0;
export default handler;

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = crypto.randomBytes(1)[0] % 16 | 0;
    return ("x" === c ? r : 3 & r | 8).toString(16);
  });
}
async function JadiAnime(data, busiId) {
  const imgBuffer = Buffer.from(data).toString("base64"),
    obj = {
      busiId: busiId,
      extra: JSON.stringify({
        face_rects: [],
        version: 2,
        platform: "web",
        data_report: {
          parent_trace_id: generateUUID(),
          root_channel: "",
          level: 0
        }
      }),
      images: [imgBuffer]
    },
    str = JSON.stringify(obj),
    sign = md5("https://h5.tu.qq.com" + (str.length + (encodeURIComponent(str).match(/%[89ABab]/g)?.length || 0)) + "HQ31X02e"),
    response = await axios.request({
      method: "POST",
      url: "https://ai.tu.qq.com/trpc.shadow_cv.ai_processor_cgi.AIProcessorCgi/Process",
      data: obj,
      headers: {
        "Content-Type": "application/json",
        Origin: "https://h5.tu.qq.com",
        Referer: "https://h5.tu.qq.com/",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
        "x-sign-value": sign,
        "x-sign-version": "v1"
      },
      timeout: 3e4
    });
  if (!response.data) throw "No data";
  const errorMessages = {
    VOLUMN_LIMIT: "QQ rate limit caught",
    IMG_ILLEGAL: "Couldn't pass the censorship. Try another photo",
    1001: "Face not found. Try another photo",
    "-2100": "Try another photo",
    2119: "Blocked",
    "-2111": "Blocked"
  };
  if (errorMessages[response.data.msg] || errorMessages[response.data.code]) throw errorMessages[response.data.msg] || errorMessages[response.data.code];
  if (!response.data.extra) throw "Got no data from QQ: " + JSON.stringify(response.data);
  return JSON.parse(response.data.extra);
}