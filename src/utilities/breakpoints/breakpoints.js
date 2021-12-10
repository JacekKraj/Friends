import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      mobileVertical: 500,
      tabletVertical: 768,
      mobileHorizontal: 600,
      tabletHorizontal: 800,
      laptopSm: 1000,
      laptopLg: 1200,
    },
  },
});

export const breakpoints = {
  mobileVertical: `${theme.breakpoints.up('mobileVertical')} and (orientation: portrait)`,
  tabletVertical: `${theme.breakpoints.up('tabletVertical')} and (orientation: portrait)`,
  mobileHorizontal: `${theme.breakpoints.up('mobileHorizontal')} and (orientation: landscape)`,
  tabletHorizontal: `${theme.breakpoints.up('tabletHorizontal')} and (orientation: landscape)`,
  laptopSm: `${theme.breakpoints.up('laptopSm')} and (orientation: landscape)`,
  laptopLg: `${theme.breakpoints.up('laptopLg')} and (orientation: landscape)`,
};
