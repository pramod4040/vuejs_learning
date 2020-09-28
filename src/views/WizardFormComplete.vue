<template>
    <b-container>
            <h2> All Done !!!!</h2>

            <p>Wait For Response...</p>

            
            <p v-if="isEdit">Shop Updated Successfully.</p>

            <p v-else>Shop Created Successfully.</p>
    </b-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed: {
        ...mapState('wizardForm', ['isEdit'])
    }
    
}
</script>