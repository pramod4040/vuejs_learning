<template>
    <div>
        <label for="">Product Name</label>
        <input type="text"
        :value="productInfo.name"
        @input="updateProductInfo({'value': $event.target.value, 'property': 'name'})"
        >

        <label for="">Product Price</label>
       <input type="number"
        :value="productInfo.price"
        @input="updateProductInfo({'value': $event.target.value, 'property': 'price'})"
       >

       <label for="">Product Description</label>
       <input type="text"
        :value="productInfo.description"
        @input="updateProductInfo({'value': $event.target.value, 'property': 'description'})"
       >

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
        ...mapState('wizardForm', ['productInfo', 'activeStep'])
    },
    data () {
        return {
            options: [
                {id: 0, name:'Select One'},
                {id: 1, name:'Beauty'},
                {id: 2, name: 'Fashion'},
                {id: 3, name:'Financial'},
                {id: 4, name:'Food / Beverage'}

            ]
        }
    },

    methods: {
        updateProductInfo (data) {
            this.$store.commit('wizardForm/UPDATE_PRODUCT_INFO', data);
        }
    }
}
</script>