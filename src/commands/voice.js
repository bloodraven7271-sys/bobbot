import { SlashCommandBuilder } from 'discord.js';
import { joinVoiceChannel } from '@discordjs/voice';

export default {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Makes the bot join your voice channel'),

 async execute(interaction) {
  try {
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
  } catch (error) {
    console.error('JOIN ERROR:', error);

    await interaction.reply({
      content: `Error: ${error.message}`,
      ephemeral: true
    });
  }
}
