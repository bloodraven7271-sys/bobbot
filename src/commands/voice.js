import { SlashCommandBuilder } from 'discord.js';
import { joinVoiceChannel, entersState, VoiceConnectionStatus } from '@discordjs/voice';

export default {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Join your voice channel'),

  async execute(interaction) {
    const channel = interaction.member.voice.channel;

    if (!channel) {
      return interaction.reply({
        content: 'You must be in a voice channel first.',
        ephemeral: true
      });
    }

    try {
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });

      await entersState(connection, VoiceConnectionStatus.Ready, 30000);

      await interaction.reply('🎤 Joined your voice channel!');
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'Failed to join the voice channel.',
        ephemeral: true
      });
    }
  }
};
