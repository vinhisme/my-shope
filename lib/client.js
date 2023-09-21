import SanityClient from "@sanity/client";
import imgUrlBuilder from '@sanity/image-url'

export const client = SanityClient({
    projectId: 'ddn34rts',
    dataset: 'production',
    apiVersion: '2023-09-18',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imgUrlBuilder(client);

export const urlFor = (source) => builder.image(source)