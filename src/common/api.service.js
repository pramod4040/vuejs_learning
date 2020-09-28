import axios from 'axios'
import JwtService from '@/common/jwt.service.js'

const ApiService = {
    init () {
        //api server
        axios.defaults.baseURL = "http://127.0.0.2/api"

        //public_html_api
        // axios.defaults.baseURL = "http://127.0.0.3/api"
    },

    setHeader() {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${JwtService.getToken()}`;
      },

    generate_url_with_out_traling_slash(resourceUrl, slug){
        let url = resourceUrl
        if (slug !== ''){
            url += `/${slug}`
        }
        return url;
    },

    get (resourceUrl, slug = '') {
        let url = this.generate_url_with_out_traling_slash(resourceUrl, slug);
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then((res) => {
                    console.log(res);
                    resolve(res.data);
                })
                .catch(err => {
                    console.log('[APISERVICE] Something Unexpected Happen!!');
                    reject(err)
                })
            })   
    },

    post (resourceUrl, data) {

       return new Promise((resolve, reject) => {
            axios.post(resourceUrl, data)
                .then(res => {
                    resolve(res.data);
                 })
                .catch (err => {
                    console.log('[APISERVICE] Something Unexpected Happen!!');
                    // if (err.response){
                    //     console.log('[APISERVICE] Problem in response!!');
                    // }
                    // if (err.request){
                    //     console.log('[APISERVICE] Problem in request!!');
                    // }
                    reject(err);
                 }) 
       }) 
    },

    patch (resourceUrl, data) {
        return new Promise((resolve, reject) => {
            axios.put(resourceUrl, data)
                .then((res) => {
                    resolve(res.data);
                })
                .catch(err => {
                    console.log('[APISERVICE] Something Unexpected Happen!!');
                    reject(err)
                })
        })
    },

    delete (resourceUrl) {
        return new Promise((resolve, reject) => {
            axios.delete(resourceUrl)
                .then((res) => {
                    resolve(res.data);
                })
                .catch(err => {
                    console.log('[APISERVICE] Something Unexpected Happen!!');
                    reject(err)
                })
        })
    }

    // postBulkData (resourceUrl, data) {
    //     return new Promise((resolve, reject) => {
    //         let records_data = {'type': 'bulk', data: data};
    //          axios.post(resourceUrl, {
    //                 records_data
    //             })
    //              .then(res => {
    //                  resolve(res.data);
    //               })
    //              .catch (err => {
    //                  console.log('[APISERVICE] Something Unexpected Happen!!');
    //                  reject(err);
    //               }) 
    //     }) 
    //  }
}

export default ApiService;