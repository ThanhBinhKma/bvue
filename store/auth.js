export const actions = {
    async loginPing({ commit }, opts) {
        let promise = await this.$axios.$post('/login', opts);
        console.log(promise, 'opts')
        // if (!promise.success) throw promise;
        let user = promise.data;
        console.log(user, 'user')
        await this.$auth.setUserToken(user.token);
        await this.$auth.$storage.setUniversal('user', user);
        this.$router.push({
            path: '/dashboard'
        });

        return promise;
    }
}