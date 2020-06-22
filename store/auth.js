export const actions = {
    async loginPing({ commit }, opts) {
        let promise = await this.$axios.$post('/login', opts);
        // if (!promise.success) throw promise;
        let user = promise.data;
        await this.$auth.setUserToken(user.token);
        await this.$auth.$storage.setUniversal('user', user);
        this.$router.push({
            path: '/dashboard'
        });

        return promise;
    }
}