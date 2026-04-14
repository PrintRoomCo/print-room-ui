import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'Print Room Design System',
  brandImage: '/print-room-logo.png',
  brandTarget: '_self',
});

addons.setConfig({
  theme,
});
