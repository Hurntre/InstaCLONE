import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
// import { DateTime } from 'luxon';

export default class EmailVerifyController {
    public async index ( { response, auth, session }: HttpContextContract) {
        auth.user?.sendVerificationEmail(session)
        return response.redirect().back()
    }

    public async confirm ({ response, params, request }:HttpContextContract) {
        // trace this and make it work
        if (request.hasValidSignature()) {
            const user = await User.findByOrFail('email', params.email)
            // user.email_verified_at = DateTime.local(),
            await user.save()
            return response.redirect(`/${user.username}`)

        } else {
            return 'Invalid Token'
        }
    }
}
