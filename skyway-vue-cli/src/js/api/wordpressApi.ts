import * as Methods from '@js/api/methods'
import * as Config from '@js/constants/index'

const basePath: string = Config.URL_DNA
const path = {
  fetchDNAList: basePath + 'wp-json/wp/v2/posts'
}

export function fetchDNAList (perPage: number, page: number): Promise<any> {
  const query: string = ['_embed', 'per_page=' + perPage, 'page=' + page].join(
    '&'
  )
  return Methods.fetchWithoutOptions(path.fetchDNAList + '?' + query)
}
