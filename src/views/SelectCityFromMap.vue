<template>
    <b-container>
      <GmapMap ref="mapRef"
  :center="{lat:27.7172, lng:85.3240}"
  :zoom="13"
  map-type-id="terrain"
  style="width: 900px; height: 600px"
>
  <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :clickable="true"
    :draggable="true"
    @click="center=m.position"
  />
</GmapMap>
    </b-container>
</template>


<script>
export default {
    /*
    created() {
        window.checkAndAttachMapScript = function (callback) {
        if (!!window.google) {  // If you're using vue cli, then directly checking
                                // 'google' obj will throw an error at the time of transpiling.
            callback();
            return true;
        }

            window.mapApiInitialized = callback;
            let script = document.createElement('script');
            script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD5DJAylrEqN9O46vNFHSzhRyHiiULc8tU&libraries=places,geometry&callback=mapApiInitialized';
            document.body.appendChild(script);
        }
    },
    */


   mounted () {
       this.$refs.mapRef.$mapPromise.then((map) => {
           this.addMarker(map);
       })
   },
    data () {
        created
        return {
            selectedCity: [],
            // map: ''
        }
    },

    methods: {
        addMarker (map) {
            map.addListener('click', function(e) {
                console.log(e);
            })
        }
    }


}
// api key AIzaSyD5DJAylrEqN9O46vNFHSzhRyHiiULc8tU
</script>