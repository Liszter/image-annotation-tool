// 存储变量名
const storageKey = 'storage_data'

// 存储的数据
export function storageData () {
	return localStorage.getItem(storageKey) || {}
}

export const storage = {
  set: function(key:string, value: any) {
    let tmp = localStorage.getItem(storageKey)
    tmp = tmp ? JSON.parse(tmp) : {}
    tmp[key] = value
    
    localStorage.setItem(storageKey, JSON.stringify(tmp))
	  console.log(storageKey, '设置成功', storageData())
  },
  get: function(key: string | number) {
    return (JSON.parse(storageData())[key]) || ""
  },
  remove: function(key) {
    let tem = storageData();
		delete tem[key];
		localStorage.setItem(storageKey, tem);
  },
  clean: function() {
    localStorage.removeItem(storageKey)
  }
}
