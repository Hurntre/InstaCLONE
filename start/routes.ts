import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.index')

Route.get('/signup', async ({ view }) => {
  return view.render('auth/signup')
}).middleware('guest')

Route.get('/login', async ({ view }) => {
  return view.render('auth/login')
}).middleware('guest')


Route.post('/verify-email', 'EmailVerifyController.index').middleware('auth');
Route.get('/confirm-email/:userID/:token', 'EmailVerifyController.confirm')

Route.post('/signup', 'AuthController.signup')
Route.post('/login', 'AuthController.login')
Route.post('/logout', 'AuthController.logout')

Route.get('/posts/create', 'PostsController.create').middleware('auth')
Route.post('/posts/create', 'PostsController.store').middleware('auth')

Route.post('/follow/:userid', 'FollowsController.store').middleware('auth')
Route.delete('/follow/:userid', 'FollowsController.destroy').middleware('auth')

Route.get('/accounts/edit', 'ProfilesController.edit').middleware('auth')
Route.post('/accounts/edit', 'ProfilesController.update').middleware('auth')
Route.get('/:username', 'ProfilesController.index').middleware('auth')
