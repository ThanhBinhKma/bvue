export const actions = {
    async loginPing({ commit }, opts) {
        let promise = await this.$axios.$post('/login', opts);
        // if (!promise.success) throw promise;
        let user = promise;
        await this.$auth.setUserToken(user.token);
        await this.$auth.$storage.setUniversal('user', user);
        await this.$auth.$storage.setUniversal('userName', user.user.userName);
        console.log(promise)
        if(promise.status === 'ERROR' || promise.content.role === 0){
            console.log(12341)
        }
        this.$router.push({
            path: '/dashboard'
        });

        return promise;
    }
}