<script lang="ts" setup>
import table2excel from 'js-table2excel'
import { ref, watch } from 'vue'
import request from '../tools/request'
import { exportJsonToExcel, exportJsonToExcelx } from './js/outExcel'

const url = '/gwapi/1688/item_search'
const keyword = ref('避孕套')

/**
 * 表格数据
 */
const tableData = ref(formatData(getGoodsListCache()))

/**
 * 分页
 */
const pageNum = ref(tableData.value.length / 20 || 1)
/**
 * 加载中
 */
const loading = ref(false)

/**
 * 获取商品缓存
 */
function getGoodsListCache() {
  const cacheTbStr = localStorage.getItem('goodsList')
  return cacheTbStr ? JSON.parse(cacheTbStr) : []
}

/**
 * 设置商品列表缓存
 * @param v
 */
function setGoodsListCache(v) {
  if (v) {
    formatData(v)
  }
  localStorage.setItem('goodsList', JSON.stringify(v))
}

/**
 * 获取列表数据
 */
function handleGetList() {
  loading.value = true
  const params = {
    q: keyword.value,
    key: 't3714949574',
    secret: '95743201',
    api_name: '',
    cache: '',
    result_type: '',
    // lang: 'zh-CN',
    lang: 'en',
    version: '',
    seller_info: 'no',
    start_price: 0,
    end_price: 0,
    page: pageNum.value,
    cat: 0,
    page_size: 40,

  }
  request({
    method: 'get',
    url,
    params,
  }).then((res) => {
    const list = res.items.item.map((d) => {
      d.imgUrlList = [d.pic_url]
      return d
    })
    formatData(list)
    tableData.value.push(...list)
    loading.value = false
  })
}

/**
 * 获取商品详情
 *
 * https://api-gw.onebound.cn/1688/item_get/
 */
function getProductDetail(item: any) {
  item.loading = true
  const params = {
    key: 't3714949574',
    secret: '95743201',
    lang: 'zh-CN',
    // lang: 'en',
    num_iid: item.id,
  }
  request({
    method: 'get',
    url: '/gwapi/1688/item_get',
    params,
  }).then((res) => {
    console.log(res)
    item.loading = false
    item.detail = res
    setGoodsListCache(tableData.value)
    // handleToDownload(res, item)
  })
}

/**
 * 进行下载
 */
function handleToDownload(params: any, item: any) {
  item.downloading = true
  request({
    method: 'post',
    url: '/nextapi/api/download',
    data: {
      items: JSON.stringify(params),
    },
  }).then((res) => {
    console.log(res)
    if (res.status === 200) {
      item.downloading = false
      item.downloaded = true
    }
  })
}

/**
 * 删除缓存
 */
function handleDeleteCache() {
  setGoodsListCache('')
  tableData.value = []
}

/**
 * 格式化数据
 */
function formatData(list: any) {
  list.map((d) => {
    const imgs = d?.detail?.item?.item_imgs
    const brand = d?.detail?.item?.props?.[0]?.value
    if (brand) {
      d.brand = brand
    }
    if (imgs) {
      d.imgUrlList = imgs.map((d) => { return d.url })
    }
    const imgUrl = d.imgUrlList?.[0]

    if (imgUrl) {
      d.imgUrl = imgUrl
    }
    if (d.desc) {
      d.company = d.desc
    }
    d.loading = false
    d.downloading = false
  })
  return list
}

/**
 * 导出文件
 */
function handleExcel() {
  const header = [

    {

      title: '商品ID',
      key: 'id',
    },
    {

      title: '图片',
      key: 'pic',
      type: 'image',
    },
    {

      title: '标题',
      key: 'title',
    },
    {

      title: '公司',
      key: 'company',
    },
    {

      title: '品牌',
      key: 'brand',
    },
    {

      title: '价格',
      key: 'price',
    },
    {

      title: '销量',
      key: 'sales',
    },
  ]

  const data = tableData.value.map((d, i) => {
    let sales = d.sales.replace('+件', '')
    if (sales.includes('万')) {
      const val = sales.split('万')[0]
      sales = val * 10000
    }

    return {

      id: d.id,
      title: d.title,
      price: d.price,
      pic: d.imgUrl,
      sales,
      brand: d.brand,
      company: d.company,
      size: [200, 200],
    }
  })

  table2excel(header, data, keyword.value)
}

/**
 * 获取分页
 * @param n
 */
function handleGetListData(n = 1) {
  pageNum.value = n
  handleGetList()
}

setGoodsListCache(tableData.value)

/**
 * 获取商品列表
 */
function getGoodsList() {
  loading.value = true
  request({
    method: 'get',
    url: '/nextapi/api/goodsList',

  }).then((res) => {
    if (res.status === 200) {
      const list = res.data.list.map((d) => {
        d.imgUrlList = [d.imgUrl]
        return d
      })

      setGoodsListCache(list)
      tableData.value = list
    }
    loading.value = false
  })
}
</script>

<template>
  <div class="containerx">
    <div class="form-box">
      <div class="form-item">
        总数：{{ tableData.length }}
      </div>
      <div class="form-item">
        <el-button size="small" type="primary" @click="getGoodsList">
          加载
        </el-button>
        <el-button :disabled="!tableData.length" size="small" type="primary" @click=" handleExcel">
          导出表格
        </el-button>
        <!-- <el-button v-if="tableData.length" size="small" type="primary" @click="handleDeleteCache">
          删除缓存
        </el-button> -->
        <!-- <el-button size="default" type="primary" @click="handleToDownload">
          下载测试
        </el-button> -->
      </div>
    </div>

    <div class="tb-box" :loading="loading">
      <el-table :data="tableData" style="width: 100%" height="calc(100Vh - 55px)">
        <el-table-column type="index" label="索引" width="70px" />

        <el-table-column prop="id" label="商品id" />
        <el-table-column prop="imgUrl" label="图片" width="120px">
          <template #default="scope">
            <div class="img-boxes">
              <!-- <img v-for="item in scope.row.imgUrlList" width="100px" :src="item"> -->

              <el-image
                :preview-teleported="true"
                style="width: 100px; height: 100px"
                :src="scope.row.imgUrlList[0]"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                :preview-src-list="scope.row.imgUrlList"
                :initial-index="4"
                fit="cover"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" />

        <el-table-column prop="company" label="公司" />
        <el-table-column prop="brand" label="品牌" />
        <el-table-column prop="price" label="价格" />
        <el-table-column prop="sales" label="销量" />
        <el-table-column prop="address" label="操作" width="200px">
          <template #default="scope">
            <div class="acts">
              <a class="act" :href="scope.row.detail_url" target="_blank">

                <el-button size="small" type="primary">
                  打开详情
                </el-button>
              </a>

              <!-- <el-button :disabled="!!scope.row.detail" size="small" type="primary" :loading="scope.row.loading" @click="getProductDetail(scope.row)">
                获取详情
              </el-button> -->
              <el-button v-if="!scope.row.detail" size="small" type="primary" :loading="scope.row.downloading || scope.row.loading" @click="getProductDetail(scope.row)">
                下载数据
              </el-button>

              <el-button v-else size="small" type="success">
                已下载
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-box {
  display: flex;
  justify-content: space-between;
}
.containerx {
  padding: 10px;
  .acts {
    display: flex;
    a {
      margin-right: 5px;
    }
  }

  .form-box {
    display: flex;

    .form-item {
      margin-right: 10px;
      line-height: 32px;
    }
  }
}
</style>
