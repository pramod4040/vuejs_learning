const ID_TOKEN_KEY = "id_token";
const ID_USER_TYPE = "id_user_type";
const ID_CAMPAIGN_page ='id_campaign_page';

export const getToken = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

export const getUserType = () => {
  return window.localStorage.getItem(ID_USER_TYPE);
};

export const saveToken = (user) => {
  window.localStorage.setItem(ID_TOKEN_KEY, user);
};

export const saveUserType = (user_type)=>{
  window.localStorage.setItem(ID_USER_TYPE,user_type)
};

export const saveCampaignPage=(status)=>{
  window.localStorage.setItem(ID_CAMPAIGN_page,status);
};

export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
  window.localStorage.removeItem(ID_USER_TYPE);
  window.localStorage.removeItem(ID_CAMPAIGN_page);
};
export const destroyCampaignPageStatusToken=()=>{
  window.localStorage.removeItem(ID_CAMPAIGN_page);
};
export default { getToken, saveToken, destroyToken,getUserType,saveUserType };
