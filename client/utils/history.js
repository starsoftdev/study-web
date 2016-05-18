import { useRouterHistory } from 'react-router'
import { createHistory } from 'history'
import qs from 'qs'

const history = useRouterHistory(createHistory)({
  parseQueryString: qs.parse.bind(qs),
  stringifyQuery: qs.stringify.bind(qs)
})

export default history
