<template>
    <div>
        <form action="">
            <div class="form-group">
                <label for="">Campaign Title</label>
                <input type="text" class="form-control"
                :value="campaignDetails.campaignTitle"
                @input="updateCampaignDetails({'value': $event.target.value, 'property': 'campaignTitle'})"
                >
            </div>
        
            <div class="form-group">
                <label for="">Campaign Code</label>
                <input type="text" class="form-control"
                :value="campaignDetails.campaignCode"
                @input="updateCampaignDetails({'value': $event.target.value, 'property': 'campaignCode'})"
                >
            </div>

             <div class="form-group">
                <label for="">Campaign Description</label>
                <textarea class="form-control" name="" id="" cols="20" rows="5"
                :value="campaignDetails.campaignDescription"
                @input="updateCampaignDetails({'value': $event.target.value, 'property': 'campaignDescription'})"
                ></textarea>
            </div>

            <div class="form-group">
               <label for="">Campaign Start Date (month/day/year)</label>
               <input type="text" class="form-control"
               :value="campaignDetails.campaignStartDate"
                @input="updateCampaignDetails({'value': $event.target.value, 'property': 'campaignStartDate'})"
               >
            </div>

            <div class="form-group">
               <label for="">Campaign End Date</label>
                <input type="text" class="form-control"
                :value="campaignDetails.campaignEndDate"
                @input="updateCampaignDetails({'value': $event.target.value, 'property': 'campaignEndDate'})"
                >
            </div>

        </form>
        
   </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState('campaignCreation', ['campaignDetails'])
    },


    methods: {
        updateCampaignDetails: function(data) {
            this.$store.commit('campaignCreation/UPDATE_CAMPAIGN_DETAILS', data)
        }
    }
}
</script>