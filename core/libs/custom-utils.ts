import { isEmpty } from 'lodash';
import { NodeType, parse } from 'node-html-parser';

import { DEFAULT_PROFILE, MEDIA_URL } from '@stdio/configs/config';
import { IArticle } from '@stdio/configs/custom-types';

export const getMediaURL = (src: string, alt: string = DEFAULT_PROFILE.PICTURE) => {
    return !isEmpty(src) ? `${MEDIA_URL}/${src}` : alt;
};

export const getArticleUrl = (article: IArticle | undefined, boardSlug: string | null = null) => {
    if (article === undefined) return '/';
    if (boardSlug !== null) return `/${boardSlug}/${article.slug}-${article.internalId}`;

    return !!article.board
        ? `/${article.board.slug}/${article.slug}-${article.internalId}`
        : `/article/${article.slug}-${article.internalId}`;
};

export const getClientContents = (content: string) => {
    if (!!!content || content == '') return { outline: [], content: '' };

    const root = parse(content);

    let outline: any = [];
    let contents = parse('');

    for (let i = 0; i < root.childNodes.length; i++) {
        const node = root.childNodes[i] as unknown as HTMLElement;

        if (node.nodeType === NodeType.ELEMENT_NODE) {
            if (['H2', 'H3', 'H4', 'H5', 'H6'].includes(node.tagName)) {
                const id = 'o-' + i;

                node.setAttribute('id', id);
                outline.push({
                    id,
                    text: node.innerText,
                    tagName: node.tagName.toLowerCase(),
                });
            }

            contents.appendChild(parse(node.outerHTML));
        }
    }

    return {
        outline,
        content: contents.outerHTML,
    };
};
