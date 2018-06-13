import {
  GET_USER,
  GET_NUSER,
  SELECT_CITY,
  HISTORY_CITY,
  SELECT_ADDR,
  HISTORY_ADDR,
  REMOVE_HISTORY_ADDR
} from './mutation-types.js'

export default {
  // record user
	[GET_USER](state, obj) {
		state.user = obj;
	},
  // record nuser
  [GET_NUSER](state, obj) {
    state.nuser = obj;
  },
  // record cur city
  [SELECT_CITY](state, obj) {
    state.curcity = obj;
  },
  // record history city
  [HISTORY_CITY](state, obj) {
    LizardLite.Utils._.each(state.hiscity, (v, i) => {
      if(v.cid == obj.cid){
        state.hiscity.splice(i,1)
      }
    })
    state.hiscity.unshift(obj);
  },
  // record current address
  [SELECT_ADDR](state, obj) {
    state.curaddr = obj;
  },
  // record history address
  [HISTORY_ADDR](state, obj) {
    LizardLite.Utils._.each(state.hisaddr, (v, i) => {
      if(v.cd == obj.cd){
        state.hisaddr.splice(i,1)
      }
    })
    state.hisaddr.unshift(obj);
  },
  // remove history address
  [REMOVE_HISTORY_ADDR](state) {
    state.hisaddr = [];
  }
}
