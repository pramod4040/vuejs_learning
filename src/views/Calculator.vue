<template>
    <b-container>
            <b-card header-tag="header"
            >

            <template v-slot:header>
                <h2 class="calculator-display" v-if="displaySectionCalculator">{{displaySectionCalculator}}</h2>
                <h2 class="calculator-display" v-else>0000000</h2>
            </template>


            <b-card-text>
                <b-row v-for="(group, i) in displayElementsGroup" :key="i">
                    <b-col v-for="(item, index) in displayElements.slice(i * itemsPerRow, (i+1) * itemsPerRow)" :key="index">
                        <div class="calculator-buttons mb-3" @click="buttonClicked({value: item.value, type: item.type, displayName: item.displayName})">
                            {{item.displayName}}
                            
                        </div>
                
                    </b-col>
                </b-row>

            </b-card-text>
            </b-card>
    </b-container>
</template>


<style scoped>
    .calculator-buttons{
        /* width: 80px;
        height: 80px;
        display: inline-block;
        border: 1px solid gray;
        box-sizing: border-box;
        text-align: center;
        margin:auto; */

        padding: 30px 30px;
        font-size: 35px;
        text-align: center;
        cursor: pointer;
        outline: none;
        color: #fff;
        background-color: #4CAF50;
        border: none;
        border-radius: 15px;
        box-shadow: 0 9px #999;
    }
    .calculator-buttons:hover{
        background-color: #3e8e41;
        /* cursor: pointer;  */
    }
    .calculator-buttons:active {
        background-color: #3e8e41;
        box-shadow: 0 5px #666;
        transform: translateY(4px);
    }

    .calculator-display{
        padding: 30px 30px;
        font-size: 35px;
        text-align: center;
        outline: none;
        color: #fff;
        background-color: #4CAF50;
        border: none;
        border-radius: 15px;
        box-shadow: 0 9px #999;
    }
</style>

<script>
import { mapState } from 'vuex'
export default {
    data () {
        return {
            itemsPerRow: 4,
        }
    },
    computed: {
        ...mapState('calculator', ['displayElements', 'stage', 'displaySectionCalculator']),

        displayElementsGroup () {
            return Array.from(Array(Math.ceil(this.displayElements.length / this.itemsPerRow)).keys());
        }
    },

    methods: {
        buttonClicked (data) {
            if (data.type == 'operand'){
                this.$store.dispatch('calculator/operandHandler', data)
            }
            if (data.type == 'operator' && this.stage !== 'process'){
                this.$store.commit('calculator/CHANGE_STAGE', 'operator')
                this.$store.dispatch('calculator/operatorHandler', data)
            }
            if (data.type == 'process'){
                if (data.value == 'clear'){
                    this.$store.dispatch('calculator/clearAll')
                    this.$store.commit('calculator/CHANGE_STAGE', 'firstOperand')
                }else{
                    console.log(data)
                    this.$store.dispatch('calculator/processHandler', data)
                }
            }
        }
    }
}
</script>