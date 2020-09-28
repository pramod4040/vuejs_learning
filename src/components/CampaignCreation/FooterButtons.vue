<template>
    <div>
        <b-row>
            <b-col>
                <b-button variant="success" @click="submitAndNext(currentStep)">{{btnName}}</b-button>
            </b-col>
            <b-col>
                <b-button variant="primary" v-if="showBack">BACK</b-button>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: {
        submitAndNext: Function
    },
    data () {
        return {
            btnName: '',
            showBack: false,
        }
    },
    computed: {
        ...mapState('campaignCreation', ['currentStep'])
    },

    

    created () {
        if (this.currentStep == 5){
            this.btnName = 'Submit For Approval'
        }else{
            this.btnName = 'Next'
        }
        if (this.currentStep != 1){
            this.showBack = true
        }
    }
}
</script>