import {OAuth2Client} from "google-auth-library";
const config = useRuntimeConfig();
export default defineEventHandler(async (event: any) => {
    const body = await readBody(event);
    const payload =  await verifyToken(body.token);
    return {
      payload, token: body.token
    }

})
const client = new OAuth2Client(config.public.gcloudApi);

async function verifyToken(token: string){
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: config.public.gcloudApi
    });


    return  ticket.getPayload()
}

