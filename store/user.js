export const state = () => ({
    list: []
  })  
export const actions = {
    async getList() {
        let promise =await this.$axios.post('user/list-user')
        // if (!promise.success) throw promise;
        let user = promise.data;
        return promise.data;
    }
}