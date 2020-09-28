<template>
    <div>
        <router-link to="/wizard-form/list" class="float-right">
                <b-button variant="primary">WizardForm List</b-button>
         </router-link>

        <h3 v-if="isEdit" class="float-left ml-5"> Edit </h3>
        <h3 v-else class="float-left ml-5">Create </h3>
        
        <div>
            <button :class="(activeStep == 1) ? 'active-button-class' : ''" @click="makeActive(1)">Shop Owner</button>

            <button :disabled="completedStep.indexOf(2) === -1 && activeStep !== 2 && oneGretterThenMaxCompletedStep !== 2"
            :class="(activeStep == 2) ? 'active-button-class' : ''"
            @click="makeActive(2)">Shop Info</button>

            <button :disabled="completedStep.indexOf(3) === -1 && activeStep !== 3 && oneGretterThenMaxCompletedStep !== 3"
            :class="(activeStep == 3) ? 'active-button-class' : ''"
            @click="makeActive(3)">Shop Product</button>
            
            <!-- <button :disabled="completedStep.indexOf(4) === -1 && activeStep !== 4 && oneGretterThenMaxCompletedStep !== 4"
            :class="(activeStep == 4) ? 'active-button-class' : ''"
            @click="makeActive(4)">Product Info</button>

            <button 
            :disabled="completedStep.indexOf(5) === -1 && activeStep !== 5 && oneGretterThenMaxCompletedStep !== 5"
            :class="(activeStep == 5) ? 'active-button-class' : ''"
            @click="makeActive(5)"> Product Details</button> -->


            <!-- <button 
            :disabled="completedStep.indexOf(4) === -1 && activeStep !== 4 && oneGretterThenMaxCompletedStep !== 4"
            :class="(activeStep == 4) ? 'active-button-class' : ''"
            @click="makeActive(4)">Post Selection</button>

            <button 
            :disabled="completedStep.indexOf(5) === -1 && activeStep !== 5 && oneGretterThenMaxCompletedStep !== 5"
            :class="(activeStep == 5) ? 'active-button-class' : ''"
            @click="makeActive(5)">Review And Submit</button> -->
        </div>
            <br/>
        <!-- shop owner -->
           <CampaignDetails 
               v-if="activeStep == 1"
               :submitAndGoNext="submitAndGoNext"
           />

           <!-- product information -->
          <ShopDetails 
            v-if="activeStep == 2"
            :submitAndGoNext="submitAndGoNext"
          />
          <!-- <div v-if="activeStep == 1"> 
              Campaign Details <button @click="goNext()">Submit</button>
          </div> -->

          <!-- select produc for shop -->
          <ShopProducts
            v-if="activeStep == 3"
            :submitAndGoNext="submitAndGoNext"
          />

        <!-- product information -->
          <ProductService 
            v-if="activeStep == 4"
            :submitAndGoNext="submitAndGoNext"
          />

         <!-- <div v-if="activeStep == 2"> 
              Product and service <button @click="submitAndGoNext()">Submit</button>
          </div> -->

          <ProductDetails
            v-if="activeStep == 5"
            :submitAndGoNext="submitAndGoNext"
           />

        <!-- <div v-if="activeStep == 3"> 
              Influencer Selection <button @click="submitAndGoNext()">Submit</button>
        </div> -->

        <!-- <PostSelection 
            v-if="activeStep == 4"
            :submitAndGoNext="submitAndGoNext"
        /> -->

        <!-- <div v-if="activeStep == 4"> 
             Post Selection <button @click="submitAndGoNext()"> Submit</button>
          </div> -->

          <!-- <ReviewAndSubmit 
            v-if="activeStep == 5"
            :submitAndGoNext="submitAndGoNext"
          /> -->


        <!-- <div v-if="activeStep == 5"> 
              Review ANd submit <button @click="submitAndGoNext()">Submit</button>
          </div> -->


          <hr/>

        <!-- <DynamicEntry /> -->

    </div>
</template>

<style scoped>
    .active-button-class {
        color: green;
    }
</style>

<script>
import CampaignDetails from '@/components/WizardForm/CampaignDetails.vue'
import ProductService from '@/components/WizardForm/ProductService.vue'
import InfluencerSelection from '@/components/WizardForm/InfluencerSelection.vue'
import PostSelection from '@/components/WizardForm/PostSelection.vue'
import ReviewAndSubmit from '@/components/WizardForm/ReviewAndSubmit.vue'
import ProductDetails from '@/components/WizardForm/ProductDetail.vue'
import ShopProducts from '@/components/WizardForm/ShopProducts.vue'

import ShopDetails from '@/components/WizardForm/ShopDetails.vue'

import DynamicEntry from '@/components/DynamicEntry.vue'
import { mapState } from 'vuex'
export default {
    components: {
        'CampaignDetails': CampaignDetails,
        'ProductService': ProductService,
        // 'InfluencerSelection': InfluencerSelection,
        // 'PostSelection' : PostSelection,
        // 'ReviewAndSubmit' : ReviewAndSubmit,
        // 'DynamicEntry': DynamicEntry,
        'ProductDetails': ProductDetails,
        'ShopDetails': ShopDetails,
        'ShopProducts': ShopProducts
    },
    computed: {
        ...mapState('wizardForm', ['activeStep', 'completedStep',
         'finalStep', 'oneGretterThenMaxCompletedStep', 'productId', 'isEdit'])
    },
    data () {
        return {
            // wizardFormRecord:[],
            // activeStep:1,
            // completedStep: [],
            // finalStep: 5,
            // wizardSteps: ['campaign_details', '']
        }
    },

    methods: {
        makeActive(id) {
            this.$store.commit('wizardForm/UPDATE_ASSIGN_ACTIVE_STEP', id)
        },

        submitAndGoNext (step) {
            console.log('current step' + step)
             //method for creating (create) shop owner
            //step 1
            if (this.activeStep == 1 && this.activeStep == step){
                //we can use shopOwnerId for this check
                if (this.completedStep.includes(1) || this.isEdit){
                    this.$store.dispatch('wizardForm/updateShopOwner')
                        .then(data => {
                            this.handleActiveStepAndCompleted();
                        }) 
                }else{
                    this.$store.dispatch('wizardForm/createShopOwner')
                        .then((data) => {
                            // console.log(data)
                            // console.log('wizard from methods after dispatch');
                            this.handleActiveStepAndCompleted();
                        })
                }
            }

            //handle step 2 shop Info step
            if (this.activeStep == 2 && this.activeStep == step){
                if (this.completedStep.includes(2) || this.isEdit){
                    console.log('call update shopInfo Dispatch');

                    // prepare Edit data for next step retrive product of shops
                    this.$store.dispatch('wizardForm/setupShopProductForEdit')

                    this.$store.dispatch('wizardForm/updateShopInfo')
                        .then(data => {
                            console.log(data);
                            this.handleActiveStepAndCompleted();
                        })
                }else{
                    this.$store.dispatch('wizardForm/createShopInfo')
                        .then(data => {
                            this.handleActiveStepAndCompleted();
                        })
                }
            }
            

            //handle step 3 shopProduct
            if (this.activeStep == 3 && this.activeStep == step){
                if(this.completedStep.includes(3) || this.isEdit){
                    console.log('call updateShopProduct dispatch')
                    this.$store.dispatch('wizardForm/updateShopProduct')
                        .then(data => {
                            this.handleActiveStepAndCompleted();
                        });
                }else{
                    this.$store.dispatch('wizardForm/createShopProduct')
                        .then((data) => {
                            this.handleActiveStepAndCompleted();
                        })
                }
            }

            // handle step 4 create or update
            //step 4
            if (this.activeStep ==4 && this.activeStep == step) {
                // console.log('entering restricted area')
                if (this.completedStep.includes(4)){
                    console.log('call updateProduct dispatch');
                    this.$store.dispatch('wizardForm/updateProductInfo')
                        .then(data => {
                            this.handleActiveStepAndCompleted()
                        })
                    // this.handleActiveStepAndCompleted();
                }else{
                    this.$store.dispatch('wizardForm/createProductInfo')
                        .then(data => {
                            this.handleActiveStepAndCompleted()
                        }) 
                }
            }

            //handle step 5 extended of step 3 update only with productId
            if (this.activeStep == 5 && this.activeStep == step){
                if (this.productId != ''){
                    this.$store.dispatch('wizardForm/updateProductInfo')
                        .then(data => {
                            this.handleActiveStepAndCompleted()
                        })
                }
            }
            

            
        },

        // handleFormData () {
            
        //     //method for creating (create) shop owner
        //     this.$store.dispatch('wizardForm/createShopOwner')
        // },

        handleActiveStepAndCompleted () {
            console.log('handle active');
            if (this.completedStep.indexOf(this.activeStep) == -1){
                // this.completedStep.push(parseInt(this.activeStep))
                this.$store.commit('wizardForm/UPDATE_COMPLETED_STEP', parseInt(this.activeStep)); 
            }

            // one gretter then max completed step
            let max_completed = Math.max.apply(Math, this.completedStep);
            this.$store.commit('wizardForm/ASSIGN_ONE_GRETTER_THEN_MAX_COMPLETED', max_completed + 1)

            if (this.activeStep + 1 > this.finalStep){
                this.$store.commit('wizardForm/UPDATE_ASSIGN_ACTIVE_STEP', this.finalStep)
                this.$router.push('/wizard-form/complete');
                // this.activeStep = this.finalStep
            }else{
                // this.activeStep += 1
                console.log(this.activeStep);
                this.$store.commit('wizardForm/UPDATE_INCREMENT_ACTIVE_STEP')
                console.log(this.activeStep);
            }
        }

        // goNext () {
        //     if (this.completedStep.indexOf(this.activeStep) == -1){
        //         this.completedStep.push(parseInt(this.activeStep))
        //     }
        //     if (this.activeStep + 1 > this.finalStep){
        //         this.activeStep = this.finalStep
        //     }else{
        //         this.activeStep += 1
        //     }
        // }
    }
}
</script>