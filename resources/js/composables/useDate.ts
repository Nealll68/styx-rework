import * as dayjs from 'dayjs'
import * as localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

export const useDate = () => {
  return {
    dayjs,
  }
}
