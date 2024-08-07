import axios from "axios";
export default function InstagramStory(User) {
  return new Promise((resolve, reject) => {
    axios(`https://igs.sf-converter.com/api/profile/${User}`, {
      method: "GET",
      headers: {
        accept: "*/*",
        origin: "https://id.savefrom.net",
        referer: "https://id.savefrom.net/",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Windows; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36"
      }
    }).then(({
      data
    }) => {
      let id = data.result.id;
      axios(`https://igs.sf-converter.com/api/stories/${id}`, {
        method: "GET",
        headers: {
          accept: "*/*",
          origin: "https://id.savefrom.net",
          referer: "https://id.savefrom.net/",
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Windows; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36"
        }
      }).then(({
        data
      }) => {
        let result = [];
        data.result.forEach(obj => {
          let image_url, video_url;
          obj?.image_versions2?.candidates?.forEach(candidate => {
            1080 === candidate.width && (image_url = candidate.url);
          }), obj?.video_versions?.forEach(video => {
            101 === video.type && (video_url = video.url);
          });
          let newObject = {
            type: obj.video ? "mp4" : "jpg",
            url: obj.video ? video_url : image_url
          };
          result.push(newObject);
        }), resolve({
          creator: `@${User}`,
          status: !0,
          data: result
        });
      }).catch(reject);
    }).catch(reject);
  });
}