import https from 'https';
import { Data } from '../interface';

export const query = (
    options : https.RequestOptions /* eslint-disable  @typescript-eslint/no-explicit-any */
) : Promise<any> => 
{
    return new Promise((resolve, reject) => 
    {
        const request = https.request(options, response => 
        {
            let responseText = '';

            response.on('data', data =>
            {
                responseText += data;
            });

            response.on('end', () => 
            {
                resolve(
                    JSON.parse(
                        responseText.toString()
                    )
                );
            });
        });

        request.on('error', error =>
        {
            reject(error);
        });

        request.end();
    });
};

export const mutate = (
    options : https.RequestOptions,
    data : Data,
    headers? : Data /* eslint-disable  @typescript-eslint/no-explicit-any */
) : Promise<any> => 
{
    return new Promise((resolve, reject) => 
    {
        const encodedData = new TextEncoder().encode(
            JSON.stringify(data)
        );

        const request = https.request({
            ...options,
            headers : {
                ...headers,
                'Content-Type' : 'application/json',
                'Content-Length' : encodedData.length
            }
        }, response => 
        {
            let responseText = '';

            response.on('data', data =>
            {
                responseText += data;
            });

            response.on('end', () => 
            {
                resolve(
                    JSON.parse(
                        responseText.toString()
                    )
                );
            });
        });

        request.on('error', error =>
        {
            reject(error);
        });

        request.write(encodedData);
        request.end();
    });
};

