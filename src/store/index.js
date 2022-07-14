import { createStore } from 'vuex';
import auth from '@/store/modules/auth';
import player from '@/store/modules/player';
// import modules from '@/store/modules';

export default createStore({
  // modules,
  modules: {
    auth,
    player,
  },
});
