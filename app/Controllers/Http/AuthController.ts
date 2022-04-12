import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User';

export default class AuthController {
  public async signup({ request, response, session }: HttpContextContract) {
    const req = await request.validate({
      schema: schema.create({
        name: schema.string(),
        email: schema.string({}, [rules.email()]),
        username: schema.string(),
        password: schema.string({}, [rules.confirmed()]),
      }),
      messages: {
        'name.required': 'Name is required to sign up',
        'email.required': 'Email is required to sign up',
        'username.required': 'Username is required to sign up',
        'password.required': 'Password is required to sign up',
      },
    });

    const user = new User();
    user.name = req.name;
    user.email = req.email;
    user.username = req.username;
    user.password = req.password;

    await user.save();

    user?.sendVerificationEmail(session)
 
    return response.redirect('/');
  };

  public async login({ auth, request, response }: HttpContextContract) {
    const body = await request.validate({
      schema: schema.create({
        email: schema.string({}, [rules.email()]),
        password: schema.string({}, [rules.minLength(8)]),
      }),
      messages: {
        'password.required': 'Password field is required',
        'email.required': 'Email field is required',
        'password.minLength': 'Password must be at least 8 characters',
      },
    });

    try {
      const { email, password } = body;
      const user = await auth.use('web').attempt(email, password);
      response.redirect(`/${user.username}`);
    } catch {
      return response.badRequest('Invalid credentials');
    }
  };

  public async logout({ auth, response }) {
    await auth.logout()
    return response.redirect('/profile');
  }
}
