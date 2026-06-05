import {
  SlashCommandBuilder,
  EmbedBuilder
} from 'discord.js';

const profiles = new Map();

export default {
  data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription('Manage your profile')

    .addSubcommand(sub =>
      sub
        .setName('set')
        .setDescription('Set your profile')
        .addStringOption(option =>
          option
            .setName('gender')
            .setDescription('Your gender')
            .setRequired(true)
        )
        .addStringOption(option =>
          option
            .setName('timezone')
            .setDescription('Your timezone')
            .setRequired(true)
        )
    )

    .addSubcommand(sub =>
      sub
        .setName('view')
        .setDescription('View your profile')
    ),

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === 'set') {
      const gender = interaction.options.getString('gender');
      const timezone = interaction.options.getString('timezone');

      profiles.set(interaction.user.id, {
        gender,
        timezone
      });

      return interaction.reply({
        content: '✅ Profile saved!',
        ephemeral: true
      });
    }

    if (subcommand === 'view') {
      const profile = profiles.get(interaction.user.id);

      if (!profile) {
        return interaction.reply({
          content: 'You do not have a profile yet.',
          ephemeral: true
        });
      }

      const embed = new EmbedBuilder()
        .setTitle(`${interaction.user.username}'s Profile`)
        .addFields(
          {
            name: 'Gender',
            value: profile.gender,
            inline: true
          },
          {
            name: 'Timezone',
            value: profile.timezone,
            inline: true
          }
        );

      return interaction.reply({
        embeds: [embed]
      });
    }
  }
};
