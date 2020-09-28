<template>
    <div>   
    
        <label for="">Shop Name</label>
        <input id="" type="text"
         :value="shopInfo.name"
         @input="updateShopInfo({'value': $event.target.value, 'property': 'name'})"
         >

        <label for="">Location</label>
        <input type="text"
        :value="shopInfo.location"
        @input="updateShopInfo({'value': $event.target.value, 'property': 'location'})"
        >

        <button @click="submitData">Next</button>

    </div>
</template>


<script>
import { mapState } from 'vuex'

export default {
    name: 'ShopDetails',
    props: {
        submitAndGoNext: Function
    },
    data () {
        return {
            test: ''
        }
    },

    computed: {
        ...mapState('wizardForm', ['shopInfo', 'activeStep'])
    },

    methods: {
        submitData: function() {
            // console.log(this.campaign_details)
            // let form_data = {...this.campaign_details, code}
            this.submitAndGoNext(this.activeStep)
        },

        updateShopInfo: function(data) {
            this.$store.commit('wizardForm/UPDATE_SHOP_INFO', data)
        }
    }
}
</script>