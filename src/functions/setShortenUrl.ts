import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "../libs/apiGateway";
import { v4 as uuid } from 'uuid';
import { dynamo } from "../libs/dynamo";


export const handler = async (event: APIGatewayProxyEvent) => {

    try {
        if(!event.body) {
            return formatJSONResponse({ statusCode: 400, data: { message: 'Request body is missing' }})
        }

        const body = JSON.parse(event.body);

        const tableName = process.env.urlTable ?? "";
        const baseUrl = process.env.baseUrl ?? "";

        if(!body.url || typeof body.url !== 'string') {
            return formatJSONResponse({ statusCode: 400, data: {message: 'Invalid or missing url field'}})
        }

        const originalUrl = body.url;

        const code = uuid().slice(0,8);

        const shortUrl = `${baseUrl}/${code}`;

        const data = {
            id: code,
            originalUrl,
            shortUrl
        };

        await dynamo.write(data, tableName)

        return formatJSONResponse({ data: { shortUrl, originalUrl}})

    } catch(error:any){
        console.log('error', error)
        return formatJSONResponse({
            statusCode: 502,
            data: {
                message: error.message
            }
        })
    }
}
