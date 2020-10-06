<template>
    <b-container>

        <b-row>
            <b-col cols="12">
                <div class="form-group">
                    <label for="">Full Name: </label>

                    <input type="text" class="form-control"
                    :value="shopOwner.name"
                    @input="updateShopOwner({'value': $event.target.value, 'property': 'name'})"
                    >
                </div>
            </b-col>
            <b-col cols="12">
                <div class="form-group">
                    <label for="">Enter Address: </label>

                    <input type="text" class="form-control"
                    :value="shopOwner.address"
                    @input="updateShopOwner({'value': $event.target.value, 'property': 'address'})"
                    >
                </div>
            </b-col>
            <b-col cols="12">
                <div class="form-group">
                    <label for="">Enter Age: </label>

                    <input type="number" class="form-control"
                    :value="shopOwner.age"
                    @input="updateShopOwner({'value': $event.target.value, 'property': 'age'})"
                    >
                </div>
            </b-col>
        </b-row>
        
            <!--
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
        -->
            <b-button class="ml-3" variant="primary" @click="submitData">Next</b-button>
            <!-- <button @click="submitData">Next</button> -->
    </b-container>
</template>


<script>
import { mapState } from 'vuex'
// import FormErrorDisplay from '@/components/ErrorDisplay/FormError.vue';

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
            },
        
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