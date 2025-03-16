import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "../libs/apiGateway";
import { dynamo } from "../libs/dynamo";



export const handler = async (event: APIGatewayProxyEvent) => {

    try {
        const tableName = process.env.urlTable ?? "";
        const { code } = event.pathParameters || {};

        if(!code) {
            return formatJSONResponse({ statusCode: 400, data: { message: 'Missin code in url'}})
        }

        const record = await dynamo.get(code, tableName);

        if (!record) {
            return formatJSONResponse({ statusCode: 404, data: { message: 'Shortened URL not found' } });
        }

        const originalUrl = record.originalUrl;
        
        return formatJSONResponse({ 
            data: {},
            statusCode: 301,
            headers: {
                Location: originalUrl
            }
        })

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
