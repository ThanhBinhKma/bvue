import Cookies from 'js-cookie'
export default function ({ redirect, route }) {
  const token = Cookies.get('token')
  const user = Cookies.get('user')
  console.log('.>>>>>>' + token + '>?>>>>>>' + user)
  // const notAuthenRouters = ['/login', '/login/']

  if (token && user) {
    return redirect('/')
  } else {
    return redirect('/login')
  }
}
