<template>
    <div>
        
     <form action="" id="dynamic-table-form">
         <label for="name_1">Enter Name</label>
        <input type="text"  v-model="name" placeholder="Enter Name here">

        <label>Enter Address</label>
        <input type="text"  v-model="address">

        <label>Enter Age</label>
        <input type="number" v-model="age">

        <button v-if="!editRecord" type="submit" @click.prevent="addData()">Add Row</button>
        <button v-if="editRecord && !savedInDatabase" type="submit" @click.prevent="saveEditedData()">Edit Row</button>
        <button v-if="editRecord && savedInDatabase" @click.prevent="saveEditedInDatabase()">Persist In Database</button>

      </form>
        
        <br>
        <table border="1px" width="100%">
            <tr>
                <th>
                      <input type="checkbox" id="select_all_id" v-model="select_all_row">
                      <label for="select_all_id">Select All</label>
                </th>
                <th>SN</th>
                <th>Name</th>
                <th>Address</th>
                <th>Age</th>
                <th>Options</th>
            </tr>

            <TableRow
            v-for="(record, index) in records"
            :key="JSON.stringify({'id': record.id, 'index':index, 'name': record.name, 'address': record.address})"
            :info="{index: index, record: record}"
            :editData="editData"
            :deleteData="deleteData"

             />

<!-- 
            <component
            :is="tablerow"
            v-for="(record, index) in records"
            :key="index"
             /> -->
        <!-- :rowSelected="rowSelected"
            :selectedRowList="selectedRowList" -->
            
        </table>


         <!-- <button @click="get_dynamic_table_record">Send Get request to dynamicTable</button> -->
         <button @click="delete_selected_record_database">Delete Multiple Selected Record</button>
         <button @click="save_multiple_records_in_database">Save multiple records in database</button>

        
    </div>
</template>

<style scoped>
    input[type=text] {
        /* width: 50%; */
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        font-size: 1rem;
    }
    input[type=number] {
        /* width: 50%; */
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        font-size: 1rem;
    }
</style>>
  

<script>
import {mapState, mapActions} from 'vuex';
import TableRow from '@/components/TableRow.vue'

export default {
  components: {
     TableRow
  },
  data() {
    return {
        // form_data: {
            name: '',
            address: '',
            age: null,
            id: undefined,
            // select_row: false,
        // },
        editRecord:false,
        savedInDatabase:false,

        index: null,
    }
    },
    computed: {
        ...mapState('dynamicTable', ['my_name', 'records', 'select_all']),

        select_all_row: {
            get: function() {
                return this.select_all
            },

            set: function(newVal) {
                this.$store.dispatch('dynamicTable/toggle_select_all', {status: newVal})
            }
        }

    },
    created () {
        console.log('Created')
    },

    mounted () {
        console.log('mounted')
        this.get_dynamic_table_record()
    },

    methods: {
        ...mapActions('dynamicTable', ['get_dynamic_table_record', 'save_record_in_database',
         'save_multiple_records_in_database', 'delete_selected_record']),
        addData () {
            this.$store.dispatch('dynamicTable/add_record_in_records', {name: this.name, address: this.address, age: this.age})
            // this.$store.commit('dynamicTable/ADD_RECORDS', {name: this.name, address: this.address, age: this.age})
            this.resetFormData()
        },

        editData (editRecord) {
             this.savedInDatabase = false
             this.editRecord = true
             this.name = editRecord.name,
             this.address = editRecord.address,
             this.age = editRecord.age
             this.id = editRecord.id
             console.log(editRecord.id)
             if (typeof editRecord.id !== "undefined"){
                this.savedInDatabase = true
             }
             this.index = editRecord.index
             this.scrollToTop();
        },

        saveEditedData () {
            let record = {name: this.name, age: this.age, address: this.address, id: this.id}
            let payload = {record: record, index: this.index}
            this.$store.dispatch('dynamicTable/save_edited_record', payload)

            this.resetFormData()
            this.clear_after_edit()
        },

        resetFormData () {
            this.name = ''
            this.age = ''
            this.address = ''
        },

        clear_after_edit () {
            this.index = null
            this.editRecord = false
            this.savedInDatabase = false
        },

        deleteData (payload) {
            //call api to delete
            this.$store.dispatch('dynamicTable/delete_record_from_database', payload)
            // this.$store.commit('dynamicTable/DELETE_RECORD', index)
            this.scrollToTop()
        },

        select_all_button (e) {
            console.log(e.target.value);
            // this.$store.commit('dynamicTable/')
        },

        saveEditedInDatabase (){
            let record = {name: this.name, age: this.age, address: this.address, id: this.id}
            let payload = {record: record, index: this.index}
            // if (typeof this.id !== "undefined"){
            this.$store.dispatch('dynamicTable/save_edited_record_in_database', payload)
            // }
            this.resetFormData()
            this.clear_after_edit()
        },

        scrollToTop () {
            let scrollOption = {
                left: 0,
                top: 0,
                // behavior: "smooth"
            }
            window.scrollTo(scrollOption);
        },

        delete_selected_record_database () {
            this.$store.dispatch('dynamicTable/delete_selected_record');
            this.scrollToTop();
        }
    },

     
}
</script>
