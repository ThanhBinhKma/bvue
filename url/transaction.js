export const state = ()=>{
    id :""
}
export const getters = {
    id: (state) => state.id
}

export const actions = {
    async list(){
        const response = await this.$axios.get('/cms/get-page-transaction?pageIndex=')
    }
}