<template>
    <b-container>
        <b-row class="mt-5">
            <b-col cols="5">
                <h3>{{shopInfo.name}} <span style="font-size:14px">{{shopOwner.name}}</span></h3>
            </b-col>

         <b-col cols="7">
            <b-row v-for="(productInShop, shop_pro_index) in shopInfo.products" :key="shop_pro_index">
            <b-col cols="5">
            <div class="form-group">
                <label for="">Select Product</label>
                <select class="form-control" size="sm" 
                    @input="updateShopProductInfo({'value': $event.target.value, 'property': 'product_id', 'childIndex': shop_pro_index})"
                >

                    <option value="">Select One</option>
                    <option :value="productList.id + '_' + shop_pro_index" 
                        v-for="(productList, index) in productHavingStockAndNotSelected" :key="index"
                        :disabled="selectedProduct.includes(productList.id)"
                        :selected="productInShop.product_id == productList.id"
                        > {{productList.name}} </option>
                </select>
            </div>
            </b-col>
            <b-col cols="5">
              <div class="form-group">
                <label for="">Quantity</label>
                <select class="form-control" size="sm"
                    @input="updateShopProductInfo({'value': $event.target.value, 'property': 'quantity', 'childIndex': shop_pro_index})"
                >
                    <option :value="num" 
                        v-for="num in parseInt(stockOfProduct)" 
                        :key="num"
                        :selected="productInShop.quantity == num"
                    >{{num}}</option>
                </select>
               </div>
            </b-col>
            <b-col cols="2">
                    <b-button @click="removeShopProducts(shop_pro_index)" style="margin-top: 37px" variant="danger">X</b-button>
            </b-col>
            </b-row>
        </b-col>
        </b-row>
      <b-row>
            <!-- <b-cols cols="4"> </b-cols> -->
            <b-col cols="10">
                <b-button @click="addProductInShop" variant="primary" size="sm">Add More</b-button>
            </b-col>
            <b-col>
                <b-button @click="submitAndGoNext(activeStep)" variant="success">Next</b-button>
            </b-col>
        </b-row>
        
        
    </b-container>
</template>

<script>
import { mapState } from 'vuex'
import ApiService from '@/common/api.service.js'

export default {
    props: {
        'submitAndGoNext': Function
    },
    data () {
        return {
            allProductsList: [],
            stockOfProduct: 10,
            selectedProduct: [],
        }
    },
    created() {
        console.log(this.shopInfo)
        if (this.shopInfo.products.length == 0){
               this.$store.commit('wizardForm/ADD_PRODUCT_IN_SHOP_INFO');
        }
        this.getProductListDatabase();
        if (this.isEdit){
            this.addAlreadySelectedProduct()
        }
    },
    computed: {
        ...mapState('wizardForm', ['shopInfo', 'shopOwner', 'activeStep', 'isEdit']),

        productHavingStockAndNotSelected: function() {
            return this.allProductsList.filter((pro) => {
                if (pro.stock !== null){
                    return pro;
                }
            })
        }
    },

    methods: {
        getProductListDatabase () {
            ApiService.get('/products')
                .then(data => {
                    if (data.status == 'success'){
                        this.allProductsList = data.data
                    }
                })
        },

        updateShopProductInfo (data) {
            if (data.property == 'product_id') {
                //data.value have pro id and index
                 this.updateSelectedProductList(data.value)
                 //data.value make it pure pro_id
                 var pro_id = data.value.split('_')[0];
                 data.value =pro_id;
                 this.findStockOfProduct(data.value)
            }
            console.log(data)
            this.$store.commit('wizardForm/UPDATE_SHOP_PRODUCT_INFO', data)
        },

        addProductInShop (){
            this.$store.commit('wizardForm/ADD_PRODUCT_IN_SHOP_INFO')
        },

        removeShopProducts (index) {
            this.$store.commit('wizardForm/REMOVE_PRODUCT_FROM_SHOP', index);
        },

        updateSelectedProductList (pro_id_and_index) {
            let pro_id = pro_id_and_index.split('_')[0];
            let index = pro_id_and_index.split('_')[1];
            console.log(pro_id);
            console.log(index);

            if (this.selectedProduct.indexOf(pro_id) == -1){
                this.selectedProduct[index] = parseInt(pro_id)
            }else{
                this.selectedProduct[index] = parseInt(pro_id)
            }
        },

        findStockOfProduct (product_id){
            let selectedPro = this.productHavingStockAndNotSelected.find(pro => {
                if (parseInt(product_id) === pro.id){
                    return pro.stock;
                }
            });
            console.log(selectedPro.stock);
            this.stockOfProduct = selectedPro.stock;
        },

        addAlreadySelectedProduct (){
            let max_stock = 5;
            if (this.shopInfo.products.length >= 1){
                this.shopInfo.products.forEach((pro, index) => {
                    max_stock = (max_stock < pro.quantity) ? pro.quantity : max_stock;
                    this.selectedProduct[index] = parseInt(pro.product_id);
                })
            }
            this.stockOfProduct = max_stock
        }
    }
}
</script>