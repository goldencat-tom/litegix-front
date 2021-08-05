/* eslint-disable */
import ApiService from "@/core/services/api.service";

// action types
export const LOAD_PROFILE_INFO = "loadUserProfileInfo";
export const UPDATE_PERSONAL_INFO = "updateUserPersonalInfo";
export const UPDATE_COMPANY_INFO = "updateUserCompanyInfo";
export const UPDATE_ACCOUNT_INFO = "updateUserAccountInfo";

// mutation types
export const GET_PROFILE_INFO ="getPersonalInfo"
export const SET_PERSONAL_INFO = "setPersonalInfo";
export const SET_COMPANY_INFO = "setCompanyInfo";
export const SET_ACCOUNT_INFO = "setAccountInfo";
export const SET_ERROR = "setError";
// export const SET_SUCCESS = "setSuccess";

const state = {
  user_personal_info: {
    email: "yasha@mail.ru",
    name: "Jones James",
    surname: "Jones", //<--- unuse
    photo: "/media/users/300_21.jpg",
    job: "Application Developer",
    timezone: "(GMT+05:30) New Delhi",
    phone: "44(76)34254578", //<--- unuse
    recv_notification: true
  },
  user_company_info: {
    name: "Fifestudios",
    address1: "address1",
    address2: "address2",
    // address3: "address3",
    country: "Canada (+1)",
    state: "tomsk",
    city: "astrik", //<--- unuse
    postal: "1111111",
    tax: "111",
    site: "fifestudios" //<--- unuse
    //    }
  },
  user_account_info: {
    username: "",
    email: "",
    language: "English",
    time_zone: "(GMT-11:00) Midway Island",
    communication: {
      email: true,
      sms: true,
      phone: false
    },
    verification: true
  }
};

const getters = {
  
  currentUserProfile(state) {
    return state.user_personal_info;
  },

  currentUserCompany(state) {
    return state.user_company_info;
  },

  currentUserAccountInfo(state) {
    return state.user_account_info;
  },

  currentUserPhoto(state) {
    return state.user_personal_info.photo;
  }
};

const actions = {
  // context : viewPage info
  // payload : user_personal_info
  [LOAD_PROFILE_INFO](context, payload) {
    context.commit(GET_PROFILE_INFO, payload);    
  },
  [UPDATE_PERSONAL_INFO](context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.post("settings/profile/update", payload)
        .then(({ data }) => {
          context.commit(SET_PERSONAL_INFO, payload);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          return reject(response.data.errors);
        });
    });
  },
  [UPDATE_COMPANY_INFO](context, payload) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.post("settings/profile/updatecompany", payload)
        .then(({ data }) => {
          context.commit(SET_COMPANY_INFO, payload);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          return reject(response.data.errors);
        });
    });
  },
  [UPDATE_ACCOUNT_INFO](context, payload) {
    context.commit(SET_ACCOUNT_INFO, payload);
  },
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [GET_PROFILE_INFO](state) {
    return new Promise((resolve, reject) => {
      ApiService.setHeader(),
      ApiService.post("settings/profile", {})
        .then(({ data }) => {
          
          state.user_personal_info.email = data.user.email;
          state.user_personal_info.name = data.user.username;
          state.user_personal_info.timezone = data.user.timezone;
          state.user_personal_info.recv_notification = data.user.loginNotification;

          state.user_account_info.email = data.user.email;
          state.user_account_info.username = data.user.username;
          state.user_account_info.time_zone = data.user.timezone;

          state.user_company_info = data.company;
          //console.log(data.company),console.log(state.user_company_info)
          resolve(data);
        })
        .catch(error => {
          //console.log("profile loading error", error.response);
          return reject(error);
        });
    });
  },

  [SET_PERSONAL_INFO](state, user_personal_info) {
    state.user_personal_info = {
      ...state.user_personal_info,
      ...user_personal_info
    };
  },
  [SET_COMPANY_INFO](state, user_company_info) {
    state.user_company_info = {
      ...state.user_company_info,
      ...user_company_info
    };
  },
  [SET_ACCOUNT_INFO](state, user_account_info) {
    state.user_account_info = user_account_info;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
