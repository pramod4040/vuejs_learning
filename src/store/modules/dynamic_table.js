import ApiService from '@/common/api.service.js'

const dynamic_table = {
    namespaced: true,
    state: {
        records: [],
        selectedRowList: [],
        table_row_status: null,
        select_all: false,
        // editRecord: false,
        // record_in_form: {
        //     name:'',
        //     address:'',
        //     age: null,
        // }

    },

    getters: {
        get_row_status (state) {
            return state.table_row_status
        },

        find_record_by_index (state) {
            return f_index => state.records.find(record => {
                if (record.index_id === f_index){
                    return record;
                }
            })
        },

        // get_selected_row_list (state) {
        //     return state.selectedRowList;
        // },

        // get_records_which_are_selected (state, getters){
        //     let selected_row = getters.get_selected_row_list

        //     return state.records.filter(record => {
        //         if (selected_row.indexOf(record.index_id) !== -1){
        //             return record
        //         }
        //     })
        // }
    },

    mutations: {
        ADD_RECORDS (state, record) {
            state.records.push(record)
            // state.record_in_form.name = ''
            // state.record_in_form.address = ''
            // state.record_in_form.age = null
        },

        LOAD_RECORDS (state, datas){
            state.records = []
            state.records = state.records.concat(datas)
        },

        SAVE_EDITED_RECORD (state, payload) {
            // console.log(payload)
            console.log(state.records)
            state.records[payload.index] = payload.record
        },

        DELETE_RECORD (state, index) {
            state.records.splice(index, 1);
        },

        DELETE_SELECTED_RECORD (state, payload){
            payload.sort((a,b) => parseInt(a)- parseInt(b))
            payload.forEach((d_index, index) => {
                console.log(index , d_index)
                //   console.log(parseInt(d_index) - parseInt(index));
                  state.records.splice(d_index - index, 1) 
            })
        },

        //add row index in selectedrowlist if it is not present otherwise remove it from it (toggle)
        ADD_ROW_IN_SELECTED_LIST (state, selected_row_index) {

            let index_in_selectedrow_list = state.selectedRowList.indexOf(selected_row_index)

            if (index_in_selectedrow_list === -1){
                console.log('adding')
                state.selectedRowList.push(selected_row_index)

            }else{
                console.log('removing')
                state.selectedRowList.splice(index_in_selectedrow_list, 1)
            }
        },

        //newValBoolean will be true or false select_all will be true and true table_row_status make checkbox selected for all row
        CHANGE_SELECT_ALL_STATUS (state, newValBoolen) {
            state.select_all = newValBoolen
            state.table_row_status = newValBoolen
        },

        CLEAR_SELECTED_ROW_LIST (state) {
            state.selectedRowList = []
        },

        FALSE_TABLE_STATUS (state) {
            state.table_row_status = false
        }

    },

    actions: {
        add_record_in_records (context, payload) {
            // payload['index_id'] = context.state.records.length
            context.commit('ADD_RECORDS', payload)
        },

        toggle_select_all (context, payload) {
            console.log('actions going')
            context.commit('CHANGE_SELECT_ALL_STATUS', payload.status)
            context.commit('CLEAR_SELECTED_ROW_LIST')
        },

        get_dynamic_table_record (context) {
            ApiService.get('dynamictable')
              .then((res) => {
                  if (res.status == 'success'){
                    context.commit('LOAD_RECORDS', res.data)
                  }
              })
        },

        save_multiple_records_in_database(context) {

            context.dispatch('prepare_selected_record')
            .then(res => {
                console.log(res);
                ApiService.post('/dynamictable', res)
                .then(response => {
                    context.dispatch('get_dynamic_table_record')
                    console.log(response.message);
                })
            })
            context.commit('CLEAR_SELECTED_ROW_LIST')
            context.commit('FALSE_TABLE_STATUS')

        },

        prepare_selected_record (context) {
            let selected_row = context.state.selectedRowList

            let new_selected = []
            selected_row.forEach((item) => {
                let selected_item = context.state.records[item]
                new_selected.push({'name': selected_item.name, 'address': selected_item.address, 'age' : selected_item.age})
            })

        //new testing end
            // let selected_records = context.state.records.filter(record => {
            //     if (selected_row.indexOf(record.index_id) !== -1){
            //         return record
            //     }
            // })

            // let clean_records = []
            // selected_records.forEach((selected) => {
            //     clean_records.push({'name': selected.name, 'address': selected.address, 'age': selected.age})
            // })
            return new_selected
        },

        // save_record_in_database(context) {
        //      let index_of_record_to_save = context.getters.get_selected_row_list
        //      let data = context.getters['find_record_by_index'](index_of_record_to_save[0])
             
        //      ApiService.post('/dynamictable', {'name': data.name, 'address' : data.address, 'age': data.age})
        //        .then(res => {
        //            console.log(res.message);
        //        })
        // },

        delete_selected_record (context, payload) {
            context.dispatch("retrive_id_of_selected_list")
            .then((delete_ids) => {
                if (delete_ids.length > 0){
                    ApiService.post('/dynamictable/bulk/delete', delete_ids)
                }
            })
            context.commit('DELETE_SELECTED_RECORD', context.state.selectedRowList)
            context.commit('CLEAR_SELECTED_ROW_LIST')
        },

        retrive_id_of_selected_list (context){
            let delete_ids = []
            context.state.selectedRowList.forEach((item) => {
                let id_val = context.state.records[item].id
                if (typeof id_val !== 'undefined'){
                    delete_ids.push(id_val)
                }
            })
            return delete_ids
        },

        save_edited_record_in_database (context, payload){
            context.commit('SAVE_EDITED_RECORD', payload)
            ApiService.patch(`/dynamictable/${payload.record.id}`, payload.record)
            // console.log(ram)
            //  .then (res => {
 
                // context.commit('SAVE_EDITED_RECORD', payload)
                //  console.log('here');
                //  if (res.status == 'success'){
                    //  commiting from here commmit change in records but not show changed value reactive in template
                    //  context.commit('SAVE_EDITED_RECORD', payload) 
                //  }
            //  })
            //  .catch (err => {
            //      console.log('Unable to edit');
            //  })
        },

        delete_record_from_database (context, payload) {
            if (typeof payload.id !== 'undefined'){
                ApiService.delete(`/dynamictable/${payload.id}`)
            }
            // console.log('asdf')
            context.commit('DELETE_RECORD', payload.index)
            // .then((res) => {
            //     if (res.status == 'success') {
            //         this.$store.commit('dynamicTable/DELETE_RECORD', payload.index)
            //     }
            // })
        }
    }
}

export default dynamic_table