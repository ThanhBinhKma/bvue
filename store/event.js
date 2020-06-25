export const state = () => ({
    list: []
  })  
export const actions = {
    async getList({ commit }, opts) {
        let promise = await this.$axios.$post('/cms/get-page-event', opts);
        // if (!promise.success) throw promise;
        console.log(promise + '.>>>>');
        let user = promise.data;
        return promise;
    }
}