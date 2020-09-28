<template>
    <div>
        <div v-for="(item, inf_index) in selectedInfluencers" :key="inf_index">
            {{item.name}}

            <div v-for="(work_for_influencer, work_index) in item.dynamictable" :key="work_index">
                <!-- <label for="">Select Post Type</label> -->
                <select
                    @input="updateInfluencerWork({'value': $event.target.value, 'property': 'post_type', 'influencerIndex': inf_index,  'childIndex': work_index})"
                >
                    <option v-for="(post, index) in postTypes" 
                    :key="index"
                    :value="post.name"

                    >{{post.name}}</option>
                </select>

                <select
                    @input="updateInfluencerWork({'value': $event.target.value, 'property': 'number_of_post', 'influencerIndex': inf_index, 'childIndex': work_index})"
                >
                <option v-for="(number_of_post, index) in numberOfPosts" 
                    :key="index"
                    :value="number_of_post"
            
                 >{{number_of_post}}
                </option>
                </select>
                <button @click="removeWork(inf_index, work_index)">X</button>
            </div>
            <button @click="addWorkForInfluencer(inf_index, item.id)">Add More</button>
            <button @click="removeInfluencer(inf_index)">Delete Influencers</button>
            <hr />
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    created: function() {
        this.selectedInfluencers.forEach((influencer) => {
            if (influencer.dynamictable.length < 1) {
                influencer.dynamictable.push({})
            }
        });
    },
    computed: {
        ...mapState('wizardForm', ['selectedInfluencers'])
    },
    data () {
        return {
            postTypes: [
                {name: 'Select one', id:null},
                {id: 1, name:'Video Post'},
                {id: 2, name: 'Photo Post'},
            ],

            numberOfPosts: [
                1,2,3,4,5,6,7,8,9,10,11
            ],
        }
    },
    methods: {
        addWorkForInfluencer: function(index_of_influencer, inf_id) {
            // this.selectedInfluencers[index_of_influencer].dynamictable.push({})
            // this.selectedInfluencers.some((influencer) => {
            //     if (influencer.id == inf_id){
            //         influencer.dynamictable.push({})
            //         return true;
            //     }
            // })
            this.$store.commit('wizardForm/ADD_INFLUENCER_WORK', index_of_influencer)
        },

        removeWork: function(inf_index, work_index) {
            //  if (this.selectedInfluencers[inf_index].dynamictable.length >=2 ){
            //     this.selectedInfluencers[inf_index].dynamictable.splice(work_index, 1)
            // }
            this.$store.commit('wizardForm/DELETE_INFLUENCER_WORK', {'influencerIndex': inf_index, 'work_index': work_index})
        },

        removeInfluencer: function(inf_index) {
            // if (this.selectedInfluencers.length >= 2) {
            //     this.selectedInfluencers.splice(inf_index, 1);
            // }
            this.$store.commit('wizardForm/REMOVE_INFLUENCER', inf_index)
        },

        updateInfluencerWork (data) {
            this.$store.commit('wizardForm/UPDATE_INFLUENCER_WORK', data)
        }
    }
    
}
</script>