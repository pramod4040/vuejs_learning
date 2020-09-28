import ApiService from '@/common/api.service.js';

const wizard_form = {

    namespaced: true,
    state: {
        // campaign_details: {
        //     title: '',
        //     description: '',
        //     product_service_name: ''
        // },

        selectedInfluencers: [
            {id: 1, name: 'influencer one', dynamictable: []},
            {id: 2, name: 'influencer two', dynamictable: []},
            {id: 3, name: 'influencer three', dynamictable: []},
            {id: 4, name: 'influencer four', dynamictable: []},
        ],

        // listOfAllShopOwners: [],

        shopOwner: {
            name: '',
            address: '',
            age: ''
        },

        shopInfo: {
            name: '',
            location: '',
            products: []
        },

        productInfo: {
            name: '',
            price: '',
            description: ''
        },

        productDetails: {
            stock: '',
            published: '',
        },

        activeStep:1,
        completedStep: [],
        finalStep: 3,
        oneGretterThenMaxCompletedStep: 0,

        shopOwnerId: '',
        productId: '',
        shopId: '',

        idEdit: false,
    },

    mutations: {
        
        UPDATE_SHOP_OWNER (state, payload) {
            state.shopOwner[payload.property] = payload.value
        },

        UPDATE_PRODUCT_INFO (state, payload) {
           state.productInfo[payload.property] = payload.value  
        },
        
        UPDATE_INFLUENCER_WORK (state, data) {
            state.selectedInfluencers[data.influencerIndex].dynamictable[data.childIndex][data.property] = data.value
        },

        DELETE_INFLUENCER_WORK (state, data) {
             if (state.selectedInfluencers[data.influencerIndex].dynamictable.length >=2 ){
                state.selectedInfluencers[data.influencerIndex].dynamictable.splice(data.work_index, 1)
            }
        },

        ADD_INFLUENCER_WORK (state, inf_index){
            state.selectedInfluencers[inf_index].dynamictable.push({})
        },

        REMOVE_INFLUENCER (state, inf_index) {
            if (state.selectedInfluencers.length >= 2) {
                state.selectedInfluencers.splice(inf_index, 1)
            }
        },

        UPDATE_ASSIGN_ACTIVE_STEP (state, step) {
            state.activeStep = step;
        },

        UPDATE_INCREMENT_ACTIVE_STEP (state) {
            state.activeStep = state.activeStep + 1
        },

        SET_SHOP_OWNER_ID (state, id) {
            state.shopOwnerId = id
        },

        ASSIGN_ONE_GRETTER_THEN_MAX_COMPLETED (state, value){
            state.oneGretterThenMaxCompletedStep = value
        },

        UPDATE_COMPLETED_STEP (state, completed_step) {
            state.completedStep.push(completed_step)
        },

        SET_PRODUCT_ID (state, id) {
            state.productId = id;
        },

        UPDATE_PRODUCT_DETAILS (state, payload) {
            state.productDetails[payload.property] = payload.value
        },

        UPDATE_SHOP_INFO (state, payload) {
            // console.log(payload);
            state.shopInfo[payload.property] = payload.value;
        },

        SET_SHOP_ID (state, id){
            state.shopId = id;
        },

        // Clearing and reset
        CLEAR_SHOP_OWNER (state) {
            state.shopOwner = {'name': '', 'address': '', 'age': ''};
        },
        CLEAR_SHOP_INFO (state) {
            state.shopInfo = {'name': '', 'location': '', 'products': []};
        },
        CLEAR_PRODUCT_INFO (state) {
            state.productInfo = {'name': '', 'price': '', 'description': ''};
        },
        CLEAR_PRODUCT_DETAILS (state) {
            state.productDetails = {'stock': '', 'published': ''};
        },
        RESET_WIZARD_FORM_META_INFO (state) {
            state.activeStep = 1
            state.completedStep = []
            state.oneGretterThenMaxCompletedStep = 0
        },
        RESET_SHOP_OWNER_ID (state) {
            state.shopOwnerId = ''
        },
        RESET_PRODUCT_ID (state) {
            state.productId = ''
        },

        // Edit Related
        SET_IS_EDIT (state) {
            state.isEdit = true;
        },

        RESET_IS_EDIT (state) {
            state.isEdit = false
        },

        SET_SHOP_OWNER_TO_EDIT (state, payload) {
            state.shopOwner.name = payload.name
            state.shopOwner.age = payload.age
            state.shopOwner.address = payload.address
            state.shopOwnerId = payload.shopOwnerId
        },

        SET_SHOP_INFO_TO_EDIT (state, payload){
            state.shopInfo.name = payload.name
            state.shopInfo.location = payload.location,
            state.shopId = payload.shopId
        },

        SET_PRODUCT_IN_SHOP_INFO_FOR_EDIT (state, payload) {
            state.shopInfo.products = payload
        },

        UPDATE_SHOP_PRODUCT_INFO (state, payload) {
            state.shopInfo.products[payload.childIndex][payload.property] = payload.value 
        },

        ADD_PRODUCT_IN_SHOP_INFO (state){
        //    let length = state.shopInfo.products.length;
        //    if (length === undefined){
        //        state.shopInfo.products.push({'id': 0})
        //    }else{
        //        state.shopInfo.products.push({'id': length})
        //    }
            state.shopInfo.products.push({})
        },
        REMOVE_PRODUCT_FROM_SHOP (state, index) {
            if (state.shopInfo.products.length > 1){
                state.shopInfo.products.splice(index, 1)
            }
        },

      

    },

    actions: {
         createShopOwner(context) {
            return new Promise((resolve, reject) => {
                 ApiService.post('/dynamictable', {'data': context.state.shopOwner})
                   .then((data) => {
                       if (data.status == 'success'){
                            context.commit('SET_SHOP_OWNER_ID', data.data.id)
                            // console.log(data);
                            resolve(data)
                       }
                   })
            })
        },

        updateShopOwner (context) {
            return new Promise((resolve, reject) => {
                ApiService.patch(`/dynamictable/${context.state.shopOwnerId}`, context.state.shopOwner)
                    .then(data => {
                        console.log(data);
                        resolve(data);
                    })
            })
        },

        createShopInfo (context) {
            return new Promise((resolve,reject) => {
                let data = {...context.state.shopInfo, 'shopOwnerId': context.state.shopOwnerId}
                ApiService.post('/shop', data)
                    .then(data => {
                         if (data.status == 'success') {
                            context.commit('SET_SHOP_ID', data.data.id)
                              resolve(data)
                         }
                    })
            });
        },

        updateShopInfo (context) {
            return new Promise((resolve, reject) => {
                ApiService.patch(`/shop/${context.state.shopId}`, context.state.shopInfo)
                    .then((data) => {
                        console.log(data);
                        if (data.status == 'success') {
                            resolve(data)
                        }
                    })
            });
        },

        createProductInfo(context) {
            return new Promise((resolve, reject) => {
                var data = {...context.state.productInfo, 'shopOwnerId': context.state.shopOwnerId};
                console.log(data);
                ApiService.post('/products', data)
                    .then((data) => {
                        if (data.status == 'success'){
                            context.commit('SET_PRODUCT_ID', data.data.id)
                            resolve(data)
                        }
                    })
            })
        },

        updateProductInfo(context){
            return new Promise((resolve, reject) => {
                var data = {...context.state.productInfo, ...context.state.productDetails}
                ApiService.patch(`/products/${context.state.productId}`, data)
                    .then((data) => {
                        if(data.status == 'success') {
                            resolve(data);
                        }
                    })
            })
        },

        clearStateBeforeCreatingNewShopOwner (context) {
            context.commit('CLEAR_SHOP_OWNER')
            context.commit('CLEAR_SHOP_INFO')
            context.commit('CLEAR_PRODUCT_INFO')
            context.commit('CLEAR_PRODUCT_DETAILS')
            context.commit('RESET_WIZARD_FORM_META_INFO')
            context.commit('RESET_SHOP_OWNER_ID')
            context.commit('RESET_PRODUCT_ID')

            context.commit('RESET_IS_EDIT')
        },

        createShopProduct (context) {
            let data = {'shopId': context.state.shopId, 'products': context.state.shopInfo.products}
            return new Promise((resolve,reject) => {
                ApiService.post('/shop/add/products/bulk', data)
                .then(data => {
                    if (data.status == 'success') {
                        resolve(data);
                    }
                })
            })
                
        },

        updateShopProduct (context) {
            let data = {'shopId': context.state.shopId, 'products_shop': context.state.shopInfo.products}
            return new Promise((resolve, reject) => {
                ApiService.post('/shop/update/product/bulk', data)
                    .then(data => {
                        if(data.status == 'success') {
                            resolve(data)
                        }
                    })
            });
        },

        setupDataStateForShopOwnerAndInfo (context, data) {
            // set edit state for shopOwner
            context.commit('SET_SHOP_OWNER_TO_EDIT', data.shopOwner)

            // set edit state for shopInfo
            context.commit('SET_SHOP_INFO_TO_EDIT', data.shopInfo)
        },

        setupShopProductForEdit (context) {
            ApiService.get(`/retrive/shop/product/${context.state.shopId}`)
                .then(data => {
                    if (data.status == 'success') {
                        if (data.count !== 0){
                            context.commit('SET_PRODUCT_IN_SHOP_INFO_FOR_EDIT', data.data)
                        }
                    }
                });
        }
    }
}

export default wizard_form