<template>
    <div>
        <b-row>
                <!-- <b-col v-for="steps in formSteps" :key="steps.id">
                    <router-link
                        :to="{name:'app-create-campaign',params:{slug:steps.slug}}"
                        :class="enableRouteLink(steps.id) ? '' : 'disabled'"
                    >
                    <span>{{steps.title}}</span>
                    </router-link>
                </b-col> -->

                <b-col>
                    <router-link
                        :to="{name:'app-create-campaign',params:{slug:'campaign-details'}}"
                        :class="completedStep >= 0 ? '' : 'disabled'"
                    >
                    <span @click="updateCurrentStep(1)">Campaign Details</span>
                    </router-link>
                </b-col>

                 <b-col>
                    <router-link
                        :to="{name:'app-create-campaign',params:{slug:'product-details'}}"
                        :class="completedStep >= 1 ? '' : 'disabled'"
                    >
                    <span @click="updateCurrentStep(2)">Product Details</span>
                    </router-link>
                </b-col>
                <b-col>
                    <router-link
                        :to="{name:'app-create-campaign',params:{slug:'influencer-selection'}}"
                        :class="completedStep >= 2 ? '' : 'disabled'"
                    >
                    <span @click="updateCurrentStep(3)">Influencer Select</span>
                    </router-link>
                </b-col>

                <b-col>
                    <router-link
                        :to="{name:'app-create-campaign',params:{slug:'post-selection'}}"
                        :class="completedStep >= 3 ? '' : 'disabled'"
                    >
                    <span @click="updateCurrentStep(4)">Post Selection</span>
                    </router-link>
                </b-col>
                <b-col>
                    <router-link
                        :to="{name:'app-create-campaign',params:{slug:'review-and-submit'}}"
                        :class="completedStep >= 4 ? '' : 'disabled'"
                    >
                    <span @click="updateCurrentStep(5)">Review And Submit</span>
                    </router-link>
                </b-col>
        </b-row>

    </div>
</template>

<style scoped>
   .disabled{
       pointer-events: none;
   }
   .router-link-exact-active .router-link-active {
       color: green;
   }
</style>

<script>
import { mapState } from 'vuex'
export default {
    data () {
        return {
            // formSteps: [
            //     {id: 1, 'title': 'Campaign Details', 'slug': 'campaign-details'},
            //     {id: 2, 'title': 'Product Details', 'slug': 'product-details'},
            //     {id: 3, 'title': 'Influencer Selection', 'slug': 'influencer-selection'},
            //     {id: 4, 'title': 'Post Selection', 'slug': 'post-selection'},
            //     {id: 5, 'title': 'Review And Submit', 'slug': 'review-and-submit'}
            // ],

        }
    },
    computed: {
        ...mapState('campaignCreation', ['totalStep', 'currentStep', 'completedStep']),
       
    },

    methods: {
        updateCurrentStep (step) {
            console.log('asd');
            this.$store.commit('campaignCreation/UPDATE_CURRENT_STEP', step)
        }
        
    }
}
</script>