<template>
    <b-container>
        <router-link to="/wizard-form"> 
             <b-button variant="success" @click="clearState">Create New Shop Owner(Wizard Form)</b-button>
        </router-link>

        <!-- <b-button variant="success">Add Item (Wizard Form)</b-button> -->

        <b-row class="mt-3" v-for="record in listOfAllShopOwners" :key="record.id">
            <b-col cols="3"> {{record.name}} </b-col>
            <b-col cols="6"> </b-col>
            <b-col cols="3">
                <b-button variant="primary" @click="activeEditWizardForm(record.id)">Edit Button</b-button>
                <b-button @click="removeShopOwner(record.id)" class="ml-3" variant="danger">X</b-button>
            </b-col>
            <hr/>
        </b-row>

    </b-container>
</template>

<script>
import { mapState } from 'vuex'
import ApiService from '@/common/api.service.js'
export default {
    data () {
        return {
            // records: [1,2,3,4,5],
            listOfAllShopOwners: []
        }
    },

    computed: {
        // ...mapState('wizardForm', ['listOfAllShopOwners'])
    },

    created () {
        // this.$store.dispatch('wizardForm/getAllShopOwnersDatabase');
        this.getAllShopOwnersDatabase()
    },

    methods: {
        clearState () {
            // console.log('asd');
            this.$store.dispatch('wizardForm/clearStateBeforeCreatingNewShopOwner');
        },

        activeEditWizardForm (shopOwnerId) {
            //Setting Edit Environment
            this.$store.commit('wizardForm/SET_IS_EDIT')
            this.$store.commit('wizardForm/RESET_WIZARD_FORM_META_INFO')

            //find shop owner of this id from listOfALLShopOwner
            let shopOwnerDetails = this.findShopOwner(shopOwnerId)

            // Partation data into proper way
            let cleanData = {'shopOwner': this.getShopOwnerOnly(shopOwnerDetails), 'shopInfo': this.getShopInfoOnly(shopOwnerDetails.shop[0])};
            
            // console.log(cleanData);
            
            // dispatch to set all form value to edit pass shopowner
            this.$store.dispatch('wizardForm/setupDataStateForShopOwnerAndInfo', cleanData)
            this.$router.push('/wizard-form');

        },

        findShopOwner (id) {
            return this.listOfAllShopOwners.find(owner => {
                if (owner.id == id){
                    return owner;
                }
            })
        },

        getShopOwnerOnly (shopOwnerDetails) {
            return {'name': shopOwnerDetails.name, 'address': shopOwnerDetails.address, 'age': shopOwnerDetails.age, 'shopOwnerId': shopOwnerDetails.id};
        },

        getShopInfoOnly (firstShop) {
            return {'name': firstShop.name, 'location': firstShop.location, 'shopId': firstShop.id};
        },

        getAllShopOwnersDatabase () {
            ApiService.get('/dynamictable/all/record')
                .then(data => {
                    if (data.status == 'success'){
                        console.log(data);
                        this.listOfAllShopOwners = data.data
                    }
                })
        },

        removeShopOwner (id) {
            ApiService.delete(`/dynamictable/${id}`)
                .then(data => {
                    if (data.status == 'success') {
                        this.getAllShopOwnersDatabase()
                    }
                })
        }
    }
}
</script>