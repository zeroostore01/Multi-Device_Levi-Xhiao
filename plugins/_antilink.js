let handler = m => m

let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
handler.before = async function (m, { user, isBotAdmin, isAdmin }) {
  if ((m.isBaileys && m.fromMe) || m.fromMe || !m.isGroup) return true
  let chat = global.db.data.chats[m.chat]
  let isGroupLink = linkRegex.exec(m.text)

  if (chat.antiLink && isGroupLink) {
    await m.reply(`*「 ANTI LINK 」*\n\nDetected *${await conn.getName(m.sender)}*Sok Asik Anj\n\nKick Sabi Kali`)
    if (isAdmin) return m.reply('*wah anjir , situ admin gabisa dikik 😢. hehe..*')
    if (!isBotAdmin) return m.reply('*Bot nya bukan admin, mana bisa ngekik 😐*')
    let linkGC = ('https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat))
    let isLinkconnGc = new RegExp(linkGC, 'i')
    let isgclink = isLinkconnGc.test(m.text)
    if (isgclink) return m.reply('*「 ANTI LINK 」*\n\nItu Dilarang❗, ini gclu sendiri Anjj')
    await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
  }
  return true
}

module.exports = handler


