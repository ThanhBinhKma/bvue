export default function({ redirect, route }) {
    console.log(redirect, route)
  const token = localStorage.getItem('auth._token.local');
  const user = localStorage.getItem('auth.user');
  const notAuthenRouters = [
      "/login"
  ]
  if (!token || !user) {
      // localStorage.clear();
      if (notAuthenRouters.includes(route.path)) {
          return;
      }
      localStorage.clear();
      return redirect('/login');
  } else if (notAuthenRouters.includes(route.path) || route.path === '/') {
      return redirect('/dashboard')
  } else {
      console.log('xxxxx')
    //   return redirect(route.path)
  }

}
