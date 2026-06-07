import {
  SlashCommandBuilder
} from 'discord.js';

import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus
} from '@discordjs/voice';

import play from 'play-dl';

export default {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a YouTube song')
    .addStringOption(option =>
      option
        .setName('url')
        .setDescription('YouTube URL')
        .setRequired(true)
    ),

  async execute(interaction) {
    const channel = interaction.member.voice.channel;

    if (!channel) {
      return interaction.reply({
        content: 'Join a voice channel first!',
        ephemeral: true
      });
    }

    const url = interaction.options.getString('url');

    try {
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator
      });

      const stream = await play.stream(url);

      const resource = createAudioResource(stream.stream, {
        inputType: stream.type
      });

      const player = createAudioPlayer();

      connection.subscribe(player);

      player.play(resource);

      player.on(AudioPlayerStatus.Idle, () => {
        connection.destroy();
      });

      await interaction.reply(`🎵 Now playing: ${url}`);

    } catch (err) {
      console.error(err);

      await interaction.reply({
        content: 'Failed to play music.',
        ephemeral: true
      });
    }
  }
};
