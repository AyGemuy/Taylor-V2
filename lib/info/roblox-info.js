import {
  fetch
} from "undici";
async function getUserInfo(margs, type) {
  try {
    let id, usernamesData;
    if ("name" === type) {
      const usernamesResponse = await fetch("https://users.roblox.com/v1/usernames/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          usernames: [margs.join(" ")]
        })
      });
      usernamesData = await usernamesResponse.json(), id = usernamesData.data[0]?.id;
    } else "id" === type && (id = margs);
    const userResponse = await fetch("https://users.roblox.com/v1/users/" + id),
      userData = await userResponse.json(),
      presenceResponse = await fetch("https://presence.roblox.com/v1/presence/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userIds: [parseInt(id)]
        })
      }),
      presenceData = await presenceResponse.json(),
      lastOnline = presenceData.userPresences[0]?.lastOnline,
      followersResponse = await fetch("https://friends.roblox.com/v1/users/" + id + "/followers/count"),
      followingsResponse = await fetch("https://friends.roblox.com/v1/users/" + id + "/followings/count"),
      friendsResponse = await fetch("https://friends.roblox.com/v1/users/" + id + "/friends/count"),
      robloxBadgesResponse = await fetch("https://accountinformation.roblox.com/v1/users/" + id + "/roblox-badges"),
      robloxBadgesData = await robloxBadgesResponse.json(),
      groupsResponse = await fetch("https://groups.roblox.com/v1/users/" + id + "/groups/roles"),
      groupsData = await groupsResponse.json(),
      roproInfoResponse = await fetch("https://api.ropro.io/getUserInfoTest.php?userid=" + id),
      roproInfoData = await roproInfoResponse.json(),
      usernameHistoryResponse = await fetch("https://users.roblox.com/v1/users/" + id + "/username-history?limit=100&sortOrder=Desc");
    let usernameHistoryData = await usernameHistoryResponse.json();
    for (; usernameHistoryData.nextPageCursor;) {
      const nextPageResponse = await fetch("https://users.roblox.com/v1/users/" + id + "/username-history?limit=100&sortOrder=Desc&cursor=" + usernameHistoryData.nextPageCursor);
      usernameHistoryData = await nextPageResponse.json();
    }
    const tradeInfoResponse = await fetch("https://rblx.trade/api/v1/user/profile?userId=" + id),
      tradeInfoData = await tradeInfoResponse.json(),
      thumbnailResponse = await fetch("https://thumbnails.roblox.com/v1/users/avatar?userIds=" + id + "&size=150x150&format=Png&isCircular=false"),
      thumbnailData = await thumbnailResponse.json(),
      premiumStatusResponse = await fetch("https://premiumfeatures.roblox.com/v1/users/" + id + "/validate-membership"),
      premiumStatusData = await premiumStatusResponse.json(),
      friendsListResponse = await fetch("https://friends.roblox.com/v1/users/" + id + "/friends"),
      friendsListData = await friendsListResponse.json();
    return {
      usernames: usernamesData.data,
      user: userData,
      presence: {
        lastOnline: lastOnline
      },
      followers: await followersResponse.json(),
      followings: await followingsResponse.json(),
      friends: await friendsResponse.json(),
      robloxBadges: robloxBadgesData,
      groups: groupsData.data,
      roproInfo: roproInfoData,
      usernameHistory: usernameHistoryData,
      tradeInfo: tradeInfoData,
      thumbnail: thumbnailData.data[0],
      premiumStatus: premiumStatusData,
      friendsList: friendsListData.data
    };
  } catch (error) {
    throw console.error("Error fetching data:", error), error;
  }
}
export {
  getUserInfo
};