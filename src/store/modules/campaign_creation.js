import JwtService from '@/common/jwt.service.js'
import ApiService from '@/common/api.service.js'

const campaignCreation = {
    namespaced: true,
    state: {
        totalStep: 5,
        currentStep: 1,
        completedStep: 0,

        campaignDetails: {
            campaignTitle: '',
            campaignDescription: '',
            campaignStartDate: '',
            campaignEndDate: '',
            campaignCode: '',
        },
        productService: {
            productCategory:"",
            productTitle: '',
            productDescription: '',
            productVideoLink: '',
            productImage: ''
        },
        campaignId: '',
        isEdit: false,

    },
    mutations: {
        UPDATE_CURRENT_STEP (state, step) {
            state.currentStep = step
        },

        DECREMENT_CURRENT_STEP (state) {
            state.currentStep = state.currentStep - 1
        },

        UPDATE_COMPLETED_STEP (state, step){
            state.completedStep = step
        },  

        UPDATE_CAMPAIGN_DETAILS (state, payload) {
            if (payload.property != 'campaignCode'){
                state.campaignDetails[payload.property] = payload.value
            }
            if (payload.property == 'campaignTitle' || payload.property == 'campaignCode'){
                var code = payload.value
                code = code.replace(/ /g, '');
                state.campaignDetails['campaignCode'] = code
            }
        },

        UPDATE_PRODUCT_SERVICE (state, payload){
            state.productService[payload.property] = payload.value
        },

        SET_CAMPAIGN_ID (state, payload) {
            state.campaignId = payload.campaignId
        }

    },

    actions: {

        async createCampaign(context, data){
            if (JwtService.getToken()) {
                ApiService.setHeader();
                return new Promise((resolve, reject) => {
                    ApiService.post("/campaign/create", {
                        "p_title": data.campaignDetails.campaignTitle,
                        "p_description": data.campaignDetails.campaignDescription,
                        "p_start_date": data.campaignDetails.campaignStartDate,
                        "p_end_date": data.campaignDetails.campaignEndDate,
                        "p_campaign_code": data.campaignDetails.campaignCode
                    }).then(data => {
                        // console.log(data)
                        // context.commit('SET_ERRORS', []);
                        resolve(data.data);
                    }).catch(({ response }) => {
                        if (response.status == 422) {
                            context.commit('SET_ERRORS', response.data.errors)
                        }
                        reject(response);
                    });
                })
            }
        }

    }
}

export default campaignCreation