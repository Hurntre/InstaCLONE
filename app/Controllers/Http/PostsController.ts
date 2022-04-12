import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Application from '@ioc:Adonis/Core/Application';
import Post from 'App/Models/Post';
import { schema } from '@ioc:Adonis/Core/Validator';

export default class PostsController {
  public async index({}: HttpContextContract) {}

  public async create({ view }: HttpContextContract) {
    return view.render('posts/create');
  }

  public async store({ request, auth, response }: HttpContextContract) {
    const body = await request.validate({
      schema: schema.create({
        caption: schema.string(),
        image: schema.file({
          size: '2mb',
          extnames: ['jpg', 'png', 'jpeg', 'svg'],
        }),
      }),
      messages: {
        'caption.required': 'Caption field is required',
        'image.required': 'Image field is required',
      },
    });

    const imageName = new Date().getTime().toString() + `.${body.image.extname}`;
    await body.image.move(Application.publicPath('images'), { name: imageName });

    const post = new Post();
    post.image = `images/${imageName}`;
    post.caption = body.caption;
    post.userId = auth.user.id;

    await post.save();

    return response.redirect(`/${auth.user?.username}`);
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
