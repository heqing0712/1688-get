<template>
    <div class="containerx">
        <div class="form-box">

            <div class="form-item">
                关键词：
            </div>
            <div class="form-item">
                <el-input v-model="keyword" size="default" />
            </div>
            <div class="form-item">
                <el-button @click="handleGetData" size="default" type="primary">获取数据</el-button>
            </div>





        </div>

        <div class="tb-box">

            <el-table :data="tableData" style="width: 100%" :height="`calc(100Vh - 55px)`">
                <el-table-column type="index" label="索引" width="70px" />
                    
                
                <el-table-column prop="subject" label="标题"  />
                <el-table-column prop="imgUrl" label="图片">

                    <template #default="scope"> <img width="100px" :src="scope.row.imgUrl"/></template>

                </el-table-column>
                <el-table-column prop="address" label="Address" />
            </el-table>
        </div>

    </div>
</template>

<script lang="ts" setup>
import request from '../tools/request'
import { ref } from 'vue'
const keyword = ref('避孕套');
const tableData = ref([])
const pageCount =6
let page = 1
//const url = '/api/hamlet/async/v1.json?beginpage=2&asyncreq=1&keywords=&keyword=%E9%81%BF%E5%AD%95%E5%A5%97%20&sortType=&descendOrder=&province=&city=&priceStart=&priceEnd=&dis=&ptid=hrd713c22cfd14b5&exp=pcCpxGuessExp%3AB%3BpcSemWwClick%3AB%3Bqztf%3AE%3Bwysiwyg%3AB%3Basst%3AA&cosite=360jj&salt=17348801498140&sign=3110ad63f438cdf96c3322abb28a6600&hmaTid=3&hmaQuery=graphDataQuery&pidClass=pc_list_336&cpx=cpc%2Cfree%2Cnature&api=pcSearch'
const url = '/api/hamlet/async/v1.json'

function handleGet() {
    const params = {
        keyword: keyword.value,
        beginpage: 1,
        asyncreq:  page ,
        ptid: 'hrd713c22cfd14b5',
        exp: 'pcCpxGuessExp:B;pcSemWwClick:B;qztf:E;wysiwyg:B;asst:A',
        cosite: '360jj',
         salt: new Date().getTime(),
     sign:page === 5? 'fdee160f37476fea1b60d745fd52a217': '3110ad63f438cdf96c3322abb28a6600',
        hmaTid: 3,
        hmaQuery: 'graphDataQuery',
        pidClass: 'pc_list_336',
        cpx: 'cpc,free,nature',
        api: 'pcSearch'
    }
    request({
        method: 'get',
        url,
        params
    }).then((res) => {
        console.log(res)
        const list = res?.module?.offer?.list
        tableData.value.push(...list)
        page += 1
        
        if (page <= pageCount) {
         handleGet()
        }
    })
}

function handleGetData() {
    page =1
    tableData.value = []
    handleGet()
}

</script>

<style lang="scss" scoped>
.containerx {
    padding: 10px;

    .form-box {
        display: flex;

        .form-item {
            margin-right: 10px;
            line-height: 32px;
        }
    }
}
</style>