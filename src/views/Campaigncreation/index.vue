<template>
    <b-container class="main-container">
        <CampaignCreationNavBar />

        <CampaignDetails 
            v-if="currentStep == 1"
        />

        <ProductDetails
            v-if="currentStep == 2"
         />

        <CampaignCreationFooterButton 
            :submitAndNext="submitAndNext"
        />

        <!-- <b-row>
            <b-col cols="2">Side Nav bar</b-col>
            <b-col cols="10">Main Content </b-col>
        </b-row>     -->
    </b-container>
</template>


<script>
import { mapState } from 'vuex'
import CampaignCreationNavBar from '@/components/CampaignCreation/NavBar.vue'
import CampaignCreationFooterButton from '@/components/CampaignCreation/FooterButtons.vue'

import CampaignDetails from '@/components/CampaignCreation/CampaignDetails.vue'
import ProductDetails from '@/components/CampaignCreation/ProductDetails.vue'

export default {
    components: {
        'CampaignCreationNavBar': CampaignCreationNavBar,
        'CampaignCreationFooterButton': CampaignCreationFooterButton,
        'CampaignDetails': CampaignDetails,
        'ProductDetails': ProductDetails
        
    },

    computed: {
        ...mapState('campaignCreation', ['currentStep', 'campaignDetails', 'campaignId', 'isEdit'])
    },

    methods: {
        submitAndNext: function(step) {
            //dispatch and save / update campaign data in database
        switch (step) {
            case 1:
                if (this.campaignId == '' && this.isEdit == false){
                    this.createCampaign(step)
                 }else{
                     this.updateCampaign(step)
                 }
                break;


            case 2:
                this.updateCampaign(step)


        }

                
        },

        createCampaign: function(step) {
             return this.$store
                .dispatch('campaignCreation/createCampaign', {'campaignDetails': this.campaignDetails})
                 .then(data => {
                     console.log(data)
                     this.$store.commit("campaignCreation/SET_CAMPAIGN_ID", {
                            campaignId: data.id,
                        });

                    // update completedstep and current step
                    this.$store.commit('campaignCreation/UPDATE_COMPLETED_STEP', step);
                    this.$store.commit('campaignCreation/UPDATE_CURRENT_STEP', step + 1);
                })
        },

        updateCampaign: function() {
            return this.$store
                .dispatch('')
        }
    }
}
</script>


<style scoped>
    .main-container{
        /* max-width: 1000px;
        height: 600px; */
        border: 2px solid green;
    }
</style>    

