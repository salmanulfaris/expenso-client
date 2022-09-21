import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#1f6187',
        secondary: '#228cb1',
        accent: '#024263',
        error: '#f2010b',
        info: '#53361a',
        success: '#039e55',
        warning: '#e4c803'
      },
    },
  },
});
