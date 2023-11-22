import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../config/api';

export interface SummaryResult {
    summary: string;
}

export const getSummary = async (url: string): Promise<SummaryResult> => {
    const options: AxiosRequestConfig = {
        method: 'GET',
        url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
        params: {
            url: url,
            length: '3'
        },
        headers: {
            'X-RapidAPI-Key': config.API_KEY,
            'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
        }
    };
    try {
        const response: AxiosResponse = await axios.request(options);
        if (response.data && response.data.summary) {
            const summaryData: SummaryResult = {
                summary: response.data.summary,
            };
            return summaryData;
        } else {
            throw new Error('Invalid response format: Missing summary in response data');
        }
    } catch (error) {
        console.error('Error in getSummary:', error);
        throw error;
    }
};