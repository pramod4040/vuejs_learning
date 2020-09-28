<template>
    <div>
        <p>Product Details</p>

        <form action="">
            <div class="form-group">
                <label for="">Select Product Category</label>
                <select class="form-control"
                @input="updateProductService({'value': $event.target.value, 'property': 'productCategory'})"
                >
                    <option v-for="(productCat, index) in productCategory" 
                    :key="index"
                    :value="productCat.title + '_' + productCat.id"
                    
                    >{{productCat.title}}</option>
                </select>
            </div>
        
            <div class="form-group">
                <label for="">Product Title</label>
                <input type="text" class="form-control"
                :value="productService.productTitle"
                @input="updateProductService({'value': $event.target.value, 'property': 'productTitle'})"
                >
            </div>

             <div class="form-group">
                <label for="">Product Description</label>
                <textarea class="form-control" name="" id="" cols="20" rows="5"
                :value="productService.productDescription"
                @input="updateProductService({'value': $event.target.value, 'property': 'productDescription'})"
                ></textarea>
            </div>

        </form>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState('campaignCreation', ['productService'])
    },

    data() {
        return {
            productCategory: [
                {id: 14, title: 'Automobile'},
                {id: 15, title: 'Banking And Finance'},
                {id: 2, title: 'Beauty'},
                {id: 4, title: 'Food & Beverages'}
            ]
        }
    },

    methods: {
        updateProductService: function(data) {
            this.$store.commit('campaignCreation/UPDATE_PRODUCT_SERVICE', data)
        }
    }
    
}
</script>