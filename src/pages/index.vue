<script lang="ts" setup>
import { ref, watch } from 'vue'
import request from '../tools/request'
// import { items } from './js/detail'
import { exportJsonToExcel } from './js/outExcel'

const url = '/gwapi/1688/item_search'
const keyword = ref('避孕套')
/**
 * 缓存
 */
const cacheTbStr = localStorage.getItem('tb')
const cacheTb = cacheTbStr ? JSON.parse(cacheTbStr) : []

/**
 * 表格数据
 */
const tableData = ref(formatData(cacheTb))

/**
 * 分页
 */
const pageNum = ref(tableData.value.length / 20 || 1)
/**
 * 加载中
 */
const loading = ref(false)

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
    lang: 'zh-CN',
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
 * 缓存
 */
watch(tableData, (v) => {
  localStorage.setItem('tb', JSON.stringify(v))
}, {
  deep: true,
})

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
    num_iid: item.num_iid,
  }
  request({
    method: 'get',
    url: '/gwapi/1688/item_get',
    params,
  }).then((res) => {
    console.log(res)
    item.loading = false
    item.detail = res
    handleToDownload(res, item)
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
  localStorage.setItem('tb', '')
  tableData.value = []
}

/**
 * 格式化数据
 */
function formatData(list: any) {
  list.map((d) => {
    const imgs = d?.detail?.item?.item_imgs
    if (imgs) {
      d.imgUrlList = imgs.map((d) => { return d.url })
    }
  })
  return list
}

/**
 * 搜索
 */
function handleSearch() {
  pageNum.value = 1
  tableData.value = []
  handleGetListData(pageNum.value)
}

/**
 * 导出文件
 */
function handleExcel() {
  const header = ['索引', '商品ID', '标题', '价格']
  const data = tableData.value.map((d, i) => {
    return [
      i + 1,
      d.num_iid,
      d.title,
      d.price,
    ]
  })

  exportJsonToExcel(header, data, keyword.value)
}

/**
 * 获取分页
 * @param n
 */
function handleGetListData(n = 1) {
  pageNum.value = n
  handleGetList()
}
tableData.value.map((d) => {
  d.downloading = false
})
console.log({
  table: tableData.value,
})
</script>

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
        <el-button size="default" type="primary" @click="handleSearch">
          搜索
        </el-button>
        <el-button v-if="tableData.length" size="default" type="primary" :loading="loading" @click="handleGetListData(pageNum + 1)">
          加载分页({{ pageNum + 1 }})
        </el-button>
        <el-button v-if="tableData.length" size="default" type="primary" @click="handleDeleteCache">
          删除缓存
        </el-button>

        <el-button v-if="tableData.length" size="default" type="primary" @click=" handleExcel">
          导出表格
        </el-button>
        <!-- <el-button size="default" type="primary" @click="handleToDownload">
          下载测试
        </el-button> -->
      </div>
    </div>

    <div class="tb-box" :loading="loading">
      <el-table :data="tableData" style="width: 100%" height="calc(100Vh - 55px)">
        <el-table-column type="index" label="索引" width="70px" />

        <el-table-column prop="num_iid" label="商品id" />

        <el-table-column prop="title" label="标题" />
        <el-table-column prop="imgUrl" label="图片" width="400px">
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
        <el-table-column prop="price" label="价格" />
        <el-table-column prop="address" label="操作" width="280px">
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
              <el-button v-if="!scope.row.downloaded" size="small" type="primary" :loading="scope.row.downloading || scope.row.loading" @click="getProductDetail(scope.row)">
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
