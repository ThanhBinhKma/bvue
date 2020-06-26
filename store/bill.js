
export const state = () => ({
    list: []
  })  
  
export const actions = {
    async detail({ commit }, opts) {
        let promise = await this.$axios.$get('/cms/get-billing/', opts);
        return promise;
    }
}