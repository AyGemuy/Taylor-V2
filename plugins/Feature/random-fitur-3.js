import fetch from "node-fetch";
import {
  sticker
} from "../../lib/sticker.js";
const handler = async (m, {
  conn,
  groupMetadata,
  usedPrefix,
  text,
  args,
  command
}) => {
  if ("robohash" === command) {
    if (!text) throw `Gunakan contoh ${usedPrefix + command} Robot`;
    let stiker = await sticker(null, API(`https://robohash.org/${text}`), packname, author);
    if (stiker) return await conn.sendFile(m.chat, stiker, "sticker.webp", "", m);
    throw stiker.toString();
  }
  if ("gstatic" === command) {
    if (!text) throw `Gunakan contoh ${usedPrefix + command} 6`;
    let stiker = `https://www.gstatic.com/webp/gallery/${text}.webp`;
    await conn.sendButton(m.chat, "*Result:*", author, stiker, [
      ["Next", `${usedPrefix + command}`]
    ], m);
  }
  if ("mentahan" === command) {
    let res = await fetch("https://api.imgflip.com/get_memes"),
      x = (await res.json()).data.memes.getRandom();
    await conn.sendButton(m.chat, `*Name:* ${x.name}\n  *Id:* ${x.id}\n  *Box:* ${x.box_count}\n  *Height:* ${x.height}\n  *Width:* ${x.width}`, author, x.url, [
      ["Next", `${usedPrefix + command}`]
    ], m);
  }
  if ("mim" === command) {
    if (!text) throw `Gunakan contoh ${usedPrefix + command} hello|helo`;
    let urut = text.split("|"),
      teksnya = urut[0],
      teksnya2 = urut[1];
    const sections = [{
        title: `${htki} PILIH TEMA ${htka}`,
        rows: [{
          title: "10 Guy",
          rowId: usedPrefix + "memaker 101440|" + teksnya + "|" + teksnya2
        }, {
          title: "Aaaaand Its Gone",
          rowId: usedPrefix + "memaker 766986|" + teksnya + "|" + teksnya2
        }, {
          title: "Always Has Been",
          rowId: usedPrefix + "memaker 252600902|" + teksnya + "|" + teksnya2
        }, {
          title: "American Chopper Argument",
          rowId: usedPrefix + "memaker 134797956|" + teksnya + "|" + teksnya2
        }, {
          title: "Am I The Only One Around Here",
          rowId: usedPrefix + "memaker 259680|" + teksnya + "|" + teksnya2
        }, {
          title: "Ancient Aliens",
          rowId: usedPrefix + "memaker 101470|" + teksnya + "|" + teksnya2
        }, {
          title: "Back In My Day",
          rowId: usedPrefix + "memaker 718432|" + teksnya + "|" + teksnya2
        }, {
          title: "Bad Luck Brian",
          rowId: usedPrefix + "memaker 61585|" + teksnya + "|" + teksnya2
        }, {
          title: "Bad Pun Dog",
          rowId: usedPrefix + "memaker 12403754|" + teksnya + "|" + teksnya2
        }, {
          title: "Batman Slapping Robin",
          rowId: usedPrefix + "memaker 438680|" + teksnya + "|" + teksnya2
        }, {
          title: "Be Like Bill",
          rowId: usedPrefix + "memaker 56225174|" + teksnya + "|" + teksnya2
        }, {
          title: "Bernie I Am Once Again Asking For Your Support",
          rowId: usedPrefix + "memaker 222403160|" + teksnya + "|" + teksnya2
        }, {
          title: "Bike Fall",
          rowId: usedPrefix + "memaker 79132341|" + teksnya + "|" + teksnya2
        }, {
          title: "Black Girl Wat",
          rowId: usedPrefix + "memaker 14230520|" + teksnya + "|" + teksnya2
        }, {
          title: "Blank Nut Button",
          rowId: usedPrefix + "memaker 119139145|" + teksnya + "|" + teksnya2
        }, {
          title: "Boardroom Meeting Suggestion",
          rowId: usedPrefix + "memaker 1035805|" + teksnya + "|" + teksnya2
        }, {
          title: "Brace Yourselves X is Coming",
          rowId: usedPrefix + "memaker 61546|" + teksnya + "|" + teksnya2
        }, {
          title: "Buff Doge vs Cheems",
          rowId: usedPrefix + "memaker 247375501|" + teksnya + "|" + teksnya2
        }, {
          title: "But Thats None Of My Business",
          rowId: usedPrefix + "memaker 16464531|" + teksnya + "|" + teksnya2
        }, {
          title: "Captain Picard Facepalm",
          rowId: usedPrefix + "memaker 1509839|" + teksnya + "|" + teksnya2
        }, {
          title: "Change My Mind",
          rowId: usedPrefix + "memaker 129242436|" + teksnya + "|" + teksnya2
        }, {
          title: "Clown Applying Makeup",
          rowId: usedPrefix + "memaker 195515965|" + teksnya + "|" + teksnya2
        }, {
          title: "Confession Bear",
          rowId: usedPrefix + "memaker 100955|" + teksnya + "|" + teksnya2
        }, {
          title: "Creepy Condescending Wonka",
          rowId: usedPrefix + "memaker 61582|" + teksnya + "|" + teksnya2
        }, {
          title: "Disaster Girl",
          rowId: usedPrefix + "memaker 97984|" + teksnya + "|" + teksnya2
        }, {
          title: "Distracted Boyfriend",
          rowId: usedPrefix + "memaker 112126428|" + teksnya + "|" + teksnya2
        }, {
          title: "Doge",
          rowId: usedPrefix + "memaker 8072285|" + teksnya + "|" + teksnya2
        }, {
          title: "Dont You Squidward",
          rowId: usedPrefix + "memaker 101511|" + teksnya + "|" + teksnya2
        }, {
          title: "Drake Hotline Bling",
          rowId: usedPrefix + "memaker 181913649|" + teksnya + "|" + teksnya2
        }, {
          title: "Dr Evil Laser",
          rowId: usedPrefix + "memaker 40945639|" + teksnya + "|" + teksnya2
        }, {
          title: "Epic Handshake",
          rowId: usedPrefix + "memaker 135256802|" + teksnya + "|" + teksnya2
        }, {
          title: "Evil Kermit",
          rowId: usedPrefix + "memaker 84341851|" + teksnya + "|" + teksnya2
        }, {
          title: "Evil Toddler",
          rowId: usedPrefix + "memaker 235589|" + teksnya + "|" + teksnya2
        }, {
          title: "Expanding Brain",
          rowId: usedPrefix + "memaker 93895088|" + teksnya + "|" + teksnya2
        }, {
          title: "Face You Make Robert Downey Jr",
          rowId: usedPrefix + "memaker 9440985|" + teksnya + "|" + teksnya2
        }, {
          title: "Finding Neverland",
          rowId: usedPrefix + "memaker 6235864|" + teksnya + "|" + teksnya2
        }, {
          title: "First World Problems",
          rowId: usedPrefix + "memaker 61539|" + teksnya + "|" + teksnya2
        }, {
          title: "Futurama Fry",
          rowId: usedPrefix + "memaker 61520|" + teksnya + "|" + teksnya2
        }, {
          title: "Grandma Finds The Internet",
          rowId: usedPrefix + "memaker 61556|" + teksnya + "|" + teksnya2
        }, {
          title: "Grumpy Cat",
          rowId: usedPrefix + "memaker 405658|" + teksnya + "|" + teksnya2
        }, {
          title: "Grus Plan",
          rowId: usedPrefix + "memaker 131940431|" + teksnya + "|" + teksnya2
        }, {
          title: "Guy Holding Cardboard Sign",
          rowId: usedPrefix + "memaker 216951317|" + teksnya + "|" + teksnya2
        }, {
          title: "Hard To Swallow Pills",
          rowId: usedPrefix + "memaker 132769734|" + teksnya + "|" + teksnya2
        }, {
          title: "Hide the Pain Harold",
          rowId: usedPrefix + "memaker 27813981|" + teksnya + "|" + teksnya2
        }, {
          title: "I Bet Hes Thinking About Other Women",
          rowId: usedPrefix + "memaker 110163934|" + teksnya + "|" + teksnya2
        }, {
          title: "Ill Just Wait Here",
          rowId: usedPrefix + "memaker 109765|" + teksnya + "|" + teksnya2
        }, {
          title: "Imagination Spongebob",
          rowId: usedPrefix + "memaker 163573|" + teksnya + "|" + teksnya2
        }, {
          title: "Inhaling Seagull",
          rowId: usedPrefix + "memaker 114585149|" + teksnya + "|" + teksnya2
        }, {
          title: "Is This A Pigeon",
          rowId: usedPrefix + "memaker 100777631|" + teksnya + "|" + teksnya2
        }, {
          title: "Jack Sparrow Being Chased",
          rowId: usedPrefix + "memaker 460541|" + teksnya + "|" + teksnya2
        }, {
          title: "Laughing Leo",
          rowId: usedPrefix + "memaker 259237855|" + teksnya + "|" + teksnya2
        }, {
          title: "Laughing Men In Suits",
          rowId: usedPrefix + "memaker 922147|" + teksnya + "|" + teksnya2
        }, {
          title: "Left Exit 12 Off Ramp",
          rowId: usedPrefix + "memaker 124822590|" + teksnya + "|" + teksnya2
        }, {
          title: "Leonardo Dicaprio Cheers",
          rowId: usedPrefix + "memaker 5496396|" + teksnya + "|" + teksnya2
        }, {
          title: "Marked Safe From",
          rowId: usedPrefix + "memaker 161865971|" + teksnya + "|" + teksnya2
        }, {
          title: "Matrix Morpheus",
          rowId: usedPrefix + "memaker 100947|" + teksnya + "|" + teksnya2
        }, {
          title: "Maury Lie Detector",
          rowId: usedPrefix + "memaker 444501|" + teksnya + "|" + teksnya2
        }, {
          title: "Mocking Spongebob",
          rowId: usedPrefix + "memaker 102156234|" + teksnya + "|" + teksnya2
        }, {
          title: "Monkey Puppet",
          rowId: usedPrefix + "memaker 148909805|" + teksnya + "|" + teksnya2
        }, {
          title: "Mugatu So Hot Right Now",
          rowId: usedPrefix + "memaker 21604248|" + teksnya + "|" + teksnya2
        }, {
          title: "One Does Not Simply",
          rowId: usedPrefix + "memaker 61579|" + teksnya + "|" + teksnya2
        }, {
          title: "Oprah You Get A",
          rowId: usedPrefix + "memaker 28251713|" + teksnya + "|" + teksnya2
        }, {
          title: "Panik Kalm Panik",
          rowId: usedPrefix + "memaker 226297822|" + teksnya + "|" + teksnya2
        }, {
          title: "Philosoraptor",
          rowId: usedPrefix + "memaker 61516|" + teksnya + "|" + teksnya2
        }, {
          title: "Picard Wtf",
          rowId: usedPrefix + "memaker 245898|" + teksnya + "|" + teksnya2
        }, {
          title: "Put It Somewhere Else Patrick",
          rowId: usedPrefix + "memaker 61581|" + teksnya + "|" + teksnya2
        }, {
          title: "Roll Safe Think About It",
          rowId: usedPrefix + "memaker 89370399|" + teksnya + "|" + teksnya2
        }, {
          title: "Running Away Balloon",
          rowId: usedPrefix + "memaker 131087935|" + teksnya + "|" + teksnya2
        }, {
          title: "Sad Pablo Escobar",
          rowId: usedPrefix + "memaker 80707627|" + teksnya + "|" + teksnya2
        }, {
          title: "See Nobody Cares",
          rowId: usedPrefix + "memaker 6531067|" + teksnya + "|" + teksnya2
        }, {
          title: "Sleeping Shaq",
          rowId: usedPrefix + "memaker 99683372|" + teksnya + "|" + teksnya2
        }, {
          title: "Sparta Leonidas",
          rowId: usedPrefix + "memaker 195389|" + teksnya + "|" + teksnya2
        }, {
          title: "Spongebob Ight Imma Head Out",
          rowId: usedPrefix + "memaker 196652226|" + teksnya + "|" + teksnya2
        }, {
          title: "Star Wars Yoda",
          rowId: usedPrefix + "memaker 14371066|" + teksnya + "|" + teksnya2
        }, {
          title: "Success Kid",
          rowId: usedPrefix + "memaker 61544|" + teksnya + "|" + teksnya2
        }, {
          title: "Surprised Pikachu",
          rowId: usedPrefix + "memaker 155067746|" + teksnya + "|" + teksnya2
        }, {
          title: "That Would Be Great",
          rowId: usedPrefix + "memaker 563423|" + teksnya + "|" + teksnya2
        }, {
          title: "The Most Interesting Man In The World",
          rowId: usedPrefix + "memaker 61532|" + teksnya + "|" + teksnya2
        }, {
          title: "The Rock Driving",
          rowId: usedPrefix + "memaker 21735|" + teksnya + "|" + teksnya2
        }, {
          title: "The Scroll Of Truth",
          rowId: usedPrefix + "memaker 123999232|" + teksnya + "|" + teksnya2
        }, {
          title: "Theyre The Same Picture",
          rowId: usedPrefix + "memaker 180190441|" + teksnya + "|" + teksnya2
        }, {
          title: "Third World Skeptical Kid",
          rowId: usedPrefix + "memaker 101288|" + teksnya + "|" + teksnya2
        }, {
          title: "Third World Success Kid",
          rowId: usedPrefix + "memaker 101287|" + teksnya + "|" + teksnya2
        }, {
          title: "This Is Fine",
          rowId: usedPrefix + "memaker 55311130|" + teksnya + "|" + teksnya2
        }, {
          title: "This Is Where Id Put My Trophy If I Had One",
          rowId: usedPrefix + "memaker 3218037|" + teksnya + "|" + teksnya2
        }, {
          title: "Too Damn High",
          rowId: usedPrefix + "memaker 61580|" + teksnya + "|" + teksnya2
        }, {
          title: "Trump Bill Signing",
          rowId: usedPrefix + "memaker 91545132|" + teksnya + "|" + teksnya2
        }, {
          title: "Tuxedo Winnie The Pooh",
          rowId: usedPrefix + "memaker 178591752|" + teksnya + "|" + teksnya2
        }, {
          title: "Two Buttons",
          rowId: usedPrefix + "memaker 87743020|" + teksnya + "|" + teksnya2
        }, {
          title: "UNO Draw 25 Cards",
          rowId: usedPrefix + "memaker 217743513|" + teksnya + "|" + teksnya2
        }, {
          title: "Unsettled Tom",
          rowId: usedPrefix + "memaker 175540452|" + teksnya + "|" + teksnya2
        }, {
          title: "Waiting Skeleton",
          rowId: usedPrefix + "memaker 4087833|" + teksnya + "|" + teksnya2
        }, {
          title: "Who Killed Hannibal",
          rowId: usedPrefix + "memaker 135678846|" + teksnya + "|" + teksnya2
        }, {
          title: "Who Would Win?",
          rowId: usedPrefix + "memaker 101910402|" + teksnya + "|" + teksnya2
        }, {
          title: "Woman Yelling At Cat",
          rowId: usedPrefix + "memaker 188390779|" + teksnya + "|" + teksnya2
        }, {
          title: "X All The Y",
          rowId: usedPrefix + "memaker 61533|" + teksnya + "|" + teksnya2
        }, {
          title: "X Everywhere",
          rowId: usedPrefix + "memaker 91538330|" + teksnya + "|" + teksnya2
        }, {
          title: "Yall Got Any More Of That",
          rowId: usedPrefix + "memaker 124055727|" + teksnya + "|" + teksnya2
        }, {
          title: "Yo Dawg Heard You",
          rowId: usedPrefix + "memaker 101716|" + teksnya + "|" + teksnya2
        }, {
          title: "Y U No",
          rowId: usedPrefix + "memaker 61527|" + teksnya + "|" + teksnya2
        }]
      }],
      listMessage = {
        text: `⚡ Silakan pilih tema di tombol di bawah...\n*Ketik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footer: wm,
        title: `${htki} ${command} ${htka}`,
        buttonText: "☂️ Tema Disini ☂️",
        sections: sections
      };
    conn.sendMessage(m.chat, listMessage, {
      quoted: {
        key: {
          participant: "0@s.whatsapp.net"
        },
        message: {
          documentMessage: {
            title: wm,
            jpegThumbnail: Buffer.alloc(0)
          }
        }
      }
    });
  }
  if ("imgkit" === command) {
    if (!text) throw `Gunakan contoh ${usedPrefix + command} kucing`;
    const sections = [{
        title: `${htki} PILIH TEMA ${htka}`,
        rows: [{
          title: "Cat",
          rowId: usedPrefix + "imagekit kucing|" + text
        }, {
          title: "Smile",
          rowId: usedPrefix + "imagekit senyum|" + text
        }, {
          title: "Monkey",
          rowId: usedPrefix + "imagekit monyet|" + text
        }, {
          title: "Wall",
          rowId: usedPrefix + "imagekit wp|" + text
        }, {
          title: "Wall 1",
          rowId: usedPrefix + "imagekit wp1|" + text
        }, {
          title: "Wall 2",
          rowId: usedPrefix + "imagekit wp2|" + text
        }, {
          title: "Wall 3",
          rowId: usedPrefix + "imagekit wp3|" + text
        }, {
          title: "Wall 4",
          rowId: usedPrefix + "imagekit wp4|" + text
        }, {
          title: "Runtime",
          rowId: usedPrefix + "imagekit runtime|" + text
        }]
      }],
      listMessage = {
        text: `⚡ Silakan pilih tema di tombol di bawah...\n*Ketik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footer: wm,
        title: `${htki} ${command} ${htka}`,
        buttonText: "☂️ Tema Disini ☂️",
        sections: sections
      };
    conn.sendMessage(m.chat, listMessage, {
      quoted: {
        key: {
          participant: "0@s.whatsapp.net"
        },
        message: {
          documentMessage: {
            title: wm,
            jpegThumbnail: Buffer.alloc(0)
          }
        }
      }
    });
  }
  if ("apimeme" === command) {
    if (!text) throw `Gunakan contoh ${usedPrefix + command} hello|helo`;
    let urut = text.split("|"),
      teksnya = urut[0],
      teksnya2 = urut[1],
      lis = ["1st-World-Canadian-Problems", "2nd-Term-Obama", "10-Guy", "1950s-Middle-Finger", "1990s-First-World-Problems", "Aaaaand-Its-Gone", "Ace-Primo", "Actual-Advice-Mallard", "Adalia-Rose", "Admiral-Ackbar-Relationship-Expert", "Advice-Dog", "Advice-Doge", "Advice-God", "Advice-Peeta", "Advice-Tam", "Advice-Yoda", "Afraid-To-Ask-Andy", "Afraid-To-Ask-Andy-Closeup", "Aint-Nobody-Got-Time-For-That", "Alan-Greenspan", "Alarm-Clock", "Albert-Cagestein", "Albert-Einstein-1", "Alien-Meeting-Suggestion", "Alright-Gentlemen-We-Need-A-New-Idea", "Always-Has-Been", "Alyssa-Silent-Hill", "Am-I-The-Only-One-Around-Here", "American-Chopper-Argument", "Ancient-Aliens", "And-everybody-loses-their-minds", "And-then-I-said-Obama", "Angry-Asian", "Angry-Baby", "Angry-Birds-Pig", "Angry-Bride", "Angry-Chef-Gordon-Ramsay", "Angry-Chicken-Boss", "Angry-Dumbledore", "Angry-Koala", "Angry-Rant-Randy", "Angry-Toddler", "Annoying-Childhood-Friend", "Annoying-Facebook-Girl", "Anri-Stares", "Anti-Joke-Chicken", "Apathetic-Xbox-Laser", "Archer", "Are-you-a-Wizard", "Are-Your-Parents-Brother-And-Sister", "Arrogant-Rich-Man", "Art-Attack", "Art-Student-Owl", "Arthur-Fist", "Asshole-Ref", "Aunt-Carol", "Austin-Powers-Honestly", "Aw-Yeah-Rage-Face", "Awkward-Moment-Sealion", "Awkward-Olympics", "Babushkas-On-Facebook", "Baby-Cry", "Baby-Godfather", "Baby-Insanity-Wolf", "Back-In-My-Day", "Bad-Advice-Cat", "Bad-Joke-Eel", "Bad-Luck-Bear", "Bad-Luck-Brian", "Bad-Luck-Hannah", "Bad-Pun-Anna-Kendrick", "Bad-Pun-Dog", "Bad-Wife-Worse-Mom", "Bah-Humbug", "Bane", "BANE-AND-BRUCE", "Bane-Permission", "Barack-And-Kumar-2013", "Barba", "Barbosa-And-Sparrow", "Barney-Stinson-Win", "Baromney", "Baron-Creater", "Bart-Simpson-Peeking", "Batman-And-Superman", "Batman-Slapping-Robin", "Batman-Smiles", "Batmobile", "Bazooka-Squirrel", "Be-Like-Bill", "Bear-Grylls", "Beard-Baby", "Bebo", "Because-Race-Car", "Ben-Barba-Pointing", "Bender", "Benito", "Bernie-I-Am-Once-Again-Asking-For-Your-Support", "Beyonce-Knowles-Superbowl", "Beyonce-Knowles-Superbowl-Face", "Beyonce-Superbowl-Yell", "Big-Bird", "Big-Bird-And-Mitt-Romney", "Big-Bird-And-Snuffy", "Big-Ego-Man", "Big-Family-Comeback", "Bike-Fall", "Bill-Murray-Golf", "Bill-Nye-The-Science-Guy", "Bill-OReilly", "Billy-Graham-Mitt-Romney", "Bitch-Please", "Black-Girl-Wat", "Blank-Blue-Background", "Blank-Colored-Background", "Blank-Comic-Panel-1x2", "Blank-Comic-Panel-2x1", "Blank-Comic-Panel-2x2", "Blank-Nut-Button", "Blank-Starter-Pack", "Blank-Transparent-Square", "Blank-Yellow-Sign", "Blob", "Blue-Futurama-Fry", "BM-Employees", "Boardroom-Meeting-Suggestion", "Bonobo-Lyfe", "Booty-Warrior", "Bothered-Bond", "Brace-Yourselves-X-is-Coming", "Brian-Burke-On-The-Phone", "Brian-Griffin", "Brian-Williams-Was-There", "Brian-Williams-Was-There-2", "Brian-Williams-Was-There-3", "Brian-Wilson-Vs-ZZ-Top", "Britney-Spears", "Bubba-And-Barack", "Buddy-Christ", "Buddy-The-Elf", "Buff-Doge-vs-Cheems", "Bullets", "Burn-Kitty", "Business-Cat", "But-Thats-None-Of-My-Business", "But-Thats-None-Of-My-Business-Neutral", "Butthurt-Dweller", "Captain-Hindsight", "Captain-Phillips-Im-The-Captain-Now", "Captain-Picard-Facepalm", "Car-Salesman-Slaps-Hood", "CASHWAG-Crew", "Casper", "Castaway-Fire", "Ceiling-Cat", "Cel-Jesuno", "Cereal-Guy", "Cereal-Guy-Spitting", "Cereal-Guys-Daddy", "Chad-Johnson", "Chainsaw-Bear", "Challenge-Accepted-Rage-Face", "Change-My-Mind", "Charlie-Sheen-Derp", "Chavez", "Chef-Gordon-Ramsay", "Chemistry-Cat", "Chester-The-Cat", "Chicken-Bob", "Chief-Keef", "Chihuahua-dog", "Chill-Out-Lemur", "Chinese-Cat", "Chocolate-Spongebob", "Chubby-Bubbles-Girl", "Chuck-Norris", "Chuck-Norris-Approves", "Chuck-Norris-Finger", "Chuck-Norris-Flex", "Chuck-Norris-Guns", "Chuck-Norris-Laughing", "Chuck-Norris-Phone", "Chuck-Norris-With-Guns", "Chuckchuckchuck", "City-Bear", "Cleavage-Girl", "Clefable", "Close-Enough", "Clown-Applying-Makeup", "College-Freshman", "College-Liberal", "Comic-Book-Guy", "Computer-Guy", "Computer-Guy-Facepalm", "Computer-Horse", "Condescending-Goku", "Condescending-Wonka", "Confession-Bear", "confession-kid", "Confused-Cam", "Confused-Gandalf", "Confused-Granddad", "Confused-Lebowski", "Confused-Mel-Gibson", "Conspiracy-Keanu", "Consuela", "Contradictory-Chris", "Cool-Cat-Stroll", "Cool-Obama", "Cool-Story-Bro", "Corona", "Costanza", "Coulson", "Courage-Wolf", "Crazy-Dawg", "Crazy-Girlfriend-Praying-Mantis", "Crazy-Hispanic-Man", "Creeper-Dog", "Creepy-Condescending-Wonka", "Criana", "Crosseyed-Goku", "Crying-Because-Of-Cute", "CURLEY", "Cute-Cat", "Cute-Dog", "Cute-Puppies", "Dad-Joke-Dog", "Dafuq-Did-I-Just-Read", "Dallas-Cowboys", "Dancing-Trollmom", "Darth-Maul", "Darti-Boy", "Dat-Ass", "Dat-Boi", "Dating-Site-Murderer", "Dave-Chappelle", "Dead-Space", "Deadpool-Pick-Up-Lines", "Deadpool-Surprised", "Depressed-Cat", "Depression-Dog", "Derp", "Derpina", "Determined-Guy-Rage-Face", "Dexter", "Dick-Cheney", "Disappointed-Tyson", "Disaster-Girl", "Distracted-Boyfriend", "DJ-Pauly-D", "Do-I-Care-Doe", "Doge", "Doge-2", "Dolph-Ziggler-Sells", "Donald-Trump-sewing-his-name-into-the-American-Flag", "Dont-You-Squidward", "DoucheBag-DJ", "Doug", "Down-Syndrome", "Downcast-Dark-Souls", "Downvoting-Roman", "Dr-Crane", "Dr-Evil", "Dr-Evil-Laser", "Drake-Bad-Good", "Drake-Hotline-Bling", "Drunk-Baby", "Duck-Face", "Duck-Face-Chicks", "Dumb-Blonde", "Dwight-Schrute", "Dwight-Schrute-2", "Edu-Camargo", "Edward-Elric-1", "Efrain-Juarez", "Eighties-Teen", "Eminem", "Empty-Red-And-Black", "Endel-Tulviste", "Engineering-Professor", "Epic-Handshake", "Epicurist-Kid", "Ermahgerd-Berks", "Ermahgerd-Beyonce", "Ermahgerd-IPHERN-3GM", "ERMAHGERD-TWERLERT", "Error-404", "Evil-Baby", "Evil-Cows", "Evil-Kermit", "Evil-Otter", "Evil-Plotting-Raccoon", "Evil-Toddler", "Excited-Cat", "Excited-Minions", "Expanding-Brain", "Eye-Of-Sauron", "Fabulous-Frank-And-His-Snake", "Face-You-Make-Robert-Downey-Jr", "Facepalm-Bear", "Fake-Hurricane-Guy", "Family-Guy-Brian", "Family-Guy-Peter", "Family-Tech-Support-Guy", "Fast-Furious-Johnny-Tran", "Fat-Cat", "Fat-Val-Kilmer", "Father-Ted", "Fear-And-Loathing-Cat", "Feels-Bad-Frog---Feels-Bad-Man", "Felix-Baumgartner", "Felix-Baumgartner-Lulz", "Fernando-Litre", "FFFFFFFUUUUUUUUUUUU", "Fifa-E-Call-Of-Duty", "Fim-De-Semana", "Finding-Neverland", "Fini", "Finn-The-Human", "First-Day-On-The-Internet-Kid", "First-World-Frat-Guy", "First-World-Problems", "First-World-Problems-Cat", "First-World-Stoner-Problems", "Fk-Yeah", "Flavor-Flav", "Foal-Of-Mine", "Folean-Dynamite", "Forever-Alone", "Forever-Alone-Christmas", "Forever-Alone-Happy", "Foul-Bachelor-Frog", "Foul-Bachelorette-Frog", "FRANGO", "Friend-Zone-Fiona", "Frowning-Nun", "Frustrated-Boromir", "Frustrating-Mom", "Futurama-Fry", "Futurama-Leela", "Futurama-Zoidberg", "Gaga-Baby", "Gandhi", "Gangnam-Style", "Gangnam-Style-PSY", "Gangnam-Style2", "Gangster-Baby", "Gasp-Rage-Face", "George-Bush", "George-Washington", "Ghetto-Jesus", "Ghost-Nappa", "Giovanni-Vernia", "Give-me-Karma---Beating-the-dead-horse", "Gladys-Falcon", "God", "Gollum", "Good-Fellas-Hilarious", "Good-Guy-Greg", "Good-Guy-Pizza-Rolls", "Good-Guy-Putin", "Good-Guy-Socially-Awkward-Penguin", "Google-Chrome", "Gordo", "Got-Room-For-One-More", "Gotta-Go-Cat", "Grandma-Finds-The-Internet", "Green-Day", "Grumpy-Cat", "Grumpy-Cat-Bed", "Grumpy-Cat-Birthday", "Grumpy-Cat-Christmas", "Grumpy-Cat-Does-Not-Believe", "Grumpy-Cat-Halloween", "Grumpy-Cat-Happy", "Grumpy-Cat-Mistletoe", "Grumpy-Cat-Not-Amused", "Grumpy-Cat-Reverse", "Grumpy-Cat-Sky", "Grumpy-Cat-Star-Wars", "Grumpy-Cat-Table", "Grumpy-Cat-Top-Hat", "Grumpy-Cats-Father", "Grumpy-Toad", "Grus-Plan", "Guinness-World-Record", "Guy-Fawkes", "Guy-Holding-Cardboard-Sign", "Hal-Jordan", "Hamtaro", "Han-Solo", "Happy-Guy-Rage-Face", "Happy-Minaj", "Happy-Minaj-2", "Happy-Star-Congratulations", "Hard-To-Swallow-Pills", "Hardworking-Guy", "Harley-Quinn", "Harmless-Scout-Leader", "Harper-WEF", "Harry-Potter-Ok", "Hawkward", "He-Needs-The-Vaccine", "He-Will-Never-Get-A-Girlfriend", "Headbanzer", "Headless-Rider-DRRR", "Heavy-Breathing-Cat", "Hedonism-Bot", "Hello-Kassem", "Hello-Kitty", "Helpful-Tyler-Durden", "Henry-David-Thoreau", "Hercules-Hades", "Heres-Johnny", "Herm-Edwards", "Hey-Internet", "Hide-the-Pain-Harold", "Hide-Yo-Kids-Hide-Yo-Wife", "High-Dog", "High-Expectations-Asian-Father", "Hillary-Clinton", "Hillary-Clinton-Cellphone", "Hipster-Ariel", "Hipster-Barista", "Hipster-Kitty", "Hohoho", "Homophobic-Seal", "Hoody-Cat", "Hora-Extra", "Hornist-Hamster", "Horny-Harry", "Hot-Caleb", "Hot-Scale", "Hotline-Miami-Richard", "House-Bunny", "How-About-No-Bear", "How-Tough-Are-You", "Hypnotoad", "Hypocritical-Islam-Terrorist", "Hysterical-Tom", "I-Am-Not-A-Gator-Im-A-X", "I-Bet-Hes-Thinking-About-Other-Women", "I-Forsee", "I-Guarantee-It", "I-Have-No-Idea-What-I-Am-Doing", "I-Have-No-Idea-What-I-Am-Doing-Dog", "I-Know-Fuck-Me-Right", "I-Know-That-Feel-Bro", "I-Lied-2", "I-See-Dead-People", "I-Should-Buy-A-Boat-Cat", "I-Too-Like-To-Live-Dangerously", "I-Was-Told-There-Would-Be", "I-Will-Find-You-And-Kill-You", "Idiot-Nerd-Girl", "Idiotaco", "If-You-Know-What-I-Mean-Bean", "Ill-Have-You-Know-Spongebob", "Ill-Just-Wait-Here", "Im-Curious-Nappa", "Im-Fabulous-Adam", "Im-The-Captain-Now", "Imagination-Spongebob", "Impossibru-Guy-Original", "Inception", "Inhaling-Seagull", "Inigo-Montoya", "Innocent-Sasha", "Insanity-Puppy", "Insanity-Wolf", "Intelligent-Dog", "Internet-Explorer", "Internet-Guide", "Interupting-Kanye", "Invalid-Argument-Vader", "Is-This-A-Pigeon", "Islam-Rage---Angry-Muslim", "Its-Finally-Over", "Its-Not-Going-To-Happen", "Its-True-All-of-It-Han-Solo", "Jack-Nicholson-The-Shining-Snow", "Jack-Sparrow-Being-Chased", "Jackie-Chan-WTF", "Jammin-Baby", "Jay-Knows-Facts", "Jehovas-Witness-Squirrel", "Jerkoff-Javert", "Jersey-Santa", "Jessica-Nigri-Cosplay", "Jesus-Talking-To-Cool-Dude", "Jim-Lehrer-The-Man", "Joe-Biden", "John-Riley-Condescension", "Joker", "Joker-Rainbow-Hands", "Jon-Stewart-Skeptical", "Joo-Espontneo", "Joseph-Ducreux", "Justin-Bieber-Suit", "Karate-Kid", "Karate-Kyle", "Keep-Calm-And-Carry-On-Aqua", "Keep-Calm-And-Carry-On-Black", "Keep-Calm-And-Carry-On-Purple", "Keep-Calm-And-Carry-On-Red", "Kevin-Hart", "Kevin-Hart-The-Hell", "Kill-You-Cat", "Kill-Yourself-Guy", "Kim-Jong-Il-Y-U-No", "Kim-Jong-Un-Sad", "Koala", "Kobe", "Kool-Kid-Klan", "Krusty-Krab-Vs-Chum-Bucket", "Krusty-Krab-Vs-Chum-Bucket-Blank", "Kyon-Face-Palm", "Lame-Pun-Coon", "Larfleeze", "Larry-The-Cable-Guy", "Laughing-Goat", "Laughing-Leo", "Laughing-Men-In-Suits", "Laughing-Villains", "Laundry-Viking", "Lazy-College-Senior", "Left-Exit-12-Off-Ramp", "Legal-Bill-Murray", "Leonardo-Dicaprio-Cheers", "Leonardo-Dicaprio-Wolf-Of-Wall-Street", "Lethal-Weapon-Danny-Glover", "Lewandowski-E-Reus", "Liam-Neeson-Taken", "Liam-Neeson-Taken-2", "Life-Sucks", "LIGAF", "Lil-Wayne", "Lion-King", "Little-Romney", "LOL-Guy", "Look-At-All-These", "Look-At-Me", "Look-Son", "Luiz-Fabiano", "Macklemore-Thrift-Store", "Mad-Money-Jim-Cramer", "Mad-Moxxi", "Malicious-Advice-Mallard", "Mamimoe", "Manning-Broncos", "Mario-Hammer-Smash", "Marked-Safe-From", "Maroney-And-Obama-Not-Impressed", "Marvel-Civil-War", "Marvel-Civil-War-1", "Marvel-Civil-War-2", "Matanza", "Matrix-Morpheus", "Maury-Lie-Detector", "Mayu-Watanabe", "McKayla-Maroney-Not-Impressed", "McKayla-Maroney-Not-Impressed2", "McMelch", "Mega-Rage-Face", "Member-Berries", "Meme-Dad-Creature", "Memeo", "Men-In-Black", "Men-Laughing", "Merida-Brave", "Metal-Jesus", "Mexican-Pizza", "Michael-Jackson-Popcorn", "Michael-Phelps-Death-Stare", "Minegishi-Minami", "Minegishi-Minami2", "Minor-Mistake-Marvin", "Misunderstood-Mitch", "Mitch-McConnell", "Mocking-Spongebob", "Modern-Warfare-3", "Molly-Weasley", "Money-Man", "Money-Money", "Monkey-Business", "Monkey-OOH", "Monkey-Puppet", "Morgan-Freeman-Good-Luck", "Morpheus", "Morty", "Mother-Of-God", "Mozart-Not-Sure", "Mr-Black-Knows-Everything", "Mr-Krabs-Blur-Meme", "Mr-Mackey", "Mr-T", "Mr-T-Pity-The-Fool", "Mugatu-So-Hot-Right-Now", "Multi-Doge", "Murica", "Muschamp", "Musically-Oblivious-8th-Grader", "Nabilah-Jkt48", "Nailed-It", "Nakagawa-Haruka", "Natsu", "Neil-deGrasse-Tyson", "Net-Noob", "Nice-Guy-Loki", "Nickleback", "Nicolas-Cage---You-dont-say", "Nilo", "Nissim-Ourfali", "No-Bullshit-Business-Baby", "No-I-Cant-Obama", "No-Nappa-Its-A-Trick", "No-Patrick", "Not-a-Meme,-Just-Boobs", "Not-Bad-Obama", "Not-Okay-Rage-Face", "NPC", "Nuclear-Explosion", "Obama", "Obama-Cowboy-Hat", "Obama-No-Listen", "Obama-Romney-Pointing", "Obi-Wan-Kenobi", "Oblivious-Hot-Girl", "Officer-Cartman", "Oh-My-God-Orange", "Oh-No", "Okay-Guy-Rage-Face", "Okay-Guy-Rage-Face2", "Okay-Truck", "Oku-Manami", "OMG-Cat", "OMG-Karen", "Onde", "One-Does-Not-Simply", "Oprah-You-Get-A", "Oprah-You-Get-A-Car-Everybody-Gets-A-Car", "Optimistic-Niall", "Ordinary-Muslim-Man", "Original-Bad-Luck-Brian", "Original-I-Lied", "Original-Stoner-Dog", "Osabama", "Our-Glorious-Leader-Nicolas-Cage", "Over-Educated-Problems", "Overjoyed", "Overly-Attached-Father", "Overly-Attached-Girlfriend", "Overly-Attached-Nicolas-Cage", "Overly-Manly-Man", "Overly-Suave-IT-Guy", "Packers", "Panik-Kalm-Panik", "Papa-Fking-John", "Paranoid-Parrot", "Pat-Quinn", "Pathetic-Spidey", "Patrick-Bateman", "Patrick-Henry", "Patrick-Says", "Patriotic-Eagle", "Paul-Ryan", "Paul-Wonder-Years", "Pedobear", "Pedophile-Orochimaru", "Pelosi", "Penguin-Gang", "Pentagon-Hexagon-Octagon", "Pepperidge-Farm-Remembers", "Perfection-Michael-Fassbender", "Permission-Bane", "Persian-Cat-Room-Guardian", "Persian-Cat-Room-Guardian-Single", "Perturbed-Portman", "Peter-Griffin-News", "Peter-Parker-Cry", "Philosoraptor", "Photogenic-College-Football-Player", "Photogenic-Scene-Guy", "Picard-Wtf", "Pickle-Rick", "Pickup-Line-Panda", "Pickup-Master", "Pickup-Professor", "Pillow-Pet", "Pink-Escalade", "Pinky-and-the-Brain", "Pissed-Off-Obama", "Police-Officer-Testifying", "Pony-Shrugs", "Pope-Nicolas-Cage", "Portuguese", "Pothead-Fry", "PPAP", "Predator", "Premature-Pete", "Presidential-Alert", "Priority-Peter", "Professor-Oak", "Proper-Lady", "Psy-Horse-Dance", "PTSD-Clarinet-Boy", "Put-It-Somewhere-Else-Patrick", "Putin", "Question-Rage-Face", "Questionable-Strategy-Kobe", "Quit-Hatin", "Rarity", "Rasta-Science-Teacher", "Really-Evil-College-Teacher", "Rebecca-Black", "Redditors-Wife", "Rediculously-Well-Mannered-Athlete", "Redneck-Randal", "Reimu-Hakurei", "Relaxed-Office-Guy", "Religious-Couple", "Rena-Matsui", "Rich-Guy-Dont-Care", "Rich-Raven", "Richard-Benson", "Rick", "Rick-and-Carl", "Rick-and-Carl-3", "Rick-and-Carl-Long", "Rick-and-Carl-Longer", "Rick-Grimes", "Ridiculously-Photogenic-Guy", "Ridiculously-Photogenic-Judge", "Right-In-The-Childhood", "Rmoney-Again", "Rob-In-The-Hood", "Robots", "Rocket-Raccoon", "Rodgers-Doublecheck", "Roll-Safe-Think-About-It", "Romney", "Romney-And-Ryan", "Romney-Bong", "Romneys-Hindenberg", "Ron-Burgundy", "Ron-Swanson", "RPG-Fan", "Running-Away-Balloon", "Ryan-Gosling", "Sad-Axl", "Sad-Baby", "Sad-Cat", "Sad-Keanu", "Sad-Pablo-Escobar", "Sad-Spiderman", "Sad-X-All-The-Y", "Sadly-I-Am-Only-An-Eel", "Samuel-Jackson-Glance", "Samuel-L-Jackson", "Sarcastic-Anthony", "Sassy-Iguana", "Satisfied-Seal", "Saw-Fulla", "Say-That-Again-I-Dare-You", "Scared-Cat", "Scary-Harry", "Scene-Wolf", "Scooby-Doo", "Scott-Howson", "Scrooge-McDuck", "Scrooge-McDuck-2", "Scumbag-Boss", "Scumbag-Brain", "Scumbag-Daylight-Savings-Time", "Scumbag-Girl", "Scumbag-Job-Market", "Scumbag-Minecraft", "Scumbag-Miraak", "Scumbag-MSNBC", "Scumbag-Muslim", "Scumbag-Parents", "Scumbag-Redditor", "Scumbag-Steve", "Secure-Parking", "See-Nobody-Cares", "Self-Loathing-Otter", "Selfish-Ozzy", "Sergeant-Hartmann", "Serious-Xzibit", "Seriously-Face", "Sexual-Deviant-Walrus", "Sexually-Oblivious-Girlfriend", "Sexually-Oblivious-Rhino", "Sexy-Railroad-Spiderman", "Shaq-Only-Smokes-The-Dankest", "Sheltering-Suburban-Mom", "Shocked-Ape", "Short-Satisfaction-VS-Truth", "Shouter", "Shrek-Cat", "Shut-Up-And-Take-My-Money-Fry", "Shutup-Batty-Boy", "Sidious-Error", "Sigmund-Freud", "Simba-Shadowy-Place", "Simpsons-Grandpa", "Simsimi", "Since-When-Were-You-Under-The-Impression", "Sinestro", "Skeptical-Baby", "Skeptical-Swardson", "Skinhead-John-Travolta", "Skype", "Sleeping-Shaq", "Slenderman", "Slick-Fry", "Slowpoke", "Small-Dog", "Small-Face-Romney", "Smilin-Biden", "Smiling-Cat", "Smiling-Jesus", "Smirk-Rage-Face", "Smug-Bear", "Snape", "Snoop", "So-God-Made-A-Farmer", "So-I-Got-That-Goin-For-Me-Which-Is-Nice", "So-I-Got-That-Goin-For-Me-Which-Is-Nice-2", "So-I-Guess-You-Can-Say-Things-Are-Getting-Pretty-Serious", "So-Many-Shirts", "So-Much-Drama", "Socially-Awesome-Awkward-Penguin", "Socially-Awesome-Penguin", "Socially-Awkward-Awesome-Penguin", "Socially-Awkward-Couple", "Socially-Awkward-Penguin", "Solemn-Lumberjack", "SonTung", "Sotally-Tober", "South-Park-Craig", "Spacey-Casey", "Spangles", "Sparta-Leonidas", "Speechless-Colbert-Face", "Spiderman-Camera", "Spiderman-Computer-Desk", "Spiderman-Hospital", "Spiderman-Laugh", "Spiderman-Peter-Parker", "Sponegebob-Coffee", "Spongebob-Ight-Imma-Head-Out", "Spongegar", "Squidward", "Star-Wars-No", "Star-Wars-Yoda", "Stephen-Harper-Podium", "Steve-Harvey", "Steve-Jobs", "Stoner-Dog", "Stoner-PhD", "Stop-Cop", "Storytelling-Grandpa", "Subtle-Pickup-Liner", "Success-Kid", "Success-Kid-Girl", "Success-Kid-Original", "Successful-Black-Man", "Sudden-Clarity-Clarence", "Sudden-Disgust-Danny", "Super-Birthday-Squirrel", "Super-Cool-Ski-Instructor", "Super-Kami-Guru-Allows-This", "Superior-Wadsworth", "Surpised-Frodo", "Surprised-CatMan", "Surprised-Coala", "Surprised-Koala", "Surprised-Pikachu", "Surprized-Vegeta", "Suspicious-Cat", "Sweaty-Concentrated-Rage-Face", "Table-Flip-Guy", "Take-A-Seat-Cat", "Talk-To-Spongebob", "Tamou", "Team-Rocket", "Tears-Of-Joy", "Tech-Impaired-Duck", "TED", "Tennis-Defeat", "Terry-Davis", "That-Would-Be-Great", "Thats-a-paddlin", "Thats-Just-Something-X-Say", "The-Bobs", "The-Critic", "The-Most-Interesting-Cat-In-The-World", "The-Most-Interesting-Justin-Bieber", "The-Most-Interesting-Man-In-The-World", "The-Probelm-Is", "The-Problem-Is", "The-Rock-Driving", "The-Rock-It-Doesnt-Matter", "The-Scroll-Of-Truth", "These-Arent-The-Droids-You-Were-Looking-For", "Theyre-The-Same-Picture", "Think", "Third-World-Skeptical-Kid", "Third-World-Success-Kid", "This-Is-Fine", "This-Is-Where-Id-Put-My-Trophy-If-I-Had-One", "Thumbs-Up-Emoji", "Time-To-Fap", "Today-Was-A-Good-Day", "Tom-Hardy-", "Tomas-Rosicky", "Too-Damn-High", "Too-Drunk-At-Party-Tina", "Too-Kool-Kyle", "Torreshit", "Tough-Guy-Wanna-Be", "Trailer-Park-Boys-Bubbles", "Travelonshark", "Troll-Face", "Troll-Face-Colored", "True-Story", "Trump-Bill-Signing", "TSA-Douche", "Turkey", "Tuxedo-Winnie-The-Pooh", "Two-Buttons", "Ugly-Twins", "Uncle-Sam", "Unhappy-Baby", "Unhelpful-High-School-Teacher", "Unicorn-MAN", "UNO-Draw-25-Cards", "Unpopular-Opinion-Puffin", "Unsettled-Tom", "Unwanted-House-Guest", "USA-Lifter", "V-For-Vendetta", "Vali-Corleone", "Vengeance-Dad", "Viking-Dudes", "Vladimir-Putin", "Waiting-Skeleton", "Warning-Sign", "We-Will-Rebuild", "Weird-Stuff-I-Do-Potoo", "Welcome-To-The-Internets", "Well-That-Escalated-Quickly", "What-Do-We-Want", "What-Do-We-Want-3", "What-Year-Is-It", "Whisper-Sloth", "Who-Killed-Hannibal", "Why-Cant-I", "Why-Cant-I-Hold-All-These-Limes", "Why-Is-The-Rum-Gone", "Why-Not-Both", "Will-Ferrell", "Wink", "Woah-Kitty", "Woman-Yelling-At-Cat", "Wrong-Neighboorhood-Cats", "Wrong-Number-Rita", "WTF", "X,-X-Everywhere", "X-All-The-Y", "X-Everywhere", "X-X-Everywhere", "Y-U-No", "Yakuza", "Yall-Got-Any-More-Of", "Yall-Got-Any-More-Of-That", "Yao-Ming", "Yo-Dawg-Heard-You", "Yo-Mamas-So-Fat", "You-Dont-Say", "You-Dont-Want-No-Part-Of-This", "You-Get-An-X-And-You-Get-An-X", "You-Should-Feel-Bad-Zoidberg", "You-The-Real-MVP", "You-The-Real-MVP-2", "You-Underestimate-My-Power", "You-Were-The-Chosen-One-Star-Wars", "Young-And-Reckless", "Young-Cardi-B", "Youre-Too-Slow-Sonic", "Yuko-With-Gun", "ZNMD", "Zoidberg-Jesus", "Zombie-Bad-Luck-Brian", "Zombie-Overly-Attached-Girlfriend", "Zorg", "Zuckerberg", "Zura-Janai-Katsura-Da"],
      row = Object.keys(lis).map((v, index) => ({
        title: htjava + " " + lis[v],
        description: "No. " + index,
        rowId: usedPrefix + "makerapimeme " + lis[v] + "|" + teksnya + "|" + teksnya2
      })),
      button = {
        buttonText: "☂️ Tema Disini ☂️",
        description: `⚡ Silakan pilih tema di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footerText: wm
      };
    return await conn.sendListM(m.chat, button, row, m);
  }
};
handler.command = handler.help = ["mentahan", "mim", "robohash", "imgkit", "gstatic", "apimeme"],
  handler.tags = ["maker"];
export default handler;