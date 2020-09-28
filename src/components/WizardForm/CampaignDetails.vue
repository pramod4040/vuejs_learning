<template>
    <div>   
    
        <label for="campaign-title">Full Name</label>
        <input id="campaign-title" type="text"
         :value="shopOwner.name"
         @input="updateShopOwner({'value': $event.target.value, 'property': 'name'})"
         >

        <label for="">Address</label>
        <input type="text"
        :value="shopOwner.address"
        @input="updateShopOwner({'value': $event.target.value, 'property': 'address'})"
        >

         <label for="">Age</label>
        <input type="number"
        :value="shopOwner.age"
        @input="updateShopOwner({'value': $event.target.value, 'property': 'age'})"
         >

        <button @click="submitData">Next</button>

    </div>
</template>


<script>
import { mapState } from 'vuex'

export default {
    name: 'CampaignDetails',
    props: {
        submitAndGoNext: Function
    },
    data () {
        return {
            title: 'Tinsting',
            campaign_details: {
                title: '',
                // code:'',
                description:'',
                product:'',
            }
            
        }
    },

    computed: {
        code () {
            return this.campaign_details.title.replace(/ +/g, "");
        },
        ...mapState('wizardForm', ['shopOwner', 'activeStep'])
    },

    methods: {
        submitData: function() {
            // console.log(this.campaign_details)
            // let form_data = {...this.campaign_details, code}
            this.submitAndGoNext(this.activeStep)
        },

        updateShopOwner: function(data) {
            this.$store.commit('wizardForm/UPDATE_SHOP_OWNER', data)
        }
    }
}
</script>