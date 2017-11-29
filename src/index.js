import Discord from 'discord.js'
import dotenv from 'dotenv'

// load our environment variables
dotenv.load()

const client = new Discord.Client()

client.on('ready', () => {
  console.log('[Server] Bot está listo')

  try {
    client.generateInvite(['ADMINISTRATOR']).then(link => {
      console.log('[Server] Generar invitación\r\n\tLink: ', link)
    })
  } catch(e) {
    console.log(e.stack)
  }
})

client.on('message', message => {
  if (message.content === '!rand') {
    const rand = Math.floor(Math.random() * 100) + 1
    message.channel.send(`\`${message.author.username} tiró: ${rand}\``)
  }
  if (message.content === '!avatar') {
    // Send the user's avatar URL
    message.reply(message.author.avatarURL);
  }
  if (message.content === '!msg') {
    const { channel } = message

    let embed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .setDescription('Información del usuario.')
      // .setTitle('Titulo del mensaje')
      // .setURL('http://localhost:8080')
      .setColor('#ca4e4f')
      .addField('Usuario', message.author.username, true)
      .addField('das', '123', true)
      .setImage('http://cdn3-www.dogtime.com/assets/uploads/gallery/jack-russel-terrier-dog-breed-pictures/2-face.jpg')
      .setThumbnail('https://springsadvertiser.co.za/wp-content/uploads/sites/28/2016/09/is-a-jack-russell-the-right-choice-of-dog-for-you-54aea29fbe674.jpg')
      .setFooter('Kleith-sama BOT')

    channel.send('', embed)
  }
})

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find('general', 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Bienvenido ${member}`);
})

client.login(process.env.CLIENT_TOKEN)