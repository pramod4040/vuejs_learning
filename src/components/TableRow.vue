<template>
    <tr>
        <td>
            <p v-if="info.record.id">Saved In Database</p>
            <input type="checkbox" v-bind:value="info.index" v-model="selectedRow">
        </td>
        <td>{{info.index + 1}}</td>
        <td>{{info.record.name}}</td>
        <td>{{info.record.address}}</td>
        <td>{{info.record.age}}</td>
        <td>
          <button @click.prevent="editRecord(info.record, info.index)" style="margin:6px; color: blue;">Edit</button>
          <button @click.prevent="deleteRecord(info.index, info.record.id)" style="margin:10px; color: red;">Delete</button>
        </td>
        
    </tr>


</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapState } = createNamespacedHelpers('dynamicTable')

export default {
    // name: TableRow,
    props: {
        info: Object,
        editData: Function,
        deleteData: Function,
    },
    computed: {
        ...mapGetters([
            'get_row_status'
        ]),
        selectedRow: {
            get(){
                return this.get_row_status
            },
            set (newVal){
                // console.log(newVal)
                this.$store.commit('dynamicTable/ADD_ROW_IN_SELECTED_LIST', this.info.index)
            }
        },
    },
    data () {
        return {
            // sn: 1,
            // name: "Pramod Khatiwada",
            // address: "testing",
            // age: 23  
            // selected_row_index: null
        }
    },
    // watch: {
    //     selected_row_index: function() {
    //         console.log(this.selected_row_index[0])
    //         this.$store.commit('dynamicTable/ADD_ROW_IN_SELECTED_LIST', this.selected_row_index[0])
    //     }

    // },

    methods: {
        editRecord (record, index) {
            // this.editData({index: index, name: record.name, address: record.address, age: record.age});
            this.editData({...record, index});

        },
        deleteRecord (index, id) {
            this.deleteData({'index': index, 'id': id})
        },
        // rowSelected (index) {
        //     this.$store.commit('dynamicTable/ADD_ROW_IN_SELECTED_LIST', index)
        // }
    }

}
</script>