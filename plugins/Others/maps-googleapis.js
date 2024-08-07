import fetch from "node-fetch";
import axios from "axios";
const handler = async (m, {
  conn,
  isOwner,
  usedPrefix,
  command,
  args,
  text
}) => {
  if (!text) throw ".mg text1|text2|text3..dst";
  try {
    let urut = text.split("|"),
      one = urut[0],
      two = urut[1],
      three = urut[2],
      four = urut[3],
      five = urut[4];
    if ("direction" === one) {
      return await direction(two, three);
    }
    if ("geocode" === one) {
      return await geocode(two, three);
    }
    if ("distancematrix" === one) {
      return await distancematrix(two, three, four, five);
    }
    if ("fpftext" === one) {
      return await fpftext(two, three, four);
    }
    if ("acomplete" === one) {
      return await acomplete(two, three);
    }
    if ("getimg" === one) {
      return await getimg(two, three);
    }
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["mg"], handler.tags = ["info"], handler.command = ["mg"];
export default handler;
async function direction(ori, des) {
  return (await axios("https://maps.googleapis.com/maps/api/directions/json?origin=" + ori + "&destination=" + des + "&key=AIzaSyBD05MVL9MXxgFoeonGIhl_lkbb82XMydg")).data;
}
async function geocode(lat, lng) {
  return (await axios("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyBD05MVL9MXxgFoeonGIhl_lkbb82XMydg")).data;
}
async function distancematrix(unit, oria, orib, des) {
  return (await axios("https://maps.googleapis.com/maps/api/distancematrix/json?units=" + unit + "&origins=" + oria + "," + orib + "&destinations=" + des + "&key=AIzaSyBD05MVL9MXxgFoeonGIhl_lkbb82XMydg")).data;
}
async function fpftext(input, type, field) {
  return (await axios("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + input + "&inputtype=" + type + "&fields=" + field + "&key=AIzaSyBD05MVL9MXxgFoeonGIhl_lkbb82XMydg")).data;
}
async function acomplete(input, type) {
  return (await axios("https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + input + "&types=" + type + "&key=AIzaSyBD05MVL9MXxgFoeonGIhl_lkbb82XMydg")).data;
}
async function getimg(lat, lng) {
  return "http://maps.google.com/maps/api/staticmap?zoom=16&size=600x600&maptype=hybrid&markers=" + lat + "," + lng + "&sensor=false&key=AIzaSyBD05MVL9MXxgFoeonGIhl_lkbb82XMydg";
}