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
            .setName('country')
            .setDescription('Your country')
            .setRequired(true)
        )

        .addStringOption(option =>
          option
            .setName('timezone')
            .setDescription('Your timezone')
            .setRequired(true)
        )

        .addStringOption(option =>
          option
            .setName('bio')
            .setDescription('About yourself')
            .setRequired(false)
        )

        .addStringOption(option =>
          option
            .setName('favorite_game')
            .setDescription('Your favorite game')
            .setRequired(false)
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
      const country = interaction.options.getString('country');
      const timezone = interaction.options.getString('timezone');
      const bio = interaction.options.getString('bio') || 'Not set';
      const favoriteGame = interaction.options.getString('favorite_game') || 'Not set';

      profiles.set(interaction.user.id, {
        gender,
        country,
        timezone,
        bio,
        favoriteGame
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
          content: 'You do not have a profile yet. Use `/profile set` first.',
          ephemeral: true
        });
      }
let badges = [];

if (interaction.member.permissions.has('Administrator'))
  badges.push('🛡️ Admin');

if (interaction.member.premiumSince)
  badges.push('🚀 Booster');

if (badges.length === 0)
  badges.push('None');
      const embed = new EmbedBuilder()
        .setColor('Blue')
        .setTitle(`${interaction.user.username}'s Profile`)
        .setThumbnail(
          interaction.user.displayAvatarURL({ dynamic: true })
        )
        .addFields(
          {
            name: '👤 Gender',
            value: profile.gender,
            inline: true
          },
          {
            name: '🌍 Country',
            value: profile.country,
            inline: true
          },
          {
            name: '🕒 Timezone',
            value: profile.timezone,
            inline: true
          },
          {
            name: '🎮 Favorite Game',
            value: profile.favoriteGame,
            inline: true
          },
          {
  name: '🏆 Badges',
  value: badges.join(', '),
  inline: false
},
          {
            name: '📝 Bio',
            value: profile.bio,
            inline: false
          },
          
          {
            name: '📅 Account Created',
            value: `<t:${Math.floor(interaction.user.createdTimestamp / 1000)}:D>`,
            inline: false
          },
          {
            name: '📥 Joined Server',
            value: `<t:${Math.floor(interaction.member.joinedTimestamp / 1000)}:D>`,
            inline: false
          }
        )
        .setFooter({
          text: `User ID: ${interaction.user.id}`
        })
        .setTimestamp();

      return interaction.reply({
        embeds: [embed]
      });
    }
  }
};
