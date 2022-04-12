import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FollowsController {
    public async store({params}: HttpContextContract) {
        // store follow user id with auth user id
    }
}
