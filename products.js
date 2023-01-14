// 1-1 建立元件：引入 Vue 函式庫
import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js" // 此為 vue esm 函式庫 
//console.log(createApp)

const app={
    data(){
        return{
            products:[],
            detail:{},
            url:'https://vue3-course-api.hexschool.io/v2/',
            path:'kris-api',
            
        }
    },
    methods:{
        // 2. 驗證是否登入
        checkLogin(){
            axios.post(`${this.url}api/user/check`)
            .then((res)=>{
                console.log(res);
                this.getData();  
                //驗證通過後就立刻撈資料
            })
            .catch((err)=>{
                console.log(err);
            })
        },

        // 3. 取得產品 api 資料
        getData(){
            axios.get(`${this.url}api/${this.path}/admin/products`)
            .then((res)=>{
                console.log('products',res);
                this.products=res.data.products;
                console.log(this.products);
            })
            .catch((err)=>{
                console.log(err);
            });
            
        },

        showDetail(product){
            // 點擊查看後，將product中的資料賦予給另一個空物件detail
            this.detail=product;
            console.log(this.detail)
        }

    }, 
    mounted(){
        // 1. 在被導入到後端 / 管理者使用的產品上架頁面時，一載入頁面就需要完成驗證
        // 在生命週期階段去觸發 checkLogin 的函式。
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)krisToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.checkLogin();
    }
}

createApp(app).mount('#app')