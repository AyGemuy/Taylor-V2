import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  if ("ghcode" === command) {
    let url = "https://api.github.com/search/code?q=" + text,
      options = {
        headers: {
          Authorization: "Bearer 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",
          Accept: "application/vnd.github+json"
        }
      },
      res = await fetch(url, options),
      sul = await res.json(),
      listSections = [];
    return Object.values(sul.items).map((v, index) => {
      let des = `\n\n\n\n${sul.total_count}\n${sul.incomplete_results}\n\n${v.name}\n${v.path}\n${v.score}\n${v.html_url}\n${v.name}\n${v.git_url}\n\n${v.repository.tags_url}\n${v.repository.private}\n${v.repository.contributors_url}\n${v.repository.notifications_url}\n${v.repository.description}\n${v.repository.subscription_url}\n${v.repository.keys_url}\n${v.repository.branches_url}\n${v.repository.deployments_url}\n${v.repository.issue_comment_url}\n${v.repository.labels_url}\n${v.repository.subscribers_url}\n${v.repository.releases_url}\n${v.repository.comments_url}\n${v.repository.stargazers_url}\n${v.repository.id}\n\n${v.repository.owner.gists_url}\n${v.repository.owner.repos_url}\n${v.repository.owner.following_url}\n${v.repository.owner.starred_url}\n${v.repository.owner.login}\n${v.repository.owner.followers_url}\n${v.repository.owner.type}\n${v.repository.owner.url}\n${v.repository.owner.subscriptions_url}\n${v.repository.owner.received_events_url}\n${v.repository.owner.avatar_url}\n${v.repository.owner.events_url}\n${v.repository.owner.html_url}\n${v.repository.owner.site_admin}\n${v.repository.owner.id}\n${v.repository.owner.gravatar_id}\n${v.repository.owner.node_id}\n${v.repository.owner.organizations_url}\n${v.repository.archive_url}\n${v.repository.commits_url}\n${v.repository.git_refs_url}\n${v.repository.forks_url}\n${v.repository.compare_url}\n${v.repository.statuses_url}\n${v.repository.git_commits_url}\n${v.repository.blobs_url}\n${v.repository.git_tags_url}\n${v.repository.merges_url}\n${v.repository.downloads_url}\n${v.repository.url}\n${v.repository.contents_url}\n${v.repository.milestones_url}\n${v.repository.teams_url}\n${v.repository.fork}\n${v.repository.issues_url}\n${v.repository.full_name}\n${v.repository.events_url}\n${v.repository.issue_events_url}\n${v.repository.languages_url}\n${v.repository.html_url}\n${v.repository.collaborators_url}\n${v.repository.name}\n${v.repository.pulls_url}\n${v.repository.hooks_url}\n${v.repository.assignees_url}\n${v.repository.trees_url}\n${v.repository.node_id}\n${v.sha}\n${v.url}\n`;
      listSections.push([index + " " + cmenub + " Nih", [
        ["Lihat", usedPrefix + "ss " + v.url, des]
      ]]);
    }), conn.sendList(m.chat, htki + " 📺 Github Search 🔎 " + htka, `⚡ Total ${sul.total_count} Code, Silakan pilih Github Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ Github Search Disini ☂️", listSections, m);
  }
  if ("ghcommits" === command) {
    let url = "https://api.github.com/search/commits?q=" + text,
      options = {
        headers: {
          Authorization: "Bearer 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",
          Accept: "application/vnd.github+json"
        }
      },
      res = await fetch(url, options),
      sul = await res.json(),
      listSections = [];
    return Object.values(sul.items).map((v, index) => {
      let des = `\n\n\n\n${sul.total_count}\n${sul.incomplete_results}\n\n${v.score}\n${v.committer}\n\n${v.author.gists_url}\n${v.author.repos_url}\n${v.author.following_url}\n${v.author.starred_url}\n${v.author.login}\n${v.author.followers_url}\n${v.author.type}\n${v.author.url}\n${v.author.subscriptions_url}\n${v.author.received_events_url}\n${v.author.avatar_url}\n${v.author.events_url}\n${v.author.html_url}\n${v.author.site_admin}\n${v.author.id}\n${v.author.gravatar_id}\n${v.author.node_id}\n${v.author.organizations_url}\n${v.html_url}\n${v.comments_url}\n\n${v.commit.comment_count}\n${v.commit.committer}\n${v.commit.committer.date}\n${v.commit.committer.name}\n${v.commit.committer.email}\n${v.commit.author}\n${v.commit.author.date}\n${v.commit.author.name}\n${v.commit.author.email}\n${v.commit.tree}\n${v.commit.tree.sha}\n${v.commit.tree.url}\n${v.commit.message}\n${v.commit.url}\n\n${v.repository.tags_url}\n${v.repository.private}\n${v.repository.contributors_url}\n${v.repository.notifications_url}\n${v.repository.description}\n${v.repository.subscription_url}\n${v.repository.keys_url}\n${v.repository.branches_url}\n${v.repository.deployments_url}\n${v.repository.issue_comment_url}\n${v.repository.labels_url}\n${v.repository.subscribers_url}\n${v.repository.releases_url}\n${v.repository.comments_url}\n${v.repository.stargazers_url}\n${v.repository.id}\n${v.repository.owner}\n${v.repository.owner.gists_url}\n${v.repository.owner.repos_url}\n${v.repository.owner.following_url}\n${v.repository.owner.starred_url}\n${v.repository.owner.login}\n${v.repository.owner.followers_url}\n${v.repository.owner.type}\n${v.repository.owner.url}\n${v.repository.owner.subscriptions_url}\n${v.repository.owner.received_events_url}\n${v.repository.owner.avatar_url}\n${v.repository.owner.events_url}\n${v.repository.owner.html_url}\n${v.repository.owner.site_admin}\n${v.repository.owner.id}\n${v.repository.owner.gravatar_id}\n${v.repository.owner.node_id}\n${v.repository.owner.organizations_url}\n${v.repository.archive_url}\n${v.repository.commits_url}\n${v.repository.git_refs_url}\n${v.repository.forks_url}\n${v.repository.compare_url}\n${v.repository.statuses_url}\n${v.repository.git_commits_url}\n${v.repository.blobs_url}\n${v.repository.git_tags_url}\n${v.repository.merges_url}\n${v.repository.downloads_url}\n${v.repository.url}\n${v.repository.contents_url}\n${v.repository.milestones_url}\n${v.repository.teams_url}\n${v.repository.fork}\n${v.repository.issues_url}\n${v.repository.full_name}\n${v.repository.events_url}\n${v.repository.issue_events_url}\n${v.repository.languages_url}\n${v.repository.html_url}\n${v.repository.collaborators_url}\n${v.repository.name}\n${v.repository.pulls_url}\n${v.repository.hooks_url}\n${v.repository.assignees_url}\n${v.repository.trees_url}\n${v.repository.node_id}\n${v.sha}\n${v.url}\n\n${v.parents[0]?.html_url}\n${v.parents[0]?.sha}\n${v.parents[0]?.url}\n${v.node_id}\n`;
      listSections.push([index + " " + cmenub + " Nih", [
        ["Lihat", usedPrefix + "ss " + v.url, des]
      ]]);
    }), conn.sendList(m.chat, htki + " 📺 Github Search 🔎 " + htka, `⚡ Total ${sul.total_count} Code, Silakan pilih Github Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ Github Search Disini ☂️", listSections, m);
  }
  if ("ghissues" === command) {
    let url = "https://api.github.com/search/issues?q=" + text,
      options = {
        headers: {
          Authorization: "Bearer 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",
          Accept: "application/vnd.github+json"
        }
      },
      res = await fetch(url, options),
      sul = await res.json(),
      listSections = [];
    return Object.values(sul.items).map((v, index) => {
      let des = `\n\n\n\n ${sul.total_count}\n${sul.incomplete_results}\n\n${v.created_at}\n${v.title}\n${v.body}\n${v.labels_url}\n${v.author_association}\n${v.number}\n${v.score}\n${v.updated_at}\n${v.comments_url}\n${v.repository_url}\n${v.id}\n${v.state}\n${v.locked}\n\n${v.pull_request.patch_url}\n${v.pull_request.html_url}\n${v.pull_request.diff_url}\n${v.pull_request.url}\n${v.state_reason}\n${v.comments}\n${v.closed_at}\n${v.url}\n\n${v.labels[0]?.color}\n${v.labels[0]?.name}\n${v.labels[0]?.id}\n${v.labels[0]?.url}\n${v.labels[0]?.node_id}\n\n${v.milestone.creator.gists_url}\n${v.milestone.creator.repos_url}\n${v.milestone.creator.following_url}\n${v.milestone.creator.starred_url}\n${v.milestone.creator.login}\n${v.milestone.creator.followers_url}\n${v.milestone.creator.type}\n${v.milestone.creator.url}\n${v.milestone.creator.subscriptions_url}\n${v.milestone.creator.received_events_url}\n${v.milestone.creator.avatar_url}\n${v.milestone.creator.events_url}\n${v.milestone.creator.html_url}\n${v.milestone.creator.site_admin}\n${v.milestone.creator.id}\n${v.milestone.creator.gravatar_id}\n${v.milestone.creator.node_id}\n${v.milestone.creator.organizations_url}\n${v.milestone.closed_at}\n${v.milestone.description}\n${v.milestone.created_at}\n${v.milestone.title}\n${v.milestone.closed_issues}\n${v.milestone.url}\n${v.milestone.due_on}\n${v.milestone.labels_url}\n${v.milestone.number}\n${v.milestone.updated_at}\n${v.milestone.html_url}\n${v.milestone.id}\n${v.milestone.state}\n${v.milestone.open_issues}\n${v.milestone.node_id}\n${v.events_url}\n${v.html_url}\n${v.assignee}\n\n${v.user.gists_url}\n${v.user.repos_url}\n${v.user.following_url}\n${v.user.starred_url}\n${v.user.login}\n${v.user.followers_url}\n${v.user.type}\n${v.user.url}\n${v.user.subscriptions_url}\n${v.user.received_events_url}\n${v.user.avatar_url}\n${v.user.events_url}\n${v.user.html_url}\n${v.user.site_admin}\n${v.user.id}\n${v.user.gravatar_id}\n${v.user.node_id}\n${v.user.organizations_url}\n${v.node_id}\n \n`;
      listSections.push([index + " " + cmenub + " Nih", [
        ["Lihat", usedPrefix + "ss " + v.url, des]
      ]]);
    }), conn.sendList(m.chat, htki + " 📺 Github Search 🔎 " + htka, `⚡ Total ${sul.total_count} Code, Silakan pilih Github Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ Github Search Disini ☂️", listSections, m);
  }
  if ("ghlabels" === command) {
    let url = "https://api.github.com/search/labels?q=" + text,
      options = {
        headers: {
          Authorization: "Bearer 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",
          Accept: "application/vnd.github+json"
        }
      },
      res = await fetch(url, options),
      sul = await res.json(),
      listSections = [];
    return Object.values(sul.items).map((v, index) => {
      let des = `\n\n\n\n${sul.total_count}\n${sul.incomplete_results}\n\n${v.score}\n${v.default}\n${v.color}\n${v.name}\n${v.description}\n${v.id}\n${v.url}\n${v.node_id}\n`;
      listSections.push([index + " " + cmenub + " Nih", [
        ["Lihat", usedPrefix + "ss " + v.url, des]
      ]]);
    }), conn.sendList(m.chat, htki + " 📺 Github Search 🔎 " + htka, `⚡ Total ${sul.total_count} Code, Silakan pilih Github Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ Github Search Disini ☂️", listSections, m);
  }
  if ("ghrepositories" === command) {
    let url = "https://api.github.com/search/repositories?q=" + text,
      options = {
        headers: {
          Authorization: "Bearer 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",
          Accept: "application/vnd.github+json"
        }
      },
      res = await fetch(url, options),
      sul = await res.json(),
      listSections = [];
    return Object.values(sul.items).map((v, index) => {
      let des = `\n\n\n${sul.total_count}\n${sul.incomplete_results}\n\n${v.stargazers_count}\n${v.pushed_at}\n${v.language}\n${v.subscription_url}\n${v.branches_url}\n${v.issue_comment_url}\n${v.labels_url}\n${v.score}\n${v.subscribers_url}\n${v.releases_url}\n${v.svn_url}\n${v.id}\n${v.master_branch}\n${v.forks}\n${v.archive_url}\n${v.git_refs_url}\n${v.forks_url}\n${v.visibility}\n${v.statuses_url}\n${v.ssh_url}\n\n${v.license.html_url}\n${v.license.name}\n${v.license.spdx_id}\n${v.license.key}\n${v.license.url}\n${v.license.node_id}\n${v.full_name}\n${v.size}\n${v.languages_url}\n${v.html_url}\n${v.collaborators_url}\n${v.clone_url}\n${v.name}\n${v.pulls_url}\n${v.default_branch}\n${v.hooks_url}\n${v.trees_url}\n${v.tags_url}\n${v.private}\n${v.contributors_url}\n${v.has_downloads}\n${v.open_issues_count}\n${v.notifications_url}\n${v.description}\n${v.created_at}\n${v.watchers}\n${v.deployments_url}\n${v.keys_url}\n${v.has_projects}\n${v.archived}\n${v.has_wiki}\n${v.updated_at}\n${v.comments_url}\n${v.stargazers_url}\n${v.disabled}\n${v.git_url}\n${v.has_pages}\n\n${v.owner.gists_url}\n${v.owner.repos_url}\n${v.owner.following_url}\n${v.owner.starred_url}\n${v.owner.login}\n${v.owner.type}\n${v.owner.followers_url}\n${v.owner.url}\n${v.owner.subscriptions_url}\n${v.owner.received_events_url}\n${v.owner.avatar_url}\n${v.owner.events_url}\n${v.owner.html_url}\n${v.owner.site_admin}\n${v.owner.id}\n${v.owner.gravatar_id}\n${v.owner.node_id}\n${v.owner.organizations_url}\n${v.commits_url}\n${v.compare_url}\n${v.git_commits_url}\n${v.blobs_url}\n${v.git_tags_url}\n${v.merges_url}\n${v.downloads_url}\n${v.has_issues}\n${v.url}\n${v.contents_url}\n${v.mirror_url}\n${v.milestones_url}\n${v.teams_url}\n${v.fork}\n${v.issues_url}\n${v.events_url}\n${v.issue_events_url}\n${v.assignees_url}\n${v.open_issues}\n${v.watchers_count}\n${v.node_id}\n${v.homepage}\n${v.forks_count}\n`;
      listSections.push([index + " " + cmenub + " Nih", [
        ["Lihat", usedPrefix + "ss " + v.url, des]
      ]]);
    }), conn.sendList(m.chat, htki + " 📺 Github Search 🔎 " + htka, `⚡ Total ${sul.total_count} Code, Silakan pilih Github Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ Github Search Disini ☂️", listSections, m);
  }
  if ("ghtopics" === command) {
    let url = "https://api.github.com/search/topics?q=" + text,
      options = {
        headers: {
          Authorization: "Bearer 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",
          Accept: "application/vnd.github+json"
        }
      },
      res = await fetch(url, options),
      sul = await res.json(),
      listSections = [];
    return Object.values(sul.items).map((v, index) => {
      let des = `\n\n\n${sul.total_count}\n${sul.incomplete_results}\n\n${v.name}\n${v.display_name}\n${v.short_description}\n${v.description}\n${v.created_by}\n${v.released}\n${v.created_at}\n${v.updated_at}\n${v.featured}\n${v.curated}\n${v.score}\n`;
      listSections.push([index + " " + cmenub + " Nih", [
        ["Lihat", usedPrefix + "ss " + v.url, des]
      ]]);
    }), conn.sendList(m.chat, htki + " 📺 Github Search 🔎 " + htka, `⚡ Total ${sul.total_count} Code, Silakan pilih Github Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ Github Search Disini ☂️", listSections, m);
  }
  if ("ghusers" === command) {
    let url = "https://api.github.com/search/users?q=" + text,
      options = {
        headers: {
          Authorization: "Bearer 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",
          Accept: "application/vnd.github+json"
        }
      },
      res = await fetch(url, options),
      sul = await res.json(),
      listSections = [];
    return Object.values(sul.items).map((v, index) => {
      let des = `\n\n\n${sul.total_count}\n${sul.incomplete_results}\n\n${v.login}\n${v.id}\n${v.node_id}\n${v.avatar_url}\n${v.gravatar_id}\n${v.url}\n${v.html_url}\n${v.followers_url}\n${v.subscriptions_url}\n${v.organizations_url}\n${v.repos_url}\n${v.received_events_url}\n${v.type}\n${v.score}\n${v.following_url}\n${v.gists_url}\n${v.starred_url}\n${v.events_url}\n${v.site_admin}\n`;
      listSections.push([index + " " + cmenub + " Nih", [
        ["Lihat", usedPrefix + "ss " + v.url, des]
      ]]);
    }), conn.sendList(m.chat, htki + " 📺 Github Search 🔎 " + htka, `⚡ Total ${sul.total_count} Code, Silakan pilih Github Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ Github Search Disini ☂️", listSections, m);
  }
};
handler.command = /^gh(repositories|(commit|label|topic|user)s|issues|code)$/i;
export default handler;