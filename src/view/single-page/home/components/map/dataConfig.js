
import _ from 'underscore'

const process = function () {
  let arg = arguments[0]
  let mainCustomersNum = []
  try {
    arg['data'].forEach(element => {
      let item = {}
      item['code'] = element['province']
      item['value'] = element['value']
      item['citys'] = element['cities']
      mainCustomersNum.push(item)
    })
    return mainCustomersNum
  } catch (e) {
    console.log(e)
    return mainCustomersNum
  }
}

export { process}
