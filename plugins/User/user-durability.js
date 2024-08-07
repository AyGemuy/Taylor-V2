export function before(m) {
  let user = db.data.users[m.sender];
  user.health > 100 && (user.health = 100), user.health < 0 && (user.health = 0),
    user.sword > 0 && user.sworddurability < 1 && (user.sworddurability = 30, user.sword -= 1),
    0 === user.sword && (user.sworddurability = 0), user.pickaxe > 0 && user.pickaxedurability < 1 && (user.pickaxedurability = 30, user.pickaxe -= 1), 0 === user.pickaxe && (user.pickaxedurability = 0), user.armor > 0 && user.armordurability < 1 && (user.armordurability = 30, user.armor -= 1), 0 === user.armor && (user.armordurability = 0);
}