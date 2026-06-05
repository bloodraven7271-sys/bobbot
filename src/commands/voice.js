import { SlashCommandBuilder } from 'discord.js';
import { joinVoiceChannel } from '@discordjs/voice';

export default {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Makes the bot join your voice channel'),

  async execute(interaction) {
    const channel = interaction.member.voice.channel;

    if (!channel) {
      return interaction.reply({
        content: 'Join a voice channel first!',
        ephemeral: true
      });
    }

    joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    await interaction.reply('Joined the voice channel!');
  },
};
const channel = interaction.member.voice.channel;

if (!channel) {
    return interaction.reply('Join a voice channel first!');
}

joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator
});

await interaction.reply('Joined!');
