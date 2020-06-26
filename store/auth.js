export const actions = {
    async loginPing({ commit }, opts) {
        let promise = await this.$axios.$post('/login', opts);
        // if (!promise.success) throw promise;
        let user = promise;
        await this.$auth.setUserToken(user.token);
        await this.$auth.$storage.setUniversal('user', user);
        await this.$auth.$storage.setUniversal('userName', user.user.userName);
        this.$router.push({
            path: '/dashboard'
        });

        return promise;
    }
}