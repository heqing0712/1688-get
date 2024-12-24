import type { SearchProductParams } from './type'
// https://gw.open.1688.com/openapi/param2/1/xxx/searchOffer.json?keywords=商品关键字&appKey=您的AppKey
import request from '../tools/request'

/**
 * 搜索商品
 * @param params
 */
export function searchProduct(params: SearchProductParams) {
  request({
    method: 'get',
    url: '/openapi/param2/1/xxx/searchOffer.json',
    params,
  }).then((res) => {
    console.log({ res })
  })
}
