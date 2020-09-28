<template>
    <div>
        <p>Review And Submit here</p>

        <button @click="submitAndGoNext">Submit</button>
    </div>
</template>


<script>
export default {
     props: {
        submitAndGoNext: Function
    },
    data () {
        return {
           
        }
    }
}
</script>