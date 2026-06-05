async execute(interaction) {
  console.log("Join command used");

  const channel = interaction.member.voice.channel;

  if (!channel) {
    console.log("User not in VC");
    return interaction.reply({
      content: "Join a voice channel first.",
      ephemeral: true
    });
  }

  console.log(`Attempting to join ${channel.name}`);

  try {
    joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator
    });

    console.log("Voice connection created");

    await interaction.reply("Joined!");
  } catch (err) {
    console.error(err);
    await interaction.reply("Failed to join.");
  }
}
