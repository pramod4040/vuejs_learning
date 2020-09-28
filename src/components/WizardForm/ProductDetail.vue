<template>
    <div>
        <label for="">Stock</label>
        <input type="number"
        :value="productDetails.stock"
        @input="updateProductDetail({'value': $event.target.value, 'property': 'stock'})"
        >

        <label for="">Published</label>
        <select
        @input="updateProductDetail({'value': $event.target.value, 'property': 'published'})"
        >
            <option v-for="option in options" :key="option.id" :value="option.value" :selected="productDetails.published == option.value">{{option.name}}</option>
        </select>

       <button @click="submitAndGoNext(activeStep)">Next</button>
    </div>
</template>


<script>
import { mapState } from 'vuex';

export default {
    props: {
        submitAndGoNext: Function
    },

    computed: {
        ...mapState('wizardForm', ['productDetails', 'activeStep'])
    },
    data () {
        return {

            options: [
                {id: 0, name:'Select One', value:""},
                {id: 1, name:'Yes', value:"Yes"},
                {id: 2, name: 'No', value:'No'},

            ]
        }
    },

    methods: {
        updateProductDetail (data) {
            this.$store.commit('wizardForm/UPDATE_PRODUCT_DETAILS', data);
        }
    }
}
</script>